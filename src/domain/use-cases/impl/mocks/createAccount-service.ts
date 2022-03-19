import { AccountModel, AddAccountParams } from 'src/domain/models/account'
import { IWriteAccountRepository } from 'src/domain/models/contracts/writeAccount-repository'
import { IReadAccountRepository } from 'src/domain/models/contracts/readAccount-repository'

export class WriteAccountRepositoryMock implements IWriteAccountRepository {
	async create(data: AddAccountParams): Promise<AccountModel> {
		return Object.assign({id: 'some_id'}, data)
	}
	async update(data: Partial<AddAccountParams>): Promise<AccountModel> {
		return Object.assign({id: 'some_id'}, data) as unknown as AccountModel
	}
}

export class ReadAccountRepositoryMock implements IReadAccountRepository {
	async existsByCPF(cpf: string): Promise<boolean> {
		return typeof cpf === 'string'
	}
	async exists(account_id: string): Promise<boolean> {
		return true
	}

	async getBalance(account_id: string): Promise<number> {
		return 24.2
	}
}
