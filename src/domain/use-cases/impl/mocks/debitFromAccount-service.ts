import { IAddTransactionRepository } from 'src/domain/models/contracts/addTransaction-repository'
import { AddTransactionParams, TransactionModel } from 'src/domain/models/transaction'

export class AddTransactionRepositoryMock implements IAddTransactionRepository {
	async add(data: AddTransactionParams): Promise<TransactionModel> {
		return Object.assign({id: 'some-id'}, data)
	}
}
