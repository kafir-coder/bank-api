import { AccountModel, AddAccountParams } from '../models/account'

export const CREATE_ACCOUNT_SERVICE = 'CREATE_ACCOUNT_SERVICE'
export interface ICreateAccountService {
  createAccountService(data: AddAccountParams): Promise<AccountModel | null>
}
