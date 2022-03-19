import { AccountModel, AddAccountParams } from 'src/domain/models/account'
import { ICreateAccountRepository } from 'src/domain/models/contracts/createAccount-repository'
import { IGetAccountRepository } from 'src/domain/models/contracts/getAccount-repository'

export class CreateAccountRepositoryMock implements ICreateAccountRepository {
	async create(data: AddAccountParams): Promise<AccountModel> {
		return Object.assign({id: 'some_id'}, data)
	}
}

export class GetAccountRepositoryMock implements IGetAccountRepository {
	async existsByCPF(cpf: string): Promise<boolean> {
		return typeof cpf === 'string'
	}
}
