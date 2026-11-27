const { eq } = require("drizzle-orm");
const db = require("@/database/db.js");
const { file, directory, collection, directoryCollections, fileCollections, versions } = require("@/database/schema.js");

async function allFiles() {
   return await db.select({id : file.id, name : file.name, extention : file.extention}).from(file);
}

async function directoryFiles(dir) {
    return await db.select({id : file.id, name : file.name, extention : file.extention}).from(file).innerJoin(directory,eq(file.parentId,directory.id)).where(eq(file.parentId,dir));
}

async function collectionFile(col) {
    return await db.select({id : file.id, name : file.name, extention : file.extention}).from(file).innerJoin(fileCollections,eq(file.id,fileCollections.fileId)).innerJoin(collection,eq(fileCollections.collectionId,collection.id)).where(eq(collection.id,col));
}

async function newfile(name, extention, route) {
    return await db.insert(file).values({
  name: name,
  extension: extention,
  date: Math.floor(Date.now() / 1000),
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

async function deletefile(id){
    return await db.delete(file).where(eq(file.id,id));
}

module.exports = { collectionFile, allFiles, directoryFiles, newfile, changeName, changeExtention, changeRoute, deletefile };
