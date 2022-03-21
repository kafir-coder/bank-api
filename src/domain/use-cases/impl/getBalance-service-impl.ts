import {Adapter, Service} from '@tsclean/core'
import { IReadAccountRepository, READ_ACCOUNT_REPOSITORY } from '../../models/contracts/readAccount-repository'
import {IGetBalanceService} from '../getBalance-service'

@Service()
export class GetBalanceServiceImpl implements IGetBalanceService {
	constructor(
        @Adapter(READ_ACCOUNT_REPOSITORY) private readonly readAccountRepository: IReadAccountRepository,
	) {
	}

	async getBalance(account_id: string): Promise<number | null> {
		const account_exists = await this.readAccountRepository.exists(account_id)
		if (!account_exists) return null // AccountDoesntExistsError
		const balance = await this.readAccountRepository.getBalance(account_id)
		return balance
	}
}
