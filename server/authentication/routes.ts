var router = require("express").Router();

const AuthenticationController = require("./controllers/AuthenticationController");

router.post(
	"/login",
	AuthenticationController.login
);

router.post(
	"/signup",
	AuthenticationController.register
);

module.exports = router;
