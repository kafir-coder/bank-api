import { IReadAccountRepository } from 'src/domain/models/contracts/readAccount-repository'
import { IWriteAccountRepository } from 'src/domain/models/contracts/writeAccount-repository'
import {AccountModel, AddAccountParams} from '../../../../../domain/models/account'
import {AccountModelSchema} from './models/account'

export class AccountMongooseRepositoryAdapter implements IWriteAccountRepository, IReadAccountRepository{
	async create(data: AddAccountParams): Promise<AccountModel> {
		const {balance, cpf, owner_name, _id} = await AccountModelSchema.create(data)
		return {
			id: _id.toString(),
			balance, 
			cpf,
			owner_name
		}
	}
	async exists(account_id: string): Promise<boolean> {
		return true
	}
	async existsByCPF(cpf: string): Promise<boolean> {
		return true
	}
	async getBalance(account_id: string): Promise<number | null> {
		return 23.4
	}
	async update(data: Partial<AddAccountParams>): Promise<AccountModel> {
		// eslint-disable-next-line @typescript-eslint/ban-ts-comment
		//@ts-ignore
		return {...data, id: '22'}
	}
}
