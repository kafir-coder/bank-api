import { AddTransactionParams, TransactionModel } from '../transaction'

export const ADD_TRANSACTION_REPOSITORY = 'ADD_TRANSACTION_REPOSITORY'
export interface IAddTransactionRepository {
    add(data: AddTransactionParams): Promise<TransactionModel>
}
