const { eq } = require("drizzle-orm");
const db = require("@/database/db.js");
const { file, directory, collection, directoryCollections, fileCollections, versions } = require("@/database/schema.js");

async function allDirectory() {
   return await db.select({id : directory.id}).from(directory);
}

async function directoryDir(dir) {
    return await db.select({id : directory.id}).from(directory)
                .where(eq(directory.parentId, dir));
}

async function collectionDir(col) {
    return await db.select({id : directory.id}).from(directory)
                .innerJoin(directoryCollections, eq(directory.id, directoryCollections.directoryId))
                .innerJoin(collection, eq(directoryCollections.collectionId, collection.id))
                .where(eq(collection.id, col));
}

async function directoryAll(dir) {
    return await db.select({id : directory.id}).from(directory)
                .where(eq(directory.parentId, dir))
                .unionAll(
                    db.select({id : file.id}).from(file)
                    .where(eq(file.parentId, dir))
                );
}

module.exports = { collectionDir, allDirectory, directoryDir, directoryAll };