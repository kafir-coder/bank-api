import { AccountDoesntExistsError, AccountHasNotSufficientMoneyError } from '@/domain/errors'
import { AddTransactionParams, TransactionModel } from '@/domain/models/transaction'
import { IDebitFromAccountService } from '@/domain/use-cases/debitFromAccount-service'
import { BadRequestException } from '@tsclean/core'
import { DebitAccountController, DebitAccountControllerParams } from './debitAccount-controller'
import { badRequest } from './helpers/http-helpers'


class DebitFromAccountServiceMock implements IDebitFromAccountService {
	async debitFromAccount(data: AddTransactionParams): Promise<TransactionModel | Error> {
		return {...data, id: 'some-id'}
	}
}

type SutTypes = {
  sut: DebitAccountController,
  debitFromAccountService: IDebitFromAccountService
}
const make_sut = (): SutTypes => {

	const debitFromAccountService = new DebitFromAccountServiceMock()

	const sut = new DebitAccountController(debitFromAccountService)

	return { 
		sut,
		debitFromAccountService
	}
}

describe('DebitFromAccount Controller', () => {

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
		jest.spyOn(debitFromAccountService, 'debitFromAccount').mockReturnValue(Promise.resolve(new AccountDoesntExistsError()))
		const result = await sut.debitFromAccount(debitParams)

		expect(result).toEqual(new BadRequestException(result))
	})

	it('should return 400 if Service.debitFromAccount returns AccountHasNotSufficientMoney', async () => {
		const { sut, debitFromAccountService } = make_sut()

		const debitParams: DebitAccountControllerParams = {
			account_id: 'some-id',
			amount: 20.2
		}
		jest.spyOn(debitFromAccountService, 'debitFromAccount').mockReturnValue(Promise.resolve(new AccountHasNotSufficientMoneyError()))
		const result = await sut.debitFromAccount(debitParams)

		expect(result).toEqual(new BadRequestException(result))
	})
})
