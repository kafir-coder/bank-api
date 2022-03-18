import { AddAccountParams } from 'src/domain/models/account'
import { ICreateAccountRepository } from 'src/domain/models/contracts/createAccount-repository'
import { IGetAccountRepository } from 'src/domain/models/contracts/getAccount-repository'
import { ICreateAccountService } from '../createAccount-service'
import { CreateAccountServiceImpl } from './createAccount-service-impl'
import { CreateAccountRepositoryMock, GetAccountRepositoryMock } from './mocks/createAccount-service'


type SutTypes = {
	sut: ICreateAccountService
	createAccountRepository: ICreateAccountRepository
	getAccountRepository: IGetAccountRepository
}
const make_sut = (): SutTypes => {

	const createAccountRepository = new CreateAccountRepositoryMock()
	const getAccountRepository = new GetAccountRepositoryMock()

	const sut = new CreateAccountServiceImpl(
		createAccountRepository, 
		getAccountRepository
	)

	return {
		sut,
		createAccountRepository,
		getAccountRepository
	}
}
describe('', () => {
  
	it('should call GetAccountRepository.existsByCPF', async () => {

		const data: AddAccountParams = {
			owner_name: 'Caio Tony',
			cpf: '1234567890', 
			balance: 123.5
		}
		const { sut, getAccountRepository } = make_sut() 

		jest.spyOn(getAccountRepository, 'existsByCPF')

		await sut.createAccountService(data)
		expect(getAccountRepository.existsByCPF).toHaveBeenCalledTimes(1)
	})

	it('should call GetAccountRepository.existsByCPF with proper argument', async () => {
		
		const data: AddAccountParams = {
			owner_name: 'Caio Tony',
			cpf: '1234567890', 
			balance: 123.5
		}
		const { sut, getAccountRepository } = make_sut() 

		jest.spyOn(getAccountRepository, 'existsByCPF')

		await sut.createAccountService(data)
		expect(getAccountRepository.existsByCPF).toHaveBeenCalledWith(data.cpf)
	})
})
