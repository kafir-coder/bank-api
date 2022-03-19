import { AccountModel, AddAccountParams } from 'src/domain/models/account'
import { ICreateAccountRepository } from 'src/domain/models/contracts/writeAccount-repository'
import { IGetAccountRepository } from 'src/domain/models/contracts/readAccount-repository'

export class CreateAccountRepositoryMock implements ICreateAccountRepository {
	async create(data: AddAccountParams): Promise<AccountModel> {
		return Object.assign({id: 'some_id'}, data)
	}
}

export class GetAccountRepositoryMock implements IGetAccountRepository {
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
