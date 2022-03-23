import { AccountDoesntExistsError } from '@/domain/errors'
import { AddTransactionParams, TransactionModel } from '@/domain/models/transaction'
import { ICreditToAccountService } from '@/domain/use-cases/creditToAccount-service'
import { CreditAccountController, CreditAccountControllerParams } from './creditAccount-controller'
import { ok } from './helpers/http-helpers'

class CreditToAccountServiceMock implements ICreditToAccountService {
	async creditToAccount(data: AddTransactionParams): Promise<TransactionModel | Error> {
		return {...data, id: 'some-id'}
	}
}

type SutTypes = {
  sut: CreditAccountController,
  creditFromAccountService: ICreditToAccountService
}
const make_sut = (): SutTypes => {

	const creditFromAccountService = new CreditToAccountServiceMock()

	const sut = new CreditAccountController(creditFromAccountService)

	return { 
		sut,
		creditFromAccountService
	}
}

describe('CreditToAccount controller', () => {
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
	
	it('should returns 400 if CreditAccountService.creditToAccount returns AccountDoesntExistsError', async () => {
		const { sut, creditFromAccountService } = make_sut()

		const creditParams: CreditAccountControllerParams = {
			account_id: 'some-id',
			amount: 20.2
		}
		jest.spyOn(creditFromAccountService, 'creditToAccount').mockReturnValue(Promise.resolve(new AccountDoesntExistsError()))

		try {
			await sut.creditToAccount(creditParams)
		} catch (error) {
			expect(error.name).toBe('BadRequestException')
		}
	})

	it('should return TransactionModel Object if Service.creditToAccount returns TransactionModel', async () => {
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
