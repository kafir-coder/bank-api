import {Adapter, Service} from '@tsclean/core'
import { IReadAccountRepository, READ_ACCOUNT_REPOSITORY } from '@/domain/models/contracts/readAccount-repository'
import {IGetBalanceService} from '../getBalance-service'
import { AccountDoesntExistsError } from '@/domain/errors'

@Service()
export class GetBalanceServiceImpl implements IGetBalanceService {
	constructor(
        @Adapter(READ_ACCOUNT_REPOSITORY) private readonly readAccountRepository: IReadAccountRepository,
	) {
	}

	async getBalance(account_id: string): Promise<number | Error> {
		const account_exists = await this.readAccountRepository.exists(account_id)
		if (!account_exists) return new AccountDoesntExistsError() // AccountDoesntExistsError
		const balance = await this.readAccountRepository.getBalance(account_id)
		return balance
	}
}
