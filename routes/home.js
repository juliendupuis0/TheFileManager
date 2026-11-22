const express = require('express');
const router = express.Router();
const { allFiles } = require("@/modele/modeleFile.js");

router.get("/files", async (req, res) => {
    const files = await allFiles();
    res.render("files", { files });
});


router.get('/', (req, res) => {
    const title = "Yep";

    res.render("index", {
        title
    });
});

module.exports = router;