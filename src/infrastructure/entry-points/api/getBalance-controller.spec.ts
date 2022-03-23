import { AccountDoesntExistsError } from '@/domain/errors'
import { IGetBalanceService } from '@/domain/use-cases/getBalance-service'
import { GetBalanceController } from './getBalance-controller'
import { ok } from './helpers/http-helpers'

class GetBalanceServiceMock implements IGetBalanceService {
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	async getBalance(_account_id: string): Promise<number | Error> {
		return 20
	}
}

type SutTypes = {
  sut: GetBalanceController,
  getBalanceService: IGetBalanceService
}
const make_sut = (): SutTypes => {

	const getBalanceService = new GetBalanceServiceMock()

	const sut = new GetBalanceController(getBalanceService)

	return { 
		sut,
		getBalanceService
	}
}

describe('GetBalance controller', () => {
  

	it('should call GetBalanceService.getBalance', async () => {

		const { sut, getBalanceService } = make_sut()
		const account_id = 'some-id'

		jest.spyOn(getBalanceService, 'getBalance')

		await sut.getBalance({account_id})

		expect(getBalanceService.getBalance).toHaveBeenCalledTimes(1)
	})

	it('should call GetBalanceService.getBalance with proper argument', async () => {

		const { sut, getBalanceService } = make_sut()
		const account_id = 'some-id'

		jest.spyOn(getBalanceService, 'getBalance')

		await sut.getBalance({account_id})

		expect(getBalanceService.getBalance).toHaveBeenCalledWith(account_id)
	})

	it('should retun 400 if GetBalanceService.getBalance returns AccountDoesntExistsError', async () => {
		const { sut, getBalanceService } = make_sut()
		const account_id = 'some-id'

		jest.spyOn(getBalanceService, 'getBalance').mockReturnValue(Promise.resolve(new AccountDoesntExistsError()))

		try {
			await sut.getBalance({account_id})
		} catch (error) {
			expect(error.name).toBe('BadRequestException')
		}

	})

	it('should return 200 if GetBalanceService.getBalance returns number', async () => {
		const { sut, getBalanceService } = make_sut()
		const account_id = 'some-id'

		jest.spyOn(getBalanceService, 'getBalance')

		
		const result = await sut.getBalance({account_id})
		
		expect(result).toEqual(ok({balance: 20}))
	})
})
