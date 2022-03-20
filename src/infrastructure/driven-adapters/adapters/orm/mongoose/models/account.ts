import { AccountModel } from '../../../../../../domain/models/account'
import { model, Schema } from 'mongoose'

const schema = new Schema<AccountModel>({
	cpf: {type: String, required: true, unique: true},
	owner_name: {type: String, required: true},
	balance: {type: Number, required: true}
})

export const AccountModelSchema = model<AccountModel>('accounts', schema)
