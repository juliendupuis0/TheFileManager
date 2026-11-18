module.exports = (req, res, next) => {
    //This will fetch the auth cookie and set the user object.
    res.locals.user = "User";

    next();
};