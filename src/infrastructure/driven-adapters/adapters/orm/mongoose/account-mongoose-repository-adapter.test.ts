// eslint-disable-next-line @typescript-eslint/ban-ts-comment
//@ts-nocheck
// eslint-disable-next-line @typescript-eslint/no-var-requires
import mongoose from 'mongoose'
const {connect} = mongoose
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

		expect(sut.create(mockAccount)).rejects.toThrowError()
	})
})
