import { IWriteTransactionRepository } from 'src/domain/models/contracts/writeTransaction-repository'
import { AddTransactionParams, TransactionModel } from 'src/domain/models/transaction'

export class WriteTransactionRepositoryMock implements IWriteTransactionRepository {
	async add(data: AddTransactionParams): Promise<TransactionModel> {
		return Object.assign({id: 'some-id'}, data)
	}
}
