import mongoose from 'mongoose'
import { IReadAccountRepository } from 'src/domain/models/contracts/readAccount-repository'
import { IWriteAccountRepository } from 'src/domain/models/contracts/writeAccount-repository'
import {AccountModel, AddAccountParams} from '../../../../../domain/models/account'
import {AccountModelSchema} from './models/account'

export class AccountMongooseRepositoryAdapter implements IWriteAccountRepository, IReadAccountRepository{
	async create(data: AddAccountParams): Promise<AccountModel> {
		const account = await AccountModelSchema.create(data)
		const {balance, cpf, owner_name, _id} = account
		return {
			id: _id.toString(),
			balance, 
			cpf,
			owner_name
		}
	}
	async exists(account_id: string): Promise<boolean> {
		return (await AccountModelSchema.exists({
			_id: new mongoose.mongo.ObjectId(account_id)
		})) !== null ? true: false
	}
	async existsByCPF(cpf: string): Promise<boolean> {
		return (await AccountModelSchema.exists({cpf})) !== null ? true: false
	}
	async getBalance(account_id: string): Promise<number | null> {
		const account = await AccountModelSchema.findById(account_id)
		return account?.balance || null
	}
	async update(id: string, data: Partial<AddAccountParams>): Promise<AccountModel> {
		// eslint-disable-next-line @typescript-eslint/ban-ts-comment
		//@ts-ignore
		return {...data, id: '22'}
	}
}
