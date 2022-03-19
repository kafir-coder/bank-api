import {Adapter, Service} from '@tsclean/core'
import { IReadAccountRepository, READ_ACCOUNT_REPOSITORY } from 'src/domain/models/contracts/readAccount-repository'
import { IWriteTransactionRepository, WRITE_TRANSACTION_REPOSITORY } from 'src/domain/models/contracts/writeTransaction-repository'
import { AddTransactionParams, TransactionModel } from 'src/domain/models/transaction'
import {ICreditToAccountService} from '../creditToAccount-service'

@Service()
export class CreditToAccountServiceImpl implements ICreditToAccountService {
	constructor(
        @Adapter(READ_ACCOUNT_REPOSITORY) private readonly readAccountRepository: IReadAccountRepository,
        @Adapter(WRITE_TRANSACTION_REPOSITORY) private readonly writeTransactionRepository: IWriteTransactionRepository
	) {
	}
	async creditToAccount(data: AddTransactionParams): Promise<TransactionModel | null> {
		return Object.assign({id: 'some-id'}, data)
	}
}
