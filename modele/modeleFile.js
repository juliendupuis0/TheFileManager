const { eq } = require("drizzle-orm");
const db = require("@/database/db.js");
const { file, directory, collection, directoryCollections, fileCollections, versions } = require("@/database/schema.js");

async function allFiles() {
   return await db.select({id : file.id}).from(file);
}

async function directoryFiles(dir) {
    return await db.select({id : file.id}).from(file).innerJoin(directory,eq(file.directoryId,directory.id)).where(eq(file.directoryId,dir));
}

async function collectionFile(col) {
    return await db.select({id : file.id}).from(file).innerJoin(fileCollections,eq(file.id,fileCollections.fileId)).innerJoin(collection,eq(fileCollections.collectionId,collection.id)).where(eq(collection.id,col));
}

module.exports = { collectionFile, allFiles, directoryFiles };
