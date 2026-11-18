require("dotenv").config();
const { defineConfig } = require("drizzle-kit");

module.exports = defineConfig({
    dialect: "sqlite",
    schema: "./database/schema.js",
    out: "./database/migrations",
    dbCredentials: {
        url: "./database/database.db",
    },
});