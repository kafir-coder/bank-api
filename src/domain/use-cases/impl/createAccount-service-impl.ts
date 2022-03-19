import {Adapter, Service} from '@tsclean/core'
import {ICreateAccountService} from '../../use-cases/createAccount-service'
import { IWriteAccountRepository, WRITE_ACCOUNT_REPOSITORY } from '../../models/contracts/writeAccount-repository'
import { AddAccountParams, AccountModel } from 'src/domain/models/account'
import { IReadAccountRepository, READ_ACCOUNT_REPOSITORY } from '../../models/contracts/readAccount-repository'
@Service()
export class CreateAccountServiceImpl implements ICreateAccountService {
	constructor(
        @Adapter(WRITE_ACCOUNT_REPOSITORY) private readonly createAccountRepository: IWriteAccountRepository,
				@Adapter(READ_ACCOUNT_REPOSITORY) private readonly getAccountRepository: IReadAccountRepository
	) {}

	async createAccountService(data: AddAccountParams): Promise<AccountModel | null> {
		const {cpf} = data
		const already_exists = await this.getAccountRepository.existsByCPF(cpf)

		if (already_exists) return null

		const account = await this.createAccountRepository.create(data)
		return account
	} 
}

