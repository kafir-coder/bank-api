export const GET_ACCOUNT_REPOSITORY = 'GET_ACCOUNT_REPOSITORY'
export interface IGetAccountRepository {
  existsByCPF(cpf: string): Promise<boolean>
}
