export const ACCOUNT_EXISTS_BY_CPF_SERVICE = 'ACCOUNT_EXISTS_BY_CPF_SERVICE'
export interface IAccountExistsByCpfService {
  existsByCpf(cpf: string): Promise<boolean | Error>
}
