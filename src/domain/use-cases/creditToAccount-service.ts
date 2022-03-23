import { AddTransactionParams, TransactionModel } from '../models/transaction'

export const CREDIT_TO_ACCOUNT_SERVICE = 'CREDIT_TO_ACCOUNT_SERVICE'
export interface ICreditToAccountService {
  creditToAccount(data: AddTransactionParams): Promise<TransactionModel | Error>
}
