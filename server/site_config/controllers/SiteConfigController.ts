import {Request, Response} from 'express';
import Joi, {ObjectSchema} from "joi";

const prisma = require('../../config/prisma');

const signConfigPermittedBody: ObjectSchema<Request> = Joi.object({
	cacheOffSet: Joi.number().required(),
});

module.exports = {
	updateSearchCacheOffset: async (req: Request, res: Response) => {
		const {cacheOffSet} = signConfigPermittedBody.validate(req.body, {stripUnknown: true}).value;

		const siteConfig = await prisma.siteConfig.findFirst();

		await prisma.siteConfig.update({
			where: {
				id: siteConfig.id,
			},
			data: {
				searchCacheOffsetSeconds: cacheOffSet,
			},
		}).then(() => {
			res.status(200).json({message: "Updated"});
		}).catch((error: any) => {
			res.status(500).json({message: error.message});
		})
	},

	getCurrentOffSet: async (_req: Request, res: Response) => {
		const config = await prisma.siteConfig.findFirst();
		res.status(201).json({offset: config.searchCacheOffsetSeconds});
	}
}
