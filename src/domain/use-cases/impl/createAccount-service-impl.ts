import {Adapter, Service} from '@tsclean/core'
import {ICreateAccountService} from '../../use-cases/createAccount-service'
import { ADD_ACCOUNT_REPOSITORY, ICreateAccountRepository } from '../../models/contracts/createAccount-repository'
import { AddAccountParams, AccountModel } from 'src/domain/models/account'
import { GET_ACCOUNT_REPOSITORY, IGetAccountRepository } from '../../models/contracts/getAccount-repository'
@Service()
export class CreateAccountServiceImpl implements ICreateAccountService {
	constructor(
        @Adapter(ADD_ACCOUNT_REPOSITORY) private readonly createAccountRepository: ICreateAccountRepository,
				@Adapter(GET_ACCOUNT_REPOSITORY) private readonly getAccountRepository: IGetAccountRepository
	) {}

	async createAccountService(data: AddAccountParams): Promise<AccountModel | null> {
		const {cpf} = data
		const alredy_exists = await this.getAccountRepository.existsByCPF(cpf)

		if (alredy_exists) return null

		return Object.assign({id: 'some-id'}, data)
	} 
}

