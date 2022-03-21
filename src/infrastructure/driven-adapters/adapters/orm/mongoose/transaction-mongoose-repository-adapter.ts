import {TransactionModelSchema} from './models/transaction'
import { IWriteTransactionRepository } from '../../../../../domain/models/contracts/writeTransaction-repository'
import { AddTransactionParams, TransactionModel } from '../../../../../domain/models/transaction'

export class TransactionMongooseRepositoryAdapter implements IWriteTransactionRepository{
	async add(data: AddTransactionParams): Promise<TransactionModel> {
		return {...data, id: 'some-id'}
	}
}
