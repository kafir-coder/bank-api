import {Adapter, Service} from '@tsclean/core'
import { IWriteTransactionRepository, WRITE_TRANSACTION_REPOSITORY } from '@/domain/models/contracts/writeTransaction-repository'
import { IReadAccountRepository, READ_ACCOUNT_REPOSITORY } from '@/domain/models/contracts/readAccount-repository'
import { AddTransactionParams, TransactionModel } from '@/domain/models/transaction'
import {IDebitFromAccountService} from '@/domain/use-cases/debitFromAccount-service'
import { IWriteAccountRepository, WRITE_ACCOUNT_REPOSITORY } from '@/domain/models/contracts/writeAccount-repository'
import { AccountDoesntExistsError } from '@/domain/errors/account-doesnt-exists-error'
import { AccountHasNotSufficientMoneyError } from '@/domain/errors/account-hasnot-sufficient-money-error'

@Service()
export class DebitFromAccountServiceImpl implements IDebitFromAccountService {
	constructor(
		@Adapter(READ_ACCOUNT_REPOSITORY) private readonly readAccountRepository: IReadAccountRepository,
		@Adapter(WRITE_TRANSACTION_REPOSITORY) private readonly writeTransactionRepository: IWriteTransactionRepository,
		@Adapter(WRITE_ACCOUNT_REPOSITORY) private readonly writeAccountRepository: IWriteAccountRepository,
	) {}

	async debitFromAccount(data: Omit<AddTransactionParams, 'type'>): Promise<TransactionModel | Error> {
		
		const { account_id, amount } = data
		
		const account_exists = await this.readAccountRepository.exists(account_id)
		if (!account_exists) return new AccountDoesntExistsError()

		const balance = await this.readAccountRepository.getBalance(account_id)

		// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
		const difference = balance!-amount
		if (difference < 0) return new AccountHasNotSufficientMoneyError() // AccountHasNotSufficientMoneyError

		const transaction = await this.writeTransactionRepository.add({...data, type: 'debit'})

		await this.writeAccountRepository.update(account_id,{balance: difference})
		return transaction
	}
}
