import { CreateAccountController } from './createAccount-controller'
import { CreditAccountController } from './creditAccount-controller'
import { DebitAccountController } from './debitAccount-controller'
import { GetBalanceController } from './getBalance-controller'
import { TransferMoneyController } from './transferMoney-controller'

export const controllers = [
	DebitAccountController,
	CreditAccountController,
	GetBalanceController,
	CreateAccountController,
	TransferMoneyController
]
