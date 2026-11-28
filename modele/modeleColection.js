const { eq, and, gte } = require("drizzle-orm");
const db = require("@/database/db.js");
const { file, directory, collection, directoryCollections, fileCollections, versions } = require("@/database/schema.js");

async function collectionById(id) {
   return await db.select({id : collection.id, name : collection.name }).from(collection).where(eq(collection.id,id));
}

async function allCollections() {
   return await db.select({id : collection.id, name : collection.name }).from(collection);
}

async function allCollectionFiles(id) {
    return await db.select({id : collection.id, name : collection.name })
  .from(collection)
  .innerJoin(fileCollections,eq(collection.id,fileCollections.collectionId))
  .innerJoin(file,eq(file.id,fileCollections.fileId))
  .where(eq(file.id,id));
}

async function allCollectionDir(id) {
   return await db.select({id : collection.id, name : collection.name })
  .from(collection)
  .innerJoin(directoryCollections,eq(collection.id,directoryCollections.collectionId))
  .innerJoin(directory,eq(directory.id,directoryCollections.directoryId))
  .where(eq(directory.id,id));
}

async function updateCollectionName(id, newName) {
   if (id==1) {
      throw new Error("recent ne peut pas etre modifier");
   }
   else if (id==2) {
      throw new Error("favori ne peut pas etre modifier");
   }
   return await db.update(collection).set({name: newName}).where(eq(collection.id,id)).returning();
}

async function setCollectionToFile(idfile,idcollection) {
   return await db.insert(fileCollections).values({fileId: idfile,collectionId: idcollection}).returning();
}

async function setCollectionToDirectory(iddirectory,idcollection) {
   return await db.insert(directoryCollections).values({directoryId: iddirectory,collectionId: idcollection}).returning();
}

async function setNewCollection(name) {
   return await db.insert(collection).values({ name: name}).returning();
}

async function supprAllCollectionFromDirectory(id) {
   return await db.delete(directoryCollections).where(eq(directoryCollections.collectionId,id));
}

async function supprAllCollectionFromFile(id) {
   return await db.delete(fileCollections).where(eq(fileCollections.collectionId,id));
}

async function deleteCollection(id) {
   if (id==1) {
      throw new Error("recent ne peut pas etre supprimer");
   }
   else if (id==2) {
      throw new Error("favori ne peut pas etre supprimer");
   }
   await supprAllCollectionFromFile(id);
   await supprAllCollectionFromDirectory(id);
   return await db.delete(collection).where(eq(collection.id,id));
}

async function supprCollectionToFile(idfile,idcollection) {
   return await db.delete(fileCollections).where(and(eq(fileCollections.collectionId,idcollection), eq(fileCollections.fileId,idfile)));
}

async function supprCollectionToDirectory(iddirectory,idcollection) {
   return await db.delete(directoryCollections).where(and(eq(directoryCollections.collectionId,idcollection), eq(directoryCollections.directoryId,iddirectory)));
}

async function changesRecent() {
   await db.delete(fileCollections).where(eq(fileCollections.collectionId, 1));
   await db.delete(directoryCollections).where(eq(directoryCollections.collectionId, 1));

   const dateMin= new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
   const files = await db.select({ id: file.id }).from(file).where(gte(file.date, dateMin));
   const directories = await db.select({ id: directory.id }).from(directory).where(gte(directory.date, dateMin));

   for (const f of files) {
      await db.insert(fileCollections).values({ fileId: f.id, collectionId: 1 });
   }
   for (const d of directories) {
      await db.insert(directoryCollections).values({ directoryId: d.id, collectionId: 1 });
   }
}

module.exports = { allCollections, allCollectionFiles, allCollectionDir, updateCollectionName, setCollectionToFile, setCollectionToDirectory, setNewCollection, deleteCollection, supprCollectionToFile, supprCollectionToDirectory, collectionById, changesRecent};
