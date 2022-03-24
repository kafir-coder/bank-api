import {Adapter, Service} from '@tsclean/core'
import {IAccountExistsService} from '@/domain/use-cases/accountExists-service'
import { IReadAccountRepository, READ_ACCOUNT_REPOSITORY } from '@/domain/models/contracts/readAccount-repository'

@Service()
export class AccountExistsServiceImpl implements IAccountExistsService {
	constructor(
        @Adapter(READ_ACCOUNT_REPOSITORY) private readonly readAccountRepository: IReadAccountRepository
	) {}
	async exists(account_id: string): Promise<boolean> {
		throw new Error('Method not implemented.')
	}
}
