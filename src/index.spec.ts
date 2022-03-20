// eslint-disable-next-line @typescript-eslint/ban-ts-comment
//@ts-nocheck
// eslint-disable-next-line @typescript-eslint/no-var-requires
const {MongoClient} = require('mongodb')

describe('insert', () => {
	let connection
	let db

	beforeAll(async () => {
		connection = await MongoClient.connect(global.__MONGO_URI__, {
			useNewUrlParser: true,
			useUnifiedTopology: true
		})
		db = await connection.db(global.__MONGO_DB_NAME__)
	})

	afterAll(async () => {
		await connection.close()
		await connection.close()
	})

	it('should insert a doc into collection', async () => {
		const users = db.collection('users')

		const mockUser = {_id: 'some-user-id', name: 'John'}
		await users.insertOne(mockUser)

		const insertedUser = await users.findOne({_id: 'some-user-id'})
		console.log(insertedUser)
		expect(insertedUser).toEqual(mockUser)
	})
})
