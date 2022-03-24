import { AccountHasNotSufficientMoneyError } from '@/domain/errors'
import { AddTransactionParams, TransactionModel } from '@/domain/models/transaction'
import { IAccountExistsService } from '@/domain/use-cases/accountExists-service'
import { IDebitFromAccountService } from '@/domain/use-cases/debitFromAccount-service'
import { DebitAccountController, DebitAccountControllerParams } from './debitAccount-controller'
import { ok } from './helpers/http-helpers'
import { AccountExistsServiceMock } from './mocks'

class DebitFromAccountServiceMock implements IDebitFromAccountService {
	async debitFromAccount(data: AddTransactionParams): Promise<TransactionModel | Error> {
		return {...data, id: 'some-id'}
	}
}

type SutTypes = {
  sut: DebitAccountController,
	accountExistsService: IAccountExistsService,
  debitFromAccountService: IDebitFromAccountService
}
const make_sut = (): SutTypes => {

	const debitFromAccountService = new DebitFromAccountServiceMock()
	const accountExistsService = new AccountExistsServiceMock()
	const sut = new DebitAccountController(accountExistsService, debitFromAccountService)

	return { 
		sut,
		accountExistsService,
		debitFromAccountService
	}
}

describe('DebitFromAccount Controller', () => {

	it('should call AccountExistsService.exists', async () => {
		const { sut, accountExistsService } = make_sut()

		const debitParams: DebitAccountControllerParams = {
			account_id: 'some-id',
			amount: 20.2
		}

		jest.spyOn(accountExistsService, 'exists')
		await sut.debitFromAccount(debitParams)
		expect(accountExistsService.exists).toHaveBeenCalledTimes(1)
	})

	it('should call AccountExistsService.exists with proper argument', async () => {
		const { sut, accountExistsService } = make_sut()

		const debitParams: DebitAccountControllerParams = {
			account_id: 'some-id',
			amount: 20.2
		}

		jest.spyOn(accountExistsService, 'exists')
		await sut.debitFromAccount(debitParams)
		expect(accountExistsService.exists).toHaveBeenCalledWith(debitParams.account_id)
	})

	it('should return 400 if AccountExistsService.exists returns false', async () => {
		const { sut, accountExistsService } = make_sut()

		const debitParams: DebitAccountControllerParams = {
			account_id: 'some-id',
			amount: 20.2
		}

		jest.spyOn(accountExistsService, 'exists').mockReturnValue(Promise.resolve(false))
		
		try {
			await sut.debitFromAccount(debitParams)
		} catch (error) {
			expect(error.name).toBe('BadRequestException')
		}
	})
	it('should call DebitFromAccountService.debitFromAccount', async () => {
		const { sut, debitFromAccountService } = make_sut()

		const debitParams: DebitAccountControllerParams = {
			account_id: 'some-id',
			amount: 20.2
		}
		jest.spyOn(debitFromAccountService, 'debitFromAccount')
		await sut.debitFromAccount(debitParams)

		expect(debitFromAccountService.debitFromAccount).toHaveBeenCalledTimes(1)
	})

	it('should call DebitFromAccountService.debitFromAccount with proper argument', async () => {
		const { sut, debitFromAccountService } = make_sut()

		const debitParams: DebitAccountControllerParams = {
			account_id: 'some-id',
			amount: 20.2
		}
		jest.spyOn(debitFromAccountService, 'debitFromAccount')
		await sut.debitFromAccount(debitParams)

		expect(debitFromAccountService.debitFromAccount).toHaveBeenCalledWith({...debitParams, type: 'debit'})
	})

	it('should return 400 if DebitFromAccountService.debitFromAccount returns AccountDoesntExistError', async () => {
		const { sut, debitFromAccountService } = make_sut()

		const debitParams: DebitAccountControllerParams = {
			account_id: 'some-id',
			amount: 20.2
		}
		jest.spyOn(debitFromAccountService, 'debitFromAccount').mockReturnValue(Promise.resolve(new AccountHasNotSufficientMoneyError()))

		try {
			await sut.debitFromAccount(debitParams)
		} catch (error) {
			expect(error.name).toBe('BadRequestException')
		}
		
	})

	it('should return 400 if Service.debitFromAccount returns AccountHasNotSufficientMoney', async () => {
		const { sut, debitFromAccountService } = make_sut()

		const debitParams: DebitAccountControllerParams = {
			account_id: 'some-id',
			amount: 20.2
		}
		jest.spyOn(debitFromAccountService, 'debitFromAccount').mockReturnValue(Promise.resolve(new AccountHasNotSufficientMoneyError()))

		try {
			await sut.debitFromAccount(debitParams)
		} catch (error) {
			expect(error.name).toBe('BadRequestException')
		}
	})

	it('should return 200 Object if Service.debitFromAccount returns TransactionModel object', async () => {
		const { sut, debitFromAccountService } = make_sut()

		const debitParams: DebitAccountControllerParams = {
			account_id: 'some-id',
			amount: 20.2
		}
		jest.spyOn(debitFromAccountService, 'debitFromAccount')
		const result = await sut.debitFromAccount(debitParams)
		expect(result).toEqual(ok({...debitParams, id: 'some-id', type: 'debit'}))
	})
})
