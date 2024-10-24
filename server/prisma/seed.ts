import {PrismaClient} from '@prisma/client'
const crypto = require("crypto");

const prisma = new PrismaClient()

const encryptPassword = (password: string) => {
	const hash = crypto.createHash("sha256");
	return hash.update(password).digest("hex");
};

async function main() {
	const alice = await prisma.user.upsert({
		where: {email: 'alice@prisma.io'},
		update: {},
		create: {
			email: 'alice@prisma.io',
			firstname: 'Bob',
			surname: 'Doe',
			password: encryptPassword('password@1234'),
		},
	})
	const bob = await prisma.user.upsert({
		where: {email: 'bob@prisma.io'},
		update: {},
		create: {
			email: 'bob@prisma.io',
			firstname: 'Bob',
			surname: 'Doe',
			password: encryptPassword('password@1234'),
		},
	})
	// @ts-ignore
	const siteConfigDefault = await prisma.siteConfig.create({
		data: {
			searchCacheOffsetSeconds: 900
		}
	})
	console.log({alice, bob, siteConfigDefault})
}

main()
	.then(async () => {
		await prisma.$disconnect()
	})
	.catch(async (e) => {
		console.error(e)
		await prisma.$disconnect()
		process.exit(1)
	})
