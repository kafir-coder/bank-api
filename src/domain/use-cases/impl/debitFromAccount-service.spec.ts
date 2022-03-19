import { IAddTransactionRepository } from '../../models/contracts/addTransaction-repository'
import { IGetAccountRepository } from '../../models/contracts/getAccount-repository'
import { AddTransactionParams } from '../../models/transaction'
import { IDebitFromAccountService } from '../debitFromAccount-service'
import { DebitFromAccountServiceImpl } from './debitFromAccount-service-impl'
import { GetAccountRepositoryMock } from './mocks/createAccount-service'
import { AddTransactionRepositoryMock } from './mocks/debitFromAccount-service'


type SutTypes = {
	sut: IDebitFromAccountService
	getAccountRepository: IGetAccountRepository
	addTransactionRepository: IAddTransactionRepository
}
const make_sut = (): SutTypes => {
	const getAccountRepository = new GetAccountRepositoryMock()
	const addTransactionRepository = new AddTransactionRepositoryMock()

	const sut = new DebitFromAccountServiceImpl(
		getAccountRepository,
		addTransactionRepository
	)

	return {
		sut, getAccountRepository, addTransactionRepository
	}
}  
describe('DebitFromAccount usecase', () => {
	
	it('should call AccountRepository.exists',async () => {
		const data: AddTransactionParams = {
			account_id: 'some-id',
			value: 20.4, 
			type: 'debit'
		}
		const { sut, getAccountRepository } = make_sut() 

		jest.spyOn(getAccountRepository, 'exists')

		await sut.debitFromAccount(data)
		expect(getAccountRepository.exists).toHaveBeenCalledTimes(1)
	})

	it('should call AccountRepository.exists with proper argument',async () => {
		const data: AddTransactionParams = {
			account_id: 'some-id',
			value: 20.4, 
			type: 'debit'
		}
		const { sut, getAccountRepository } = make_sut() 

		jest.spyOn(getAccountRepository, 'exists')

		await sut.debitFromAccount(data)
		expect(getAccountRepository.exists).toHaveBeenCalledWith(data.account_id)
	})
	
})
