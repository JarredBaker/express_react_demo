import {PrismaClient} from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
	const alice = await prisma.user.upsert({
		where: {email: 'alice@prisma.io'},
		update: {},
		create: {
			email: 'alice@prisma.io',
			firstname: 'Bob',
			surname: 'Doe',
			password: 'password',
		},
	})
	const bob = await prisma.user.upsert({
		where: {email: 'bob@prisma.io'},
		update: {},
		create: {
			email: 'bob@prisma.io',
			firstname: 'Bob',
			surname: 'Doe',
			password: 'password',
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
