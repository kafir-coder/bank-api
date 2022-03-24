import {Adapter, Service} from '@tsclean/core'
import { IWriteAccountRepository, WRITE_ACCOUNT_REPOSITORY } from '@/domain/models/contracts/writeAccount-repository'
import { IReadAccountRepository, READ_ACCOUNT_REPOSITORY } from '@/domain/models/contracts/readAccount-repository'
import { IWriteTransactionRepository, WRITE_TRANSACTION_REPOSITORY } from '@/domain/models/contracts/writeTransaction-repository'
import { AddTransactionParams, TransactionModel } from '@/domain/models/transaction'
import {ICreditToAccountService} from '../creditToAccount-service'

@Service()
export class CreditToAccountServiceImpl implements ICreditToAccountService {
	constructor(
        @Adapter(READ_ACCOUNT_REPOSITORY) private readonly readAccountRepository: IReadAccountRepository,
        @Adapter(WRITE_TRANSACTION_REPOSITORY) private readonly writeTransactionRepository: IWriteTransactionRepository,
				@Adapter(WRITE_ACCOUNT_REPOSITORY) private readonly writeAccountRepository: IWriteAccountRepository
	) {
	}
	async creditToAccount(data: Omit<AddTransactionParams, 'type'>): Promise<TransactionModel | Error> {
		const { account_id, amount } = data
		
		const balance = await this.readAccountRepository.getBalance(account_id)
		// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
		const sum = balance!+amount
		const transaction = await this.writeTransactionRepository.add({...data,  type: 'credit'})

		await this.writeAccountRepository.update(account_id,{balance: sum})
		return transaction
	}
}
