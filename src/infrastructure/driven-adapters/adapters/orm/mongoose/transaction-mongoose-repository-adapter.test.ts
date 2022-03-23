// eslint-disable-next-line @typescript-eslint/ban-ts-comment
//@ts-nocheck
// eslint-disable-next-line @typescript-eslint/no-var-requires
import { IWriteTransactionRepository } from '@/domain/models/contracts/writeTransaction-repository'
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

	describe('transaction type', () => {

		const sut = make_sut()
		class ValidationError extends Error {
			constructor(type: string) {
				super(`transactions validation failed: type: \`${type}\` is not a valid enum value for path \`type\`.`)
				this.name = 'ValidationError'
			}
		}
		const testcases = [
			[
				{account_id: '12345', type: 'panaceia', amount: 292.3}, 
				new ValidationError('panaceia')
			],
			[
				{account_id: '12345', type: 'credit', amount: 292.3}, 
				(async function(id) { 
					const wasInserted = await TransactionModelSchema.findOne({
						_id: id
					})
					return wasInserted
				})
			],
			[
				{account_id: '12345', type: 'roraima', amount: 292.3}, 
				new ValidationError('roraima')
			],
			[
				{account_id: '12345', type: 'debit', amount: 292.3}, 
				(async function(id) { 
					const wasInserted = await TransactionModelSchema.findOne({
						_id: id
					})
					return wasInserted
				})
			],
			[
				{account_id: '12345', type: 'lol', amount: 292.3}, 
				new ValidationError('lol')
			]
		]
		test.each(testcases)('should only accepts transaction type as credit or debit', async (transactiooParams, expected) => {
			try {
				const result = await sut.add(transactiooParams)
				const expected_result = await expected(result.id)

				expect(result.id).toBeTruthy()
				expect(result.account_id).toBe(expected_result.account_id)
				expect(result.amount).toBe(expected_result.amount)
				expect(result.type).toBe(expected_result.type)
			} catch (error) {
				expect(error.name).toEqual(new ValidationError().name)
			}
		})
	})
})
