// eslint-disable-next-line @typescript-eslint/ban-ts-comment
//@ts-nocheck
// eslint-disable-next-line @typescript-eslint/no-var-requires
import { IWriteTransactionRepository } from '../../../../../domain/models/contracts/writeTransaction-repository'
import { TransactionMongooseRepositoryAdapter } from './transaction-mongoose-repository-adapter'
import mongoose from 'mongoose'
import { TransactionModelSchema } from './models/transaction'
const {connect} = mongoose
const make_sut = (): IWriteTransactionRepository => {
	return new TransactionMongooseRepositoryAdapter()
}


describe('Transaction mongo adapter',  () => {
	beforeAll(async () => {
		await connect(global.__MONGO_URI__, {
			useNewUrlParser: true,
			useUnifiedTopology: true
		})
	})

	beforeEach(async () => {
		await TransactionModelSchema.deleteMany({})
	})
	afterAll(async () => {
		await mongoose.connection.close()
	})

	it('should insert a doc into collection transaction', async () => {
		const sut = make_sut()
		
		const account_id = '123456'
		const amount = 200.2
		const mockTransaction: AddTransactionParams = {account_id, type: 'debit', amount}
		const insertedTransaction = await sut.add(mockTransaction)
		const wasInserted = await TransactionModelSchema.findOne({
			_id: insertedTransaction.id
		})
		
		expect(insertedTransaction.id).toBeTruthy()
		expect(insertedTransaction.account_id).toBe(wasInserted?.account_id)
		expect(insertedTransaction.amount).toBe(wasInserted?.amount)
		expect(insertedTransaction.type).toBe(wasInserted?.type)
	})
})
