import { IWriteTransactionRepository } from '../../models/contracts/writeTransaction-repository'
import { IReadAccountRepository } from '../../models/contracts/readAccount-repository'
import { AddTransactionParams } from '../../models/transaction'
import { IDebitFromAccountService } from '../debitFromAccount-service'
import { DebitFromAccountServiceImpl } from './debitFromAccount-service-impl'
import { ReadAccountRepositoryMock, WriteAccountRepositoryMock } from './mocks/createAccount-service'
import { WriteTransactionRepositoryMock } from './mocks/debitFromAccount-service'
import { IWriteAccountRepository } from '../../models/contracts/writeAccount-repository'


type SutTypes = {
	sut: IDebitFromAccountService
	readAccountRepository: IReadAccountRepository
	writeTransactionRepository: IWriteTransactionRepository,
	writeAccountRepository: IWriteAccountRepository
}
const make_sut = (): SutTypes => {
	const readAccountRepository = new ReadAccountRepositoryMock()
	const writeTransactionRepository = new WriteTransactionRepositoryMock()
	const writeAccountRepository = new WriteAccountRepositoryMock()
	const sut = new DebitFromAccountServiceImpl(
		readAccountRepository,
		writeTransactionRepository, 
		writeAccountRepository
	)

	return {
		sut, readAccountRepository, writeTransactionRepository, writeAccountRepository
	}
}  
describe('DebitFromAccount usecase', () => {
	
	it('should call AccountRepository.exists',async () => {
		const data: AddTransactionParams = {
			account_id: 'some-id',
			amount: 20.4, 
			type: 'debit'
		}
		const { sut, readAccountRepository } = make_sut() 

		jest.spyOn(readAccountRepository, 'exists')

		await sut.debitFromAccount(data)
		expect(readAccountRepository.exists).toHaveBeenCalledTimes(1)
	})

	it('should call AccountRepository.exists with proper argument',async () => {
		const data: AddTransactionParams = {
			account_id: 'some-id',
			amount: 20.4, 
			type: 'debit'
		}
		const { sut, readAccountRepository } = make_sut() 

		jest.spyOn(readAccountRepository, 'exists')

		await sut.debitFromAccount(data)
		expect(readAccountRepository.exists).toHaveBeenCalledWith(data.account_id)
	})

	it('should return null if AccountRepository.exists returns false', async () => {
		const data: AddTransactionParams = {
			account_id: 'some-id',
			amount: 20.4, 
			type: 'debit'
		}
		const { sut, readAccountRepository } = make_sut() 

		jest.spyOn(readAccountRepository, 'exists').mockReturnValue(Promise.resolve(false))

		const result = await sut.debitFromAccount(data)

		expect(result).toBe(null)
	})

	it('should call AccountRepository.getBalance', async () => {
		const data: AddTransactionParams = {
			account_id: 'some-id',
			amount: 20.4, 
			type: 'debit'
		}
		const { sut, readAccountRepository } = make_sut() 

		jest.spyOn(readAccountRepository, 'getBalance')

		await sut.debitFromAccount(data)
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

		await sut.debitFromAccount(data)
		expect(readAccountRepository.getBalance).toHaveBeenCalledWith(data.account_id)
	})

	it('should return null if difference between balance and amount to debit be negative', async () => {
		const data: AddTransactionParams = {
			account_id: 'some-id',
			amount: 20.4, 
			type: 'debit'
		}
		const { sut, readAccountRepository } = make_sut() 

		// returns a amount less than data.amount
		jest.spyOn(readAccountRepository, 'getBalance').mockReturnValue(Promise.resolve(10.4))

		const result = await sut.debitFromAccount(data)
		expect(result).toBe(null)
	})

	
	it('should call TransactionRepository.add', async () => {
		const data: AddTransactionParams = {
			account_id: 'some-id',
			amount: 20.4, 
			type: 'debit'
		}
		const { sut, writeTransactionRepository } = make_sut() 

		// returns a amount less than data.amount
		jest.spyOn(writeTransactionRepository, 'add')

		await sut.debitFromAccount(data)
		expect(writeTransactionRepository.add).toHaveBeenCalledTimes(1)
	})

	it('should call TransactionRepository.add with proper argument', async () => {
		const data: AddTransactionParams = {
			account_id: 'some-id',
			amount: 20.4, 
			type: 'debit'
		}
		const { sut, writeTransactionRepository } = make_sut() 

		// returns a amount less than data.amount
		jest.spyOn(writeTransactionRepository, 'add')

		await sut.debitFromAccount(data)
		expect(writeTransactionRepository.add).toHaveBeenCalledWith(data)
	})

	it('should return what TransactionRepository.add returns', async () => {

		const data: AddTransactionParams = {
			account_id: 'some-id',
			amount: 20.4, 
			type: 'debit'
		}
		const { sut, writeTransactionRepository } = make_sut() 

		const account = Object.assign({id: 'another-id'}, data)

		jest.spyOn(writeTransactionRepository, 'add').mockReturnValue(Promise.resolve(account))

		const result = await sut.debitFromAccount(data)
		expect(result).toEqual(account)
	})

	it('should return a TransactionModel object', async () => {
		const data: AddTransactionParams = {
			account_id: 'some-id',
			amount: 20.4, 
			type: 'debit'
		}
	
		const { sut } = make_sut() 
	
		const transaction = Object.assign({id: 'some-id'}, data)
		const result = await sut.debitFromAccount(data)
	
		expect(result).toStrictEqual(transaction)
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

		await sut.debitFromAccount(data)

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
		await sut.debitFromAccount(data)

		const difference = balance-data.amount
		expect(writeAccountRepository.update).toHaveBeenCalledWith({balance: difference})
	})
})
