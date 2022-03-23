import { AddTransactionParams, TransactionModel } from '@/domain/models/transaction'
import { ICreditToAccountService } from '@/domain/use-cases/creditToAccount-service'
import { CreditAccountController, CreditAccountControllerParams } from './creditAccount-controller'

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
})
