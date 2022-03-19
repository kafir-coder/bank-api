import {Adapter, Service} from '@tsclean/core'
import { ADD_TRANSACTION_REPOSITORY, IAddTransactionRepository } from '../../models/contracts/addTransaction-repository'
import { GET_ACCOUNT_REPOSITORY, IGetAccountRepository } from '../../models/contracts/getAccount-repository'
import { AddTransactionParams, TransactionModel } from '../../models/transaction'
import {IDebitFromAccountService} from '../../use-cases/debitFromAccount-service'

@Service()
export class DebitFromAccountServiceImpl implements IDebitFromAccountService {
	constructor(
		@Adapter(GET_ACCOUNT_REPOSITORY) private readonly getAccountRepository: IGetAccountRepository,
		@Adapter(ADD_TRANSACTION_REPOSITORY) private readonly addTransactionRepository: IAddTransactionRepository
	) {}

	async debitFromAccount(data: AddTransactionParams): Promise<TransactionModel | null> {
		
		const { account_id, value, type } = data

		if (type !== 'debit') return null
		
		const account_exists = await this.getAccountRepository.exists(account_id)
		if (!account_exists) return null

		const balance = await this.getAccountRepository.getBalance(account_id)

		if (balance-value < 0) return null

		const transaction = await this.addTransactionRepository.add(data)
		return transaction
	}
}
