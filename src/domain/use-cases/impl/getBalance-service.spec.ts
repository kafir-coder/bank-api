import { IReadAccountRepository } from '../../models/contracts/readAccount-repository'
import { IGetBalanceService } from '../getBalance-service'
import { GetBalanceServiceImpl } from './getBalance-service-impl'
import { ReadAccountRepositoryMock } from './mocks/createAccount-service'

type SutTypes = {
  sut: IGetBalanceService
  readAccountRepository: IReadAccountRepository
}
const make_sut = (): SutTypes => {
	const readAccountRepository = new ReadAccountRepositoryMock()
	
	const sut = new GetBalanceServiceImpl(readAccountRepository)

	return { 
		sut, 
		readAccountRepository
	}
}


describe('getBalance usecase', () => {
  
})
