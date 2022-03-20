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
  
	it('should call AccountRepository.getBalance', async () => {
		const {sut, readAccountRepository} = make_sut()

		jest.spyOn(readAccountRepository, 'getBalance')

		await sut.getBalance('some-id')

		expect(readAccountRepository.getBalance).toHaveBeenCalledTimes(1)
	})

	it('should call AccountRepository.getBalance with proper argument', async () => {
		const {sut, readAccountRepository} = make_sut()

		const account_id = 'some-id'
		jest.spyOn(readAccountRepository, 'getBalance')

		await sut.getBalance(account_id)

		expect(readAccountRepository.getBalance).toHaveBeenCalledWith(account_id)
	})

	it('should return null if the readAccountRepository.getBalance returns null', async () => {
		const {sut, readAccountRepository} = make_sut()

		const account_id = 'some-id'
		jest.spyOn(readAccountRepository, 'getBalance').mockReturnValue(Promise.resolve(null))

		const result = await sut.getBalance(account_id)

		expect(result).toBe(null)
	})
})
