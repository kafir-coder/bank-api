import {Adapter, Service} from '@tsclean/core'
import { IReadAccountRepository, READ_ACCOUNT_REPOSITORY } from 'src/domain/models/contracts/readAccount-repository'
import {IGetBalanceService} from '../getBalance-service'

@Service()
export class GetBalanceServiceImpl implements IGetBalanceService {
	constructor(
        @Adapter(READ_ACCOUNT_REPOSITORY) private readonly readAccountRepository: IReadAccountRepository,
	) {
	}

	async getBalance(account_id: string): Promise<number> {
		return 20.2  
	}
}
