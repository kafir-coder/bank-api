import { AddTransactionParams, TransactionModel } from '@/domain/models/transaction'
import { ICreditToAccountService } from '@/domain/use-cases/creditToAccount-service'
import { IDebitFromAccountService } from '@/domain/use-cases/debitFromAccount-service'

export class CreditToAccountServiceMock implements ICreditToAccountService {
	async creditToAccount(data: AddTransactionParams): Promise<TransactionModel | Error> {
		return {...data, id: 'some-id'}
	}
}

export class DebitFromAccountServiceMock implements IDebitFromAccountService {
	async debitFromAccount(data: AddTransactionParams): Promise<TransactionModel | Error> {
		return {...data, id: 'some-id'}
	}
}
