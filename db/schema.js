const { sql } = require("drizzle-orm");
const {
    sqliteTable,
    integer,
    text,
    primaryKey,
} = require("drizzle-orm/sqlite-core");

const directoryTable = sqliteTable("directory", {
    id: text("id").primaryKey(),
    name: text("name").notNull(),
    date: integer("date_", { mode: "timestamp" })
        .notNull()
        .default(sql`(unixepoch())`),
});

const collectionTable = sqliteTable("collection", {
    id: text("id").primaryKey(),
    name: text("name").notNull().unique(),
});

const fileTable = sqliteTable("file", {
    id: integer("id").primaryKey({ autoIncrement: true }),
    name: text("name").notNull(),
    extension: text("extension").notNull(),
    date: integer("date_", { mode: "timestamp" })
        .notNull()
        .default(sql`(unixepoch())`),
    directoryId: text("id_1").references(() => directoryTable.id),
});

const versionsTable = sqliteTable("versions", {
    id: integer("id").primaryKey({ autoIncrement: true }),
    date: integer("date_", { mode: "timestamp" })
        .notNull()
        .default(sql`(unixepoch())`),
    type: text("type").notNull(),
    directoryId: text("id_1").references(() => directoryTable.id),
    fileId: integer("id_2").references(() => fileTable.id),
});

const fileCollectionsTable = sqliteTable(
    "file_collections",
    {
        fileId: integer("id")
            .notNull()
            .references(() => fileTable.id),
        collectionId: text("id_1")
            .notNull()
            .references(() => collectionTable.id),
    },
    (t) => [primaryKey({ columns: [t.fileId, t.collectionId] })],
);

const directoryCollectionsTable = sqliteTable(
    "directory_collections",
    {
        directoryId: text("id")
            .notNull()
            .references(() => directoryTable.id),
        collectionId: text("id_1")
            .notNull()
            .references(() => collectionTable.id),
    },
    (t) => [primaryKey({ columns: [t.directoryId, t.collectionId] })],
);

module.exports = {
    directoryTable,
    collectionTable,
    fileTable,
    versionsTable,
    fileCollectionsTable,
    directoryCollectionsTable,
};