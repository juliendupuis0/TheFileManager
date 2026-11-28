const { eq } = require("drizzle-orm");
const db = require("@/database/db.js");
const { file, directory, collection, directoryCollections, fileCollections, versions } = require("@/database/schema.js");

async function allFiles() {
   return await db.select().from(file);
}

async function directoryFiles(dir) {
    return await db.select().from(file).innerJoin(directory,eq(file.parentId,directory.id)).where(eq(file.parentId,dir));
}

async function collectionFile(col) {
    return await db.select().from(file).innerJoin(fileCollections,eq(file.id,fileCollections.fileId)).innerJoin(collection,eq(fileCollections.collectionId,collection.id)).where(eq(collection.id,col));
}

async function newFile(name, extension, route) {
    return await db.insert(file).values({
  name: name,
  extension: extension,
  parentId: route
});
}

async function changeName(id,newName) {
    return await db.update(file).set({name: newName}).where(eq(file.id,id));
}

async function changeExtention(id, newExtention) {
    return await db.update(file).set({extension: newExtention}).where(eq(file.id,id));
}

async function changeRoute(id, newRoute){
    return await db.update(file).set({parentId: newRoute}).where(eq(file.id,id));
}

async function deleteFile(id){
    await db.delete(fileCollections).where(eq(fileCollections.fileId, id));
    await db.delete(versions).where(eq(versions.fileId, id));
    return await db.delete(file).where(eq(file.id,id));
}

module.exports = { collectionFile, allFiles, directoryFiles, newFile, changeName, changeExtention, changeRoute, deleteFile };
