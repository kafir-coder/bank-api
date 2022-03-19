import { IReadAccountRepository } from '../../models/contracts/readAccount-repository'
import { IWriteTransactionRepository } from '../../models/contracts/writeTransaction-repository'
import { AddTransactionParams } from '../../models/transaction'
import { ICreditToAccountService } from '../creditToAccount-service'
import { CreditToAccountServiceImpl } from './creditToAccount-service-impl'
import { ReadAccountRepositoryMock } from './mocks/createAccount-service'
import { WriteTransactionRepositoryMock } from './mocks/debitFromAccount-service'

type SutTypes = {
  sut: ICreditToAccountService
  readAccountRepository: IReadAccountRepository
  writeTransactionRepository: IWriteTransactionRepository
}
const make_sut = (): SutTypes => {
	const readAccountRepository = new ReadAccountRepositoryMock()
	const writeTransactionRepository = new WriteTransactionRepositoryMock()

	const sut = new CreditToAccountServiceImpl(
		readAccountRepository,
		writeTransactionRepository
	)

	return { 
		sut, 
		readAccountRepository, 
		writeTransactionRepository
	}
}


describe('CreditToAccount usecase', () => {

	it('should call readAccountRepository.exists', async () => {

		const data: AddTransactionParams = {
			account_id: 'some-id',
			amount: 20.4, 
			type: 'debit'
		}
		const { sut, readAccountRepository } = make_sut()

		jest.spyOn(readAccountRepository, 'exists')
		await sut.creditToAccount(data)

		expect(readAccountRepository.exists).toHaveBeenCalledTimes(1)
	})

	it('should call readAccountRepository.exists with proper argument', async () => {

		const data: AddTransactionParams = {
			account_id: 'some-id',
			amount: 20.4, 
			type: 'debit'
		}
		const { sut, readAccountRepository } = make_sut()

		jest.spyOn(readAccountRepository, 'exists')
		await sut.creditToAccount(data)

		expect(readAccountRepository.exists).toHaveBeenCalledWith(data.account_id)
	})

	it('should return null if readAccountRepository.exists returns false', async () => {
		const data: AddTransactionParams = {
			account_id: 'some-id',
			amount: 20.4, 
			type: 'debit'
		}
		const { sut, readAccountRepository } = make_sut()

		jest.spyOn(readAccountRepository, 'exists').mockReturnValue(Promise.resolve(false))
		const result = await sut.creditToAccount(data)

		expect(result).toBe(null)
	})
})
