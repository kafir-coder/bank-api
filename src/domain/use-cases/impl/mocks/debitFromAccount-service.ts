import { IWriteTransactionRepository } from '@/domain/models/contracts/writeTransaction-repository'
import { AddTransactionParams, TransactionModel } from '@/domain/models/transaction'

export class WriteTransactionRepositoryMock implements IWriteTransactionRepository {
	async add(data: AddTransactionParams): Promise<TransactionModel> {
		return Object.assign({id: 'some-id'}, data)
	}
}
