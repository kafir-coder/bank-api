import { AccountModel, AddAccountParams } from '../account'

export const WRITE_ACCOUNT_REPOSITORY = 'CREATE_ACCOUNT_REPOSITORY'
export interface IWriteAccountRepository {
    create(data: AddAccountParams): Promise<AccountModel>
    update(id: string, data: Partial<AddAccountParams>): Promise<AccountModel>
}
