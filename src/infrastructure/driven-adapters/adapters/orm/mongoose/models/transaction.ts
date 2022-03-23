import { TransactionModel } from '@/domain/models/transaction'
import { model, Schema } from 'mongoose'

const schema = new Schema<TransactionModel>({
	account_id: {type: String, required: true},
	amount: {type: Number, required: true},
	type: {type: String, enum: ['credit', 'debit'], required: true}
})

export const TransactionModelSchema = model<TransactionModel>('transactions', schema)
