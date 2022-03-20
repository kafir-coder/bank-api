import { IWriteAccountRepository } from '../../models/contracts/writeAccount-repository'
import { IReadAccountRepository } from '../../models/contracts/readAccount-repository'
import { IWriteTransactionRepository } from '../../models/contracts/writeTransaction-repository'
import { AddTransactionParams } from '../../models/transaction'
import { ICreditToAccountService } from '../creditToAccount-service'
import { CreditToAccountServiceImpl } from './creditToAccount-service-impl'
import { ReadAccountRepositoryMock, WriteAccountRepositoryMock } from './mocks/createAccount-service'
import { WriteTransactionRepositoryMock } from './mocks/debitFromAccount-service'

type SutTypes = {
  sut: ICreditToAccountService
  readAccountRepository: IReadAccountRepository
	writeAccountRepository: IWriteAccountRepository
  writeTransactionRepository: IWriteTransactionRepository
}
const make_sut = (): SutTypes => {
	const readAccountRepository = new ReadAccountRepositoryMock()
	const writeTransactionRepository = new WriteTransactionRepositoryMock()
	const writeAccountRepository = new WriteAccountRepositoryMock()
	const sut = new CreditToAccountServiceImpl(
		readAccountRepository,
		writeTransactionRepository,
		writeAccountRepository
	)

	return { 
		sut, 
		readAccountRepository, 
		writeAccountRepository,
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

	it('should call WriteTransactionRepository.add', async () => {
		const data: AddTransactionParams = {
			account_id: 'some-id',
			amount: 20.4, 
			type: 'debit'
		}
		const { sut, writeTransactionRepository } = make_sut()

		jest.spyOn(writeTransactionRepository, 'add')
		await sut.creditToAccount(data)

		expect(writeTransactionRepository.add).toHaveBeenCalledTimes(1)

	})

	it('should call WriteTransactionRepository.add with proper argument', async () => {
		const data: AddTransactionParams = {
			account_id: 'some-id',
			amount: 20.4, 
			type: 'credit'
		}
		const { sut, writeTransactionRepository } = make_sut()

		jest.spyOn(writeTransactionRepository, 'add')
		await sut.creditToAccount(data)

		expect(writeTransactionRepository.add).toHaveBeenCalledWith(data)
	})

	it('should return what TransactionRepository.add returns', async () => {
		const data: AddTransactionParams = {
			account_id: 'some-id',
			amount: 20.4, 
			type: 'credit'
		}
		const { sut, writeTransactionRepository } = make_sut()

		const transaction = {...data, id: 'another-id'}
		jest.spyOn(writeTransactionRepository, 'add').mockReturnValue(Promise.resolve(transaction))
		const result = await sut.creditToAccount(data)

		expect(result).toEqual(transaction)
	})

	it('should return a TransactionModel object', async () => {
		const data: AddTransactionParams = {
			account_id: 'some-id',
			amount: 20.4, 
			type: 'credit'
		}
		const { sut, writeTransactionRepository } = make_sut()

		const transaction = {...data, id: 'another-id'}
		jest.spyOn(writeTransactionRepository, 'add').mockReturnValue(Promise.resolve(transaction))
		const result = await sut.creditToAccount(data)

		expect(result).toStrictEqual(transaction)
	})

	it('should call AccountRepository.getBalance', async () => {
		const data: AddTransactionParams = {
			account_id: 'some-id',
			amount: 20.4, 
			type: 'debit'
		}
		const { sut, readAccountRepository } = make_sut() 

		jest.spyOn(readAccountRepository, 'getBalance')

		await sut.creditToAccount(data)
		expect(readAccountRepository.getBalance).toHaveBeenCalledTimes(1)
	})

	it('should call AccountRepository.getBalance with proper argument', async () => {
		const data: AddTransactionParams = {
			account_id: 'some-id',
			amount: 20.4, 
			type: 'debit'
		}
		const { sut, readAccountRepository } = make_sut() 

		jest.spyOn(readAccountRepository, 'getBalance')

		await sut.creditToAccount(data)
		expect(readAccountRepository.getBalance).toHaveBeenCalledWith(data.account_id)
	})	

	it('should call AccountRepository.update', async () => {
		const data: AddTransactionParams = {
			account_id: 'some-id',
			amount: 20.4, 
			type: 'debit'
		}
		const { sut, writeAccountRepository } = make_sut() 

		// returns a amount less than data.amount
		jest.spyOn(writeAccountRepository, 'update')

		await sut.creditToAccount(data)

		expect(writeAccountRepository.update).toHaveBeenCalledTimes(1)
	})
})
