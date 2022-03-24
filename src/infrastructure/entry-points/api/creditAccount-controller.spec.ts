import { AddTransactionParams, TransactionModel } from '@/domain/models/transaction'
import { IAccountExistsService } from '@/domain/use-cases/accountExists-service'
import { ICreditToAccountService } from '@/domain/use-cases/creditToAccount-service'
import { CreditAccountController, CreditAccountControllerParams } from './creditAccount-controller'
import { ok } from './helpers/http-helpers'
import { AccountExistsServiceMock } from './mocks'

class CreditToAccountServiceMock implements ICreditToAccountService {
	async creditToAccount(data: AddTransactionParams): Promise<TransactionModel | Error> {
		return {...data, id: 'some-id'}
	}
}

type SutTypes = {
  sut: CreditAccountController,
	accountExistsService: IAccountExistsService,
  creditFromAccountService: ICreditToAccountService
}
const make_sut = (): SutTypes => {

	const creditFromAccountService = new CreditToAccountServiceMock()
	const accountExistsService = new AccountExistsServiceMock()
	const sut = new CreditAccountController(accountExistsService, creditFromAccountService)

	return { 
		sut,
		accountExistsService, 
		creditFromAccountService
	}
}

describe('CreditToAccount controller', () => {

	it('should call AccountExistsService.exists', async () => {
		const { sut, accountExistsService } = make_sut()

		const creditParams: CreditAccountControllerParams = {
			account_id: 'some-id',
			amount: 20.2
		}

		jest.spyOn(accountExistsService, 'exists')
		await sut.creditToAccount(creditParams)
		expect(accountExistsService.exists).toHaveBeenCalledTimes(1)
	})

	it('should call AccountExistsService.exists with proper argument', async () => {
		const { sut, accountExistsService } = make_sut()

		const creditParams: CreditAccountControllerParams = {
			account_id: 'some-id',
			amount: 20.2
		}

		jest.spyOn(accountExistsService, 'exists')
		await sut.creditToAccount(creditParams)
		expect(accountExistsService.exists).toHaveBeenCalledWith(creditParams.account_id)
	})

	it('should return 400 if AccountExistsService.exists returns false', async () => {
		const { sut, accountExistsService } = make_sut()

		const creditParams: CreditAccountControllerParams = {
			account_id: 'some-id',
			amount: 20.2
		}

		jest.spyOn(accountExistsService, 'exists').mockReturnValue(Promise.resolve(false))
		
		try {
			await sut.creditToAccount(creditParams)
		} catch (error) {
			expect(error.name).toBe('BadRequestException')
		}
	})
	it('should call CreditToAccountService.creditToAccount', async () => {
		const { sut, creditFromAccountService } = make_sut()

		const creditParams: CreditAccountControllerParams = {
			account_id: 'some-id',
			amount: 20.2
		}
		jest.spyOn(creditFromAccountService, 'creditToAccount')
		await sut.creditToAccount(creditParams)

		expect(creditFromAccountService.creditToAccount).toHaveBeenCalledTimes(1)
	})
	it('should call CreditToAccountService.creditToAccount with proper argument', async () => {
		const { sut, creditFromAccountService } = make_sut()

		const creditParams: CreditAccountControllerParams = {
			account_id: 'some-id',
			amount: 20.2
		}
		jest.spyOn(creditFromAccountService, 'creditToAccount')
		await sut.creditToAccount(creditParams)

		expect(creditFromAccountService.creditToAccount).toHaveBeenCalledWith({...creditParams, type: 'credit'})
	})

	it('should return ok', async () => {
		const { sut, creditFromAccountService } = make_sut()

		const creditParams: CreditAccountControllerParams = {
			account_id: 'some-id',
			amount: 20.2
		}
		jest.spyOn(creditFromAccountService, 'creditToAccount')
		const result = await sut.creditToAccount(creditParams)
			
		expect(result).toEqual(ok({...creditParams, id: 'some-id', type: 'credit'}))
	})
})
