import {Adapter, Service} from '@tsclean/core'
import { IWriteTransactionRepository, WRITE_TRANSACTION_REPOSITORY } from '../../models/contracts/writeTransaction-repository'
import { IReadAccountRepository, READ_ACCOUNT_REPOSITORY } from '../../models/contracts/readAccount-repository'
import { AddTransactionParams, TransactionModel } from '../../models/transaction'
import {IDebitFromAccountService} from '../../use-cases/debitFromAccount-service'
import { IWriteAccountRepository, WRITE_ACCOUNT_REPOSITORY } from '../../models/contracts/writeAccount-repository'

@Service()
export class DebitFromAccountServiceImpl implements IDebitFromAccountService {
	constructor(
		@Adapter(READ_ACCOUNT_REPOSITORY) private readonly readAccountRepository: IReadAccountRepository,
		@Adapter(WRITE_TRANSACTION_REPOSITORY) private readonly writeTransactionRepository: IWriteTransactionRepository,
		@Adapter(WRITE_ACCOUNT_REPOSITORY) private readonly writeAccountRepository: IWriteAccountRepository,
	) {}

	async debitFromAccount(data: Omit<AddTransactionParams, 'type'>): Promise<TransactionModel | null> {
		
		const { account_id, value } = data
		
		const account_exists = await this.readAccountRepository.exists(account_id)
		if (!account_exists) return null // conta inexistente

		const balance = await this.readAccountRepository.getBalance(account_id)

		const difference = balance-value
		if (difference < 0) return null // conta não tem dinheiro suficiente

		const transaction = await this.writeTransactionRepository.add({...data, type: 'debit'})

		await this.writeAccountRepository.update({balance: difference})
		return transaction
	}
}
