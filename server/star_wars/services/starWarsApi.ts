import axios from 'axios';
const prisma = require('../../config/prisma');

export async function findOrFetchExternal(payload: string) {
	const offSet = await getSecondsOffset();

	const results = await prisma.starWarsPeople.findFirst({
		where: {
			payload: payload,
			datetime: {
				gte: offSet,
			},
		},
	});

	if (results) return results.result;

	try {
		const externalApiUrl = process.env.STAR_WARS_API;
		if (!externalApiUrl) return new Error('External API URL not configured');

		const externalResponse = await axios.get(`${externalApiUrl}${encodeURIComponent(payload)}`);
		const externalData = externalResponse.data.results;

		if (externalData) await createOrUpdateRecords(externalData, payload);
		return externalData || [];

	} catch (error) {
		throw new Error('Failed to fetch data from external API');
	}
}

const createOrUpdateRecords = async (externalData: any, payload: string) => {
	return prisma.starWarsPeople.upsert({
		where: {payload: payload},
		update: {
			datetime: new Date(),
			result: externalData,
		},
		create: {
			payload: payload,
			datetime: new Date(),
			result: externalData,
		},
	});
}

const getSecondsOffset = async () => {
	const now = new Date();
	let searchOffSetResult = await prisma.siteConfig.findFirst();
	let searchOffSet = 900;

	if (searchOffSetResult) searchOffSet = searchOffSetResult.searchCacheOffsetSeconds

	return new Date(now.getTime() - searchOffSet * 1000);
}
