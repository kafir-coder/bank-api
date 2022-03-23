import { IDebitFromAccountService } from '@/domain/use-cases/debitFromAccount-service'
import { IGetBalanceService } from '@/domain/use-cases/getBalance-service'
import { GetBalanceController } from './getBalance-controller'

class GetBalanceServiceMock implements IGetBalanceService {
	async getBalance(account_id: string): Promise<number> {
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
  
})
