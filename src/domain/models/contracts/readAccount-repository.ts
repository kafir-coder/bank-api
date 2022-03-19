export const READ_ACCOUNT_REPOSITORY = 'GET_ACCOUNT_REPOSITORY'
export interface IReadAccountRepository {
  existsByCPF(cpf: string): Promise<boolean>
  exists(account_id: string): Promise<boolean>
  getBalance(account_id: string): Promise<number>
}
