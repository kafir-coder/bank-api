import { AddAccountParams, AccountModel } from '@/domain/models/account'
import { AddTransactionParams, TransactionModel } from '@/domain/models/transaction'
import { IAccountExistsService } from '@/domain/use-cases/accountExists-service'
import { IAccountExistsByCpfService } from '@/domain/use-cases/accountExistsByCpf-service'
import { ICreateAccountService } from '@/domain/use-cases/createAccount-service'
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

export class CreateAccountServiceMock implements ICreateAccountService {
	async createAccountService(data: AddAccountParams): Promise<AccountModel> {
		return {id: 'some-id', ...data}
	}
	
}

export class AccountExistsByCpfServiceMock implements IAccountExistsByCpfService {
	async existsByCpf(cpf: string): Promise<boolean> {
		return true
	}
}

export class AccountExistsServiceMock implements IAccountExistsService {
	async exists(cpf: string): Promise<boolean> {
		return true
	}
}
