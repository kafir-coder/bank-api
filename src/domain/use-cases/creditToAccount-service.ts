import { AddTransactionParams, TransactionModel } from '../models/transaction'

export interface ICreditToAccountService {
  creditToAccount(data: AddTransactionParams): Promise<TransactionModel | null>
}
