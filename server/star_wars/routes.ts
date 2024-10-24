var router = require("express").Router();

const StarWarsController = require("./controllers/StarWarsController");
var isAuthenticated = require("../helpers/isAuthenticated");
const sanitizeSearch = require("../helpers/sanitizeSearch");

router.use(isAuthenticated.check);

router.get(
	"/search",
	sanitizeSearch.sanitizeSearch,
	StarWarsController.search
);

module.exports = router;
