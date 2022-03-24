import { AccountDoesntExistsError } from '@/domain/errors'
import { IAccountExistsService } from '@/domain/use-cases/accountExists-service'
import { ICreditToAccountService } from '@/domain/use-cases/creditToAccount-service'
import { IDebitFromAccountService } from '@/domain/use-cases/debitFromAccount-service'
import { AccountExistsServiceMock, CreditToAccountServiceMock, DebitFromAccountServiceMock } from './mocks'
import { TransferControllerParams, TransferMoneyController } from './transferMoney-controller'


type SutTypes = {
  sut: TransferMoneyController,
	accountExistsService: IAccountExistsService,
  debitFromAccountService: IDebitFromAccountService,
  creditToAccountService: ICreditToAccountService
}
const make_sut = (): SutTypes=> {

	const debitFromAccountService = new DebitFromAccountServiceMock()
	const creditToAccountService = new CreditToAccountServiceMock()
	const accountExistsService = new AccountExistsServiceMock()
	const sut = new TransferMoneyController(accountExistsService ,debitFromAccountService, creditToAccountService)

	return {
		sut, 
		accountExistsService,
		debitFromAccountService,
		creditToAccountService
	}
}



describe('TransferMoney controller', () => {
  
	it('should call AccountExistsService.exists 2 times', async () => {
		const { sut, accountExistsService } = make_sut()

		const transferParams: TransferControllerParams = {
			origin_account_id: 'some-id',
			target_account_id: 'other-id',
			amount: 20
		}

		jest.spyOn(accountExistsService, 'exists')
		await sut.transferMoney(transferParams)
		expect(accountExistsService.exists).toHaveBeenCalledTimes(2)
	})

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

	it('should call DebitFromAccountService.debitFromAccount with proper argument', async () => {
		const { sut, debitFromAccountService } = make_sut()
		const transferParams: TransferControllerParams = {
			origin_account_id: 'some-id',
			target_account_id: 'other-id',
			amount: 20
		}

		jest.spyOn(debitFromAccountService, 'debitFromAccount')
		await sut.transferMoney(transferParams)
		expect(debitFromAccountService.debitFromAccount).toHaveBeenCalledWith( {
			account_id: transferParams.origin_account_id,
			amount: transferParams.amount,
			type: 'debit'
		})
	})

	it('should return 400 if DebitFromAccountService.debitFromAccount returns AccountDoesntExistsError', async () => {
		const { sut, debitFromAccountService } = make_sut()
		const transferParams: TransferControllerParams = {
			origin_account_id: 'some-id',
			target_account_id: 'other-id',
			amount: 20
		}
		jest.spyOn(debitFromAccountService, 'debitFromAccount').mockReturnValue(Promise.resolve(new AccountDoesntExistsError()))
		try {
			await sut.transferMoney(transferParams)
		} catch (error) {
			expect(error.name).toBe('BadRequestException')
		}
	})

	it('should call CreditToAccountService.creditToAccount', async () => {
		const { sut, creditToAccountService } = make_sut()

		const transferParams: TransferControllerParams = {
			origin_account_id: 'some-id',
			target_account_id: 'other-id',
			amount: 20
		}

		jest.spyOn(creditToAccountService, 'creditToAccount')

		await sut.transferMoney(transferParams)

		expect(creditToAccountService.creditToAccount).toHaveBeenCalledTimes(1)
	})

	it('should call CreditToAccountService.creditToAccount with proper argument', async () => {
		const { sut, creditToAccountService } = make_sut()

		const transferParams: TransferControllerParams = {
			origin_account_id: 'some-id',
			target_account_id: 'other-id',
			amount: 20
		}

		jest.spyOn(creditToAccountService, 'creditToAccount')

		await sut.transferMoney(transferParams)

		expect(creditToAccountService.creditToAccount).toHaveBeenCalledWith({
			account_id: transferParams.target_account_id,
			amount: transferParams.amount,
			type: 'credit'
		})
	})
})
