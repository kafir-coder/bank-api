import { READ_ACCOUNT_REPOSITORY } from '@/domain/models/contracts/readAccount-repository'
import { WRITE_ACCOUNT_REPOSITORY } from '@/domain/models/contracts/writeAccount-repository'
import { WRITE_TRANSACTION_REPOSITORY } from '@/domain/models/contracts/writeTransaction-repository'
import { DEBIT_FROM_ACCOUNT_SERVICE } from '@/domain/use-cases/debitFromAccount-service'
import { DebitFromAccountServiceImpl } from '@/domain/use-cases/impl/debitFromAccount-service-impl'
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
	}
]
