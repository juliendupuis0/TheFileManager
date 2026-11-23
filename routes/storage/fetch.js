const express = require('express');
const router = express.Router();
const { eq, isNull } = require('drizzle-orm');

const db = require('@/database/db.js');
const { directory, file } = require('@/database/schema.js');

router.get('/storage/fetch', async (req, res) => {
    console.log("eee")
    try {
        const requestedFolderId = req.query.id;
        let files;
        let directories;

        if (requestedFolderId === undefined || requestedFolderId === null || requestedFolderId === '') {
            files = await db
                .select({ id: file.id, name: file.name, extension: file.extension })
                .from(file)
                .where(isNull(file.directoryId));

            directories = await db
                .select({ id: directory.id, name: directory.name })
                .from(directory);
        } else {
            const folderId = Number(requestedFolderId);
            if (!Number.isInteger(folderId) || folderId <= 0) {
                return res.status(400).json({ message: 'Invalid folder ID.', data: null });
            }

            const [folder] = await db
                .select({ id: directory.id })
                .from(directory)
                .where(eq(directory.id, folderId))
                .limit(1);

            if (!folder) {
                return res.status(404).json({ message: 'Folder not found.', data: null });
            }

            files = await db
                .select({ id: file.id, name: file.name, extension: file.extension })
                .from(file)
                .where(eq(file.directoryId, folderId));

            directories = [];
        }

        console.log(files, directories);
        return res.status(200).json({
            message: 'Successfully fetched files and folders.',
            data: { files, directories },
        });
    } catch (error) {
        console.error('Failed to fetch files:', error);
        return res.status(500).json({ message: 'Failed to fetch files.', data: null });
    }
});

module.exports = router;