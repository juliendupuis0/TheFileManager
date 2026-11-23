const express = require('express');
const path = require('path');
const { PutObjectCommand } = require('@aws-sdk/client-s3');
const { eq } = require('drizzle-orm');
const router = express.Router();

const { s3 } = require("@/config/s3");
const db = require('@/database/db.js');
const { directory, file } = require('@/database/schema.js');

router.post('/storage/upload', async (req, res) => {
    const uploadedFiles = req.files?.files;
    const uploadedFile = Array.isArray(uploadedFiles) ? uploadedFiles[0] : uploadedFiles;

    if (!uploadedFile) return res.status(400).json({ message: 'No file was provided.' });

    const requestedDirectoryId = req.body?.directoryId;
    let directoryId = null;
    if (requestedDirectoryId !== undefined && requestedDirectoryId !== '') {
        directoryId = Number(requestedDirectoryId);
        if (!Number.isInteger(directoryId) || directoryId <= 0) {
            return res.status(400).json({ message: 'Invalid directory ID.', data: null });
        }

        const [existingDirectory] = await db
            .select({ id: directory.id })
            .from(directory)
            .where(eq(directory.id, directoryId))
            .limit(1);

        if (!existingDirectory) {
            return res.status(404).json({ message: 'Directory not found.', data: null });
        }
    }
    
    //Split elements of the file name
    const parsedName = path.parse(uploadedFile.name);

    try {
        const savedFile = await db.transaction(async (tx) => {
            const [record] = await tx
                .insert(file)
                .values({
                    name: parsedName.name,
                    extension: parsedName.ext.replace(/^\./, ''),
                    directoryId,
                })
                .returning({ id: file.id });

            await s3.send(new PutObjectCommand({
                Bucket: process.env.S3_BUCKET,
                Key: String(record.id),
                Body: uploadedFile.data,
                ContentType: uploadedFile.mimetype,
            }));

            return record;
        });

        return res.status(201).json({
            message: 'File uploaded successfully.',
            data: {
                id: savedFile.id,
            }
        });
    } catch (error) {
        console.error('File upload failed:', error);
        return res.status(500).json({ message: 'File upload failed.', data: null });
    }
});

module.exports = router;