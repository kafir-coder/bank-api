import {Adapter, Service} from '@tsclean/core'
import { IReadAccountRepository, READ_ACCOUNT_REPOSITORY } from '../../models/contracts/readAccount-repository'
import { IWriteTransactionRepository, WRITE_TRANSACTION_REPOSITORY } from '../../models/contracts/writeTransaction-repository'
import { AddTransactionParams, TransactionModel } from '../../models/transaction'
import {ICreditToAccountService} from '../creditToAccount-service'

@Service()
export class CreditToAccountServiceImpl implements ICreditToAccountService {
	constructor(
        @Adapter(READ_ACCOUNT_REPOSITORY) private readonly readAccountRepository: IReadAccountRepository,
        @Adapter(WRITE_TRANSACTION_REPOSITORY) private readonly writeTransactionRepository: IWriteTransactionRepository
	) {
	}
	async creditToAccount(data: Omit<AddTransactionParams, 'type'>): Promise<TransactionModel | null> {
		const { account_id } = data
		const account_exists = await this.readAccountRepository.exists(account_id)
		if (!account_exists) return null

		this.writeTransactionRepository.add({...data, type: 'some-id'})
		return Object.assign({id: 'some-id'}, {...data, type: 'credit'})
	}
}
