import {Request, Response} from 'express';

const prisma = require('../../config/prisma');

module.exports = {
	getAll: async (_req: Request, res: Response) => {
		const users = await prisma.user.findMany();
		res.status(201).json(users);
	},
}
