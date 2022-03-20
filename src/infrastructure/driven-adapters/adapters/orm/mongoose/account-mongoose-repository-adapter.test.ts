// eslint-disable-next-line @typescript-eslint/ban-ts-comment
//@ts-nocheck
// eslint-disable-next-line @typescript-eslint/no-var-requires
import mongoose from 'mongoose'
const {connect, ObjectId} = mongoose
import {AddAccountParams} from '../../../../../domain/models/account'
import {AccountModelSchema} from './models/account'
import {AccountMongooseRepositoryAdapter} from './account-mongoose-repository-adapter'

const make_sut = (): (IWriteAccountRepository & IReadAccountRepository) => {
	return new AccountMongooseRepositoryAdapter()
}

describe('Account mongo adapter', () => {
	beforeAll(async () => {
		await connect(global.__MONGO_URI__, {
			useNewUrlParser: true,
			useUnifiedTopology: true
		})
	})

	beforeEach(async () => {
		await AccountModelSchema.deleteMany({})
	})
	afterAll(async () => {
		await mongoose.connection.close()
	})

	it('should insert a doc into collection account', async () => {
		const sut = make_sut()
		
		const cpf = '123456'
		const mockAccount: AddAccountParams = {owner_name: 'John', cpf, balance: 0}
		const insertedAccount = await sut.create(mockAccount)
		const wasInserted = await AccountModelSchema.findOne({
			cpf
		})
		
		expect(insertedAccount.id).toBeTruthy()
		expect(insertedAccount.owner_name).toBe(wasInserted?.owner_name)
		expect(insertedAccount.cpf).toBe(wasInserted?.cpf)
		expect(insertedAccount.balance).toBe(wasInserted?.balance)
	})

	it('should throw error if account already exists', async () => {
		const sut = make_sut()

		const cpf = '123456'
		const mockAccount: AddAccountParams = {owner_name: 'John', cpf, balance: 0}
		await AccountModelSchema.create(mockAccount)

		class MongoServerError extends Error {
			constructor() {
				// eslint-disable-next-line quotes
				super(`E11000 duplicate key error dup key: { : "${cpf}" }`)
				this.name = 'MongoServerError'
			}
		}
		try {
			await sut.create(mockAccount)
		} catch (error) {
			expect(error).toEqual(new MongoServerError())
		}
		
	})

	it('should check the existence of a account by cpf field', async () => {
		const sut = make_sut()

		const cpf = '123456'
		const mockAccount: AddAccountParams = {owner_name: 'John', cpf, balance: 0}
		await AccountModelSchema.create(mockAccount)

		const existent_cpf = '123456'
		const inexistent_cpf = 'some_random_inexistent_cpf'
		const willExists = await sut.existsByCPF(existent_cpf)
		const willNexists = await sut.existsByCPF(inexistent_cpf)
		expect(willNexists).toBe(false)
		expect(willExists).toBe(true)
	})

	it('should check the existence of a account by its id', async () => {
		const sut = make_sut()

		const cpf = '123456'
		const mockAccount: AddAccountParams = {owner_name: 'John', cpf, balance: 0}
		await AccountModelSchema.create(mockAccount)

		const get_id = (async function() {
			const account = await AccountModelSchema.findOne()
			return account?._id.toHexString()
		}())
		const existent_account_id = await get_id
		const inexistent_account_id = '123456789012345678901234'
		const willExists = await sut.exists(existent_account_id)
		const willNexists = await sut.exists(inexistent_account_id)
		expect(willNexists).toBe(false)
		expect(willExists).toBe(true)
	})

	it('should get the account balance', async () => {
		const sut = make_sut()

		const cpf = '123456'
		const balance = 10000
		const mockAccount: AddAccountParams = {owner_name: 'John', cpf, balance}
		const  { id } = await AccountModelSchema.create(mockAccount)

		const result = await sut.getBalance(id)

		expect(result).toBe(balance)
	})

	it('should update the account balance', async () => {
		const sut = make_sut()

		const cpf = '123456'
		const balance = 10000
		const new_balance = 2000
		const mockAccount: AddAccountParams = {owner_name: 'John', cpf, balance}
		const  { id } = await AccountModelSchema.create(mockAccount)

		await sut.update(id, {balance: new_balance})
		const account = await AccountModelSchema.findOne()

		expect(account.balance).toBe(new_balance)
	})
})
