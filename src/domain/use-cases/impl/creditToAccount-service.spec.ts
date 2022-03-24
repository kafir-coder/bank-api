import { IWriteAccountRepository } from '@/domain/models/contracts/writeAccount-repository'
import { IReadAccountRepository } from '@/domain/models/contracts/readAccount-repository'
import { IWriteTransactionRepository } from '@/domain/models/contracts/writeTransaction-repository'
import { AddTransactionParams } from '@/domain/models/transaction'
import { ICreditToAccountService } from '../creditToAccount-service'
import { CreditToAccountServiceImpl } from './creditToAccount-service-impl'
import { ReadAccountRepositoryMock, WriteAccountRepositoryMock } from './mocks/createAccount-service'
import { WriteTransactionRepositoryMock } from './mocks/debitFromAccount-service'
import { AccountDoesntExistsError } from '@/domain/errors/account-doesnt-exists-error'

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

	it('should call AccountRepository.update with proper arguments', async () => {
		const data: AddTransactionParams = {
			account_id: 'some-id',
			amount: 20.4, 
			type: 'debit'
		}
		const { sut, writeAccountRepository, readAccountRepository } = make_sut() 

		// returns a amount less than data.amount
		jest.spyOn(writeAccountRepository, 'update')

		const balance = await readAccountRepository.getBalance(data.account_id)
		await sut.creditToAccount(data)

		// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
		const sum = balance!+data.amount
		expect(writeAccountRepository.update).toHaveBeenCalledWith('some-id', {balance: sum})
	})
})
