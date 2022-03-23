import { ICreditToAccountService } from '@/domain/use-cases/creditToAccount-service'
import { IDebitFromAccountService } from '@/domain/use-cases/debitFromAccount-service'
import { CreditToAccountServiceMock, DebitFromAccountServiceMock } from './mocks'
import { TransferControllerParams, TransferMoneyController } from './transferMoney-controller'


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
  
	it('should call DebitFromAccountService.debitFromAccount', async () => {
		const { sut, debitFromAccountService } = make_sut()
		const transferParams: TransferControllerParams = {
			origin_account_id: 'some-id',
			target_account_id: 'other-id',
			amount: 20
		}

		jest.spyOn(debitFromAccountService, 'debitFromAccount')
		await sut.transferMoney(transferParams)
		expect(debitFromAccountService.debitFromAccount).toHaveBeenCalledTimes(1)
	})
})
