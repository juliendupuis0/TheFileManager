const express = require('express');
const router = express.Router();

const db = require("@/database/db");
const { fileTable } = require("@/database/schema");

router.get('/test', async (req, res) => {
    const title = "test";
    
    const files = await db.select().from(fileTable);
    console.log(files);

    res.render("index", {
        title
    });
});

module.exports = router;