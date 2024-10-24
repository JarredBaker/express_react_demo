var router = require("express").Router();

const SiteConfigController = require("./controllers/SiteConfigController");
var isAuthenticated = require("../helpers/isAuthenticated");

router.use(isAuthenticated.check);

router.post(
	"/update-cache-offset",
	SiteConfigController.updateSearchCacheOffset
);

router.get(
	"/offset",
	SiteConfigController.getCurrentOffSet
);

module.exports = router;
