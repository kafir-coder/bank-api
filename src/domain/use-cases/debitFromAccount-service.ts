import { AddTransactionParams, TransactionModel } from '../models/transaction'

export interface IDebitFromAccountService {
  debitFromAccount(data: AddTransactionParams): Promise<TransactionModel | Error>
}
