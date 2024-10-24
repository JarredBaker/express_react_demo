import Joi, {ObjectSchema} from "joi";

const jwt = require("jsonwebtoken");
import {Request, Response} from 'express';
import crypto from "crypto";

const prisma = require('../../config/prisma');

const {jwtSecret, jwtExpirationInSeconds} = require("../../config/jtw_config.js");

const generateAccessToken = (username: string, userId: string) => {
	return jwt.sign({userId, username}, jwtSecret, {expiresIn: jwtExpirationInSeconds});
};

const encryptPassword = (password: string) => {
	const hash = crypto.createHash("sha256");
	return hash.update(password).digest("hex");
};

interface User {
	id: string;
	email: string;
	password: string;
	firstname: string;
	surname: string;

	toJSON(): any;
}

const registerPermittedBody: ObjectSchema<Request> = Joi.object({
	email: Joi.string().required(),
	firstname: Joi.string(),
	surname: Joi.string(),
	password: Joi.string().required(),
});

const loginPermittedBody: ObjectSchema<Request> = Joi.object({
	email: Joi.string().required(),
	password: Joi.string().required(),
});

module.exports = {
	register: async (req: Request, res: Response) => {
		const {name, email, password, firstname, surname} = registerPermittedBody.validate(req.body, {stripUnknown: true}).value;

		let encryptedPassword = encryptPassword(password);

		await prisma.user.create({data: {name, email, firstname, surname, password: encryptedPassword}})
			.then(async (user: User) => {
				const accessToken = generateAccessToken(email, user.id);

				return res.status(200).json({
					status: true,
					data: {
						user: user,
						token: accessToken,
					},
				});
			})
			.catch(async (err: any) => {
				return res.status(500).json({
					status: false,
					error: err,
				});
			});
	},

	login: async (req: Request, res: Response) => {
		const {email, password} = loginPermittedBody.validate(req.body, {stripUnknown: true}).value;

		await prisma.user.findUnique({where: {email: email}})
			.then((user: User) => {
				if (!user) {
					return res.status(400).json({
						status: false,
						error: {
							message: `Could not find any user with email: \`${email}\`.`,
						},
					});
				}

				const encryptedPassword = encryptPassword(password);

				if (user.password !== encryptedPassword) {
					return res.status(400).json({
						status: false,
						error: {
							message: `Provided username and password did not match.`,
						},
					});
				}

				const accessToken = generateAccessToken(user.email, user.id);

				return res.status(200).json({
					status: true,
					data: {
						user: user,
						token: accessToken,
					},
				});
			})
			.catch((err: any) => {
				console.log(JSON.stringify(err));
				return res.status(500).json({
					status: false,
					error: err,
				});
			});
	},
};
