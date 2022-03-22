import { AddTransactionParams, TransactionModel } from '../models/transaction'

export const DEBIT_FROM_ACCOUNT_SERVICE = 'DEBIT_FROM_ACCOUNT_SERVICE'
export interface IDebitFromAccountService {
  debitFromAccount(data: AddTransactionParams): Promise<TransactionModel | Error>
}
