import mongoose from 'mongoose'
import { IReadAccountRepository } from '@/domain/models/contracts/readAccount-repository'
import { IWriteAccountRepository } from '@/domain/models/contracts/writeAccount-repository'
import {AccountModel, AddAccountParams} from '@/domain/models/account'
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

		const update_result = await AccountModelSchema.updateOne({_id: new mongoose.mongo.ObjectId(id)}, data)

		// eslint-disable-next-line @typescript-eslint/ban-ts-comment
		//@ts-ignore
		return update_result.modifiedCount > 0 ? {...data, id: '22'} : null
	}
}
