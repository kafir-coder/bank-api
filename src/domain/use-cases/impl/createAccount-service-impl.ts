import {Adapter, Service} from '@tsclean/core'
import {ICreateAccountService} from '@/domain/use-cases/createAccount-service'
import { IWriteAccountRepository, WRITE_ACCOUNT_REPOSITORY } from '../../models/contracts/writeAccount-repository'
import { AddAccountParams, AccountModel } from '@/domain/models/account'
@Service()
export class CreateAccountServiceImpl implements ICreateAccountService {
	constructor(
        @Adapter(WRITE_ACCOUNT_REPOSITORY) private readonly createAccountRepository: IWriteAccountRepository
	) {}

	async createAccountService(data: AddAccountParams): Promise<AccountModel> {
		const account = await this.createAccountRepository.create(data)
		return account
	} 
}

