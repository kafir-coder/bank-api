import { READ_ACCOUNT_REPOSITORY } from '@/domain/models/contracts/readAccount-repository'
import { WRITE_ACCOUNT_REPOSITORY } from '@/domain/models/contracts/writeAccount-repository'
import { WRITE_TRANSACTION_REPOSITORY } from '@/domain/models/contracts/writeTransaction-repository'
import { ACCOUNT_EXISTS_SERVICE } from '@/domain/use-cases/accountExists-service'
import { ACCOUNT_EXISTS_BY_CPF_SERVICE } from '@/domain/use-cases/accountExistsByCpf-service'
import { CREATE_ACCOUNT_SERVICE } from '@/domain/use-cases/createAccount-service'
import { CREDIT_TO_ACCOUNT_SERVICE } from '@/domain/use-cases/creditToAccount-service'
import { DEBIT_FROM_ACCOUNT_SERVICE } from '@/domain/use-cases/debitFromAccount-service'
import { GET_BALANCE_SERVICE } from '@/domain/use-cases/getBalance-service'
import { AccountExistsServiceImpl } from '@/domain/use-cases/impl/accountExists-service-impl'
import { AccountExistsByCpfServiceImpl } from '@/domain/use-cases/impl/accountExistsByCpf-service-impl'
import { CreateAccountServiceImpl } from '@/domain/use-cases/impl/createAccount-service-impl'
import { CreditToAccountServiceImpl } from '@/domain/use-cases/impl/creditToAccount-service-impl'
import { DebitFromAccountServiceImpl } from '@/domain/use-cases/impl/debitFromAccount-service-impl'
import { GetBalanceServiceImpl } from '@/domain/use-cases/impl/getBalance-service-impl'
import { AccountMongooseRepositoryAdapter } from '../adapters/orm/mongoose/account-mongoose-repository-adapter'
import { TransactionMongooseRepositoryAdapter } from '../adapters/orm/mongoose/transaction-mongoose-repository-adapter'

export const adapters = [

	{
		provide: READ_ACCOUNT_REPOSITORY,
		useClass: AccountMongooseRepositoryAdapter
	},
	{
		provide: WRITE_ACCOUNT_REPOSITORY,
		useClass: AccountMongooseRepositoryAdapter
	},
	{
		provide: WRITE_TRANSACTION_REPOSITORY,
		useClass: TransactionMongooseRepositoryAdapter
	}
	
]
        
export const services = [
	{
		provide: DEBIT_FROM_ACCOUNT_SERVICE, 
		useClass: DebitFromAccountServiceImpl
	},
	{
		provide: CREDIT_TO_ACCOUNT_SERVICE,
		useClass: CreditToAccountServiceImpl
	},
	{
		provide: GET_BALANCE_SERVICE,
		useClass: GetBalanceServiceImpl
	},
	{
		provide: CREATE_ACCOUNT_SERVICE,
		useClass: CreateAccountServiceImpl
	}, 
	{
		provide: ACCOUNT_EXISTS_BY_CPF_SERVICE,
		useClass: AccountExistsByCpfServiceImpl
	},
	{
		provide: ACCOUNT_EXISTS_SERVICE,
		useClass: AccountExistsServiceImpl,
	}
]
