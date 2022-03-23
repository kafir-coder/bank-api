import { ICreditToAccountService } from '@/domain/use-cases/creditToAccount-service'
import { IDebitFromAccountService } from '@/domain/use-cases/debitFromAccount-service'
import { CreditToAccountServiceMock, DebitFromAccountServiceMock } from './mocks'
import { TransferMoneyController } from './transferMoney-controller'


type SutTypes = {
  sut: TransferMoneyController,
  debitFromAccountService: IDebitFromAccountService,
  creditToAccountService: ICreditToAccountService
}
const make_sut = (): SutTypes=> {

	const debitFromAccountService = new DebitFromAccountServiceMock()
	const creditToAccountService = new CreditToAccountServiceMock()

	const sut = new TransferMoneyController(debitFromAccountService, creditToAccountService)

	return {
		sut, 
		debitFromAccountService,
		creditToAccountService
	}
}



describe('TransferMoney controller', () => {
  
 
})
