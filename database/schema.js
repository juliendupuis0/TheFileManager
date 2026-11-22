const {
    sqliteTable,
    integer,
    text,
    primaryKey,
} = require("drizzle-orm/sqlite-core");

const directory = sqliteTable("directory", {
    id: integer("id").primaryKey({ autoIncrement: true }),
    name: text("name").notNull(),
    date: integer("date", { mode: "timestamp" })
        .notNull()
        .$defaultFn(() => new Date()),
});

const collection = sqliteTable("collection", {
    id: integer("id").primaryKey({ autoIncrement: true }),
    name: text("name").notNull().unique(),
});

const file = sqliteTable("file", {
    id: integer("id").primaryKey({ autoIncrement: true }),
    name: text("name").notNull(),
    extension: text("extension").notNull(),
    date: integer("date", { mode: "timestamp" })
        .notNull()
        .$defaultFn(() => new Date()),
    directoryId: integer("directoryId").references(() => directory.id),
});

const versions = sqliteTable("versions", {
    id: integer("id").primaryKey({ autoIncrement: true }),
    date: integer("date", { mode: "timestamp" })
        .notNull()
        .$defaultFn(() => new Date()),
    type: text("type").notNull(),
    directoryId: integer("directoryId").references(() => directory.id),
    fileId: integer("fileId").references(() => file.id),
});

const fileCollections = sqliteTable(
    "file_collections",
    {
        fileId: integer("fileId")
            .notNull()
            .references(() => file.id),
        collectionId: integer("collectionId")
            .notNull()
            .references(() => collection.id),
    },
    (t) => [primaryKey({ columns: [t.fileId, t.collectionId] })],
);

const directoryCollections = sqliteTable(
    "directory_collections",
    {
        directoryId: integer("directoryId")
            .notNull()
            .references(() => directory.id),
        collectionId: integer("collectionId")
            .notNull()
            .references(() => collection.id),
    },
    (t) => [primaryKey({ columns: [t.directoryId, t.collectionId] })],
);

module.exports = {
    directory,
    collection,
    file,
    versions,
    fileCollections,
    directoryCollections,
};
