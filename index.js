require('dotenv').config();
const path = require('path');
require("module-alias/register");

const express = require("express");
const hbs = require("hbs");
const bodyParser = require('body-parser');
const fileUpload = require('express-fileupload');
const authMiddleware = require('@/middleware/auth');

//Initialize our S3 bucket, if it doesn't exist, create it.
//It doesn't depend on anything so we call it first.
const { s3, initializeStorage } = require("@/config/s3");
initializeStorage();

const app = express();

//Allow the hbs files to access the public folder.
app.use(express.static(path.join(__dirname, 'public')));

app.set("view engine", "hbs");
app.set("views", path.join(__dirname, "views"));
hbs.registerPartials(path.join(__dirname, "views", "partials"));

//We can limit req sizes.
//app.use(bodyParser.json({ limit: '10mb' }));
app.use(bodyParser.json());
app.use(fileUpload());
app.use(authMiddleware);

//Load the routes.
require('@/config/loadRoutes')(app);

//|‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾|
//|   _____ ____  ____   ___  ____  ____    |
//|  | ____|  _ \|  _ \ / _ \|  _ \/ ___|   |
//|  |  _| | |_) | |_) | | | | |_) \___ \   |
//|  | |___|  _ <|  _ <| |_| |  _ < ___) |  |
//|  |_____|_| \_\_| \_\\___/|_| \_\____/   |
//|_________________________________________|
app.use((req, res, next) => {
	res.render("404");
});

app.use((err, req, res, next) => {
	res.status(500).json({
		message: "Internal server error"
	});
});

//|‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾|
//|   _     ___ ____ _____ _____ _   _   |
//|  | |   |_ _/ ___|_   _| ____| \ | |  |
//|  | |    | |\___ \ | | |  _| |  \| |  |
//|  | |___ | | ___) || | | |___| |\  |  |
//|  |_____|___|____/ |_| |_____|_| \_|  |
//|______________________________________|
const PORT = process.env.SERVER_PORT ?? 4000;
app.listen(PORT, () => {
	console.log(`App is up and running on port http://localhost:${PORT}`)
})