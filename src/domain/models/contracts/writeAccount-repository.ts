import { AccountModel, AddAccountParams } from '../account'

export const ADD_ACCOUNT_REPOSITORY = 'CREATE_ACCOUNT_REPOSITORY'
export interface ICreateAccountRepository {
    create(data: AddAccountParams): Promise<AccountModel>
    update(data: Partial<AddAccountParams>): Promise<AccountModel>
}
