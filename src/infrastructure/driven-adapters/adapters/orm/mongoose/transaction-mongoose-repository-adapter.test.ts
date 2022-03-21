// eslint-disable-next-line @typescript-eslint/ban-ts-comment
//@ts-nocheck
// eslint-disable-next-line @typescript-eslint/no-var-requires
import { IWriteTransactionRepository } from '../../../../../domain/models/contracts/writeTransaction-repository'
import { TransactionMongooseRepositoryAdapter } from './transaction-mongoose-repository-adapter'
import {connect} from 'mongoose'
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
		await AccountModelSchema.deleteMany({})
	})
	afterAll(async () => {
		await mongoose.connection.close()
	})
})
