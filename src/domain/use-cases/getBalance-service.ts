export const GET_BALANCE_SERVICE = 'GET_BALANCE_SERVICE'
export interface IGetBalanceService {
  getBalance(account_id: string): Promise<number | Error>
}
