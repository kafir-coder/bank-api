export const ACCOUNT_EXISTS_SERVICE = 'ACCOUNT_EXISTS_SERVICE'
export interface IAccountExistsService {
  exists(account_id: string): Promise<boolean>;
}
