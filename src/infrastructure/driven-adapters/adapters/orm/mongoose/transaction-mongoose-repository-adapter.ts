import {TransactionModelSchema} from './models/transaction'
import { IWriteTransactionRepository } from '@/domain/models/contracts/writeTransaction-repository'
import { AddTransactionParams, TransactionModel } from '@/domain/models/transaction'

export class TransactionMongooseRepositoryAdapter implements IWriteTransactionRepository{
	async add(data: AddTransactionParams): Promise<TransactionModel> {
		const transaction =	await TransactionModelSchema.create(data)
		const {_id, ...rest} = transaction.toJSON()
		return Object.assign({id: _id}, rest)
	}
}
