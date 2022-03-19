import { AddTransactionParams, TransactionModel } from '../transaction'

export const WRITE_TRANSACTION_REPOSITORY = 'ADD_TRANSACTION_REPOSITORY'
export interface IWriteTransactionRepository {
    add(data: AddTransactionParams): Promise<TransactionModel>
}
