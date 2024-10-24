import { query } from 'express-validator';

module.exports = {
	sanitizeSearch: [
		query('q')
			.trim()
			.escape()
			.notEmpty().withMessage('Search query cannot be empty')
	]
}
