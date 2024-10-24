const jwt = require("jsonwebtoken");
const { jwtSecret } = require("../config/jtw_config.js");
import {Request, Response, NextFunction} from 'express';

module.exports = {
	check: (req: Request, res: Response, next: NextFunction) => {
		const authHeader = req.headers['authorization'];

		const token = authHeader?.split(' ')[1];

		if (!authHeader || !authHeader.startsWith('Bearer') || !token) {
			return res.status(401).json({status: false, error: {message: 'Invalid auth mechanism.'}});
		}

		jwt.verify(token, jwtSecret, (err: any, user: any) => {
			if (err) return res.status(403).json({status: false, error: 'Invalid access token provided, please login again.'});

			// req.user = user;
			next();
		});
	}
}
