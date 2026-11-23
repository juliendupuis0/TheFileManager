const express = require('express');
const router = express.Router();
const { allFiles } = require("@/modele/modeleFile.js");

router.get("/files", async (req, res) => {
    const files = await allFiles();
    res.render("files", { files });
});


function renderFileManager(req, res) {
    const title = "Yep";

    res.render("index", {
        title
    });
}

router.get('/', renderFileManager);
router.get('/folder/', renderFileManager);

module.exports = router;