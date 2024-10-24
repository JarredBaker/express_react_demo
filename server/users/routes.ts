var router = require("express").Router();

const UserController = require("./controllers/UserController");
var isAuthenticated = require("../helpers/isAuthenticated");

router.use(isAuthenticated.check);

router.get(
	"/",
	UserController.getAll
);

module.exports = router;
