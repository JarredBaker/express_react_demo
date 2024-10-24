const express = require('express');
const logger = require('morgan');
const cors = require('cors');
import {Request, Response, NextFunction} from 'express';

const UserRoutes = require("./users/routes");
const AuthenticationRoutes = require("./authentication/routes");
const StarWarsRoutes = require("./star_wars/routes");
const SiteConfigRoutes = require("./site_config/routes");

const app = express();

app.use(cors());
app.use(logger('dev'));
app.use(express.json());

/**
 * Route authentication is done in the individual route files.
 */
app.use("/", AuthenticationRoutes);
app.use("/users", UserRoutes);
app.use("/star-wars", StarWarsRoutes);
app.use("/site-config", SiteConfigRoutes);

app.use(function(err: any, req: Request, res: Response, next: NextFunction) {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  res.status(err.status || 500).json({ error: 'Something went wrong!' });
});

module.exports = app;
