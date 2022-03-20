export interface IGetBalanceService {
  getBalance(account_id: string): Promise<number | null>
}
