import {Request, Response} from 'express';

const {validationResult} = require('express-validator');
import {findOrFetchExternal} from "../services/starWarsApi";

interface StarWarsResult {
	id: string;
	payload: string;
	datetime: string;
	result: object;
}

module.exports = {
	search: async (req: Request, res: Response) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

		const query = req.query.q as string;
		try {
			const results: StarWarsResult = await findOrFetchExternal(query);
			res.json({data: results});
		} catch (error: any) {
			res.status(500).json({ error: error.message });
		}
	},
}
