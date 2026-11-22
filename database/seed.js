// model/seed.js : remplit la base avec des données de test.
// Lancer depuis la RACINE du projet : node model/seed.js
// (si ton dossier s'appelle db/ au lieu de model/, le fichier marche tel quel)
//
// Tous les id sont en autoIncrement : on ne les écrit jamais à la main,
// on les récupère avec .returning().
//
// ATTENTION : le script VIDE les tables avant de les remplir.
// À utiliser uniquement sur ta base de développement.

const db = require("./db");
const {
    directory,
    collection,
    file,
    versions,
    fileCollections,
    directoryCollections,
} = require("./schema");

// Date il y a n jours (pour avoir des dates de versions différentes)
const daysAgo = (n) => new Date(Date.now() - n * 24 * 60 * 60 * 1000);

// Transforme un tableau de lignes en objet { nom: id } pour retrouver un id par son nom
const idsByName = (rows) => Object.fromEntries(rows.map((r) => [r.name, r.id]));

async function seed() {
    // 1) On vide les tables : d'abord celles qui ont des clés étrangères,
    //    ensuite les tables parentes. (Pas de .where() ici : c'est voulu.)
    await db.delete(fileCollections);
    await db.delete(directoryCollections);
    await db.delete(versions);
    await db.delete(file);
    await db.delete(collection);
    await db.delete(directory);

    // 2) Les 5 directories
    const directories = idsByName(
        await db
            .insert(directory)
            .values([
                { name: "Documents" },
                { name: "Images" },
                { name: "Projets" },
                { name: "Archives" },
                { name: "Téléchargements" },
            ])
            .returning(),
    );

    // 3) Les 5 collections : 2 spéciales (ids fixes 1 et 2) + 3 classiques (ids générés)
    //    Les ids 1 et 2 sont réservés à "Récents" et "Favoris" : le modèle
    //    refuse de les supprimer (voir PROTECTED_COLLECTION_IDS).
    await db.insert(collection).values([
        { id: 1, name: "Récents" },
        { id: 2, name: "Favoris" },
    ]);
    const collections = idsByName(
        await db
            .insert(collection)
            .values([{ name: "Travail" }, { name: "Perso" }, { name: "À archiver" }])
            .returning(),
    );
    collections["Récents"] = 1;
    collections["Favoris"] = 2;

    // 4) Les 5 files
    const files = idsByName(
        await db
            .insert(file)
            .values([
                { name: "rapport", extension: "pdf", directoryId: directories["Documents"] },
                { name: "budget", extension: "xlsx", directoryId: directories["Documents"] },
                { name: "photo-vacances", extension: "jpg", directoryId: directories["Images"] },
                { name: "notes", extension: "txt", directoryId: directories["Projets"] },
                { name: "presentation", extension: "pptx", directoryId: directories["Projets"] },
            ])
            .returning(),
    );

    // 5) Les 10 versions
    //    - un file OU un directory par version (l'autre colonne reste vide)
    //    - plusieurs versions sur un même file : rapport (x3), budget (x2)
    //    - plusieurs versions sur un même directory : Projets (x2)
    await db.insert(versions).values([
        // rapport : 3 versions
        { type: "creation", fileId: files["rapport"], date: daysAgo(30) },
        { type: "modification", fileId: files["rapport"], date: daysAgo(20) },
        { type: "modification", fileId: files["rapport"], date: daysAgo(5) },
        // budget : 2 versions
        { type: "creation", fileId: files["budget"], date: daysAgo(15) },
        { type: "renommage", fileId: files["budget"], date: daysAgo(2) },
        // photo-vacances : 1 version
        { type: "creation", fileId: files["photo-vacances"], date: daysAgo(10) },
        // Projets : 2 versions
        { type: "creation", directoryId: directories["Projets"], date: daysAgo(25) },
        { type: "renommage", directoryId: directories["Projets"], date: daysAgo(3) },
        // Documents : 1 version
        { type: "creation", directoryId: directories["Documents"], date: daysAgo(40) },
        // Images : 1 version
        { type: "creation", directoryId: directories["Images"], date: daysAgo(12) },
    ]);

    // 6) Les tables de liaison
    await db.insert(fileCollections).values([
        { fileId: files["rapport"], collectionId: collections["Travail"] },
        { fileId: files["budget"], collectionId: collections["Travail"] },
        { fileId: files["photo-vacances"], collectionId: collections["Perso"] },
        { fileId: files["photo-vacances"], collectionId: collections["Favoris"] },
        { fileId: files["rapport"], collectionId: collections["Récents"] },
        { fileId: files["presentation"], collectionId: collections["Récents"] },
        { fileId: files["notes"], collectionId: collections["À archiver"] },
    ]);

    await db.insert(directoryCollections).values([
        { directoryId: directories["Projets"], collectionId: collections["Travail"] },
        { directoryId: directories["Images"], collectionId: collections["Favoris"] },
        { directoryId: directories["Documents"], collectionId: collections["Récents"] },
        { directoryId: directories["Archives"], collectionId: collections["À archiver"] },
    ]);

    console.log("Seed terminée : 5 directories, 5 files, 5 collections, 10 versions.");
}

seed().catch((error) => {
    console.error("Erreur pendant la seed :", error);
    process.exit(1);
});
