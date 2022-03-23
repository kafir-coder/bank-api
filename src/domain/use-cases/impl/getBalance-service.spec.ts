import { AccountDoesntExistsError } from '@/domain/errors'
import { IReadAccountRepository } from '@/domain/models/contracts/readAccount-repository'
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

	it('should call AccountRepository.exists',async () => {
		const account_id = 'some-id'

		const { sut, readAccountRepository } = make_sut() 

		jest.spyOn(readAccountRepository, 'exists')

		await sut.getBalance(account_id)
		expect(readAccountRepository.exists).toHaveBeenCalledTimes(1)
	})

	it('should call AccountRepository.exists with proper argument',async () => {
		const account_id = 'some-id'

		const { sut, readAccountRepository } = make_sut() 

		jest.spyOn(readAccountRepository, 'exists')

		await sut.getBalance(account_id)
		expect(readAccountRepository.exists).toHaveBeenCalledWith(account_id)
	})

	it('should return AccountDoesntExistsError if AccountRepository.exists returns false', async () => {
		const {sut, readAccountRepository} = make_sut()

		const account_id = 'some-id'
		jest.spyOn(readAccountRepository, 'exists').mockReturnValue(Promise.resolve(false))
		
		await sut.getBalance(account_id)

		const result = await sut.getBalance(account_id)

		expect(result).toEqual(new AccountDoesntExistsError())
	})
	it('should call AccountRepository.getBalance with proper argument', async () => {
		const {sut, readAccountRepository} = make_sut()

		const account_id = 'some-id'
		jest.spyOn(readAccountRepository, 'getBalance')

		await sut.getBalance(account_id)

		expect(readAccountRepository.getBalance).toHaveBeenCalledWith(account_id)
	})

	it('should return a number if all is ok', async () => {
		const {sut, readAccountRepository} = make_sut()

		const account_id = 'some-id'
		jest.spyOn(readAccountRepository, 'getBalance')

		const result = await sut.getBalance(account_id)

		expect(typeof result).toBe('number')
	})
})
