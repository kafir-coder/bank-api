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
describe('CreateAccount Service', () => {
  
	afterEach(() => {
		jest.clearAllMocks()
	})
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

	it('should return null if GetAccountRepository.existsByCPF returns true', async () => {
		const data: AddAccountParams = {
			owner_name: 'Caio Tony',
			cpf: '1234567890', 
			balance: 123.5
		}
		const { sut } = make_sut() 
		
		const result = await sut.createAccountService(data)

		expect(result).toBe(null)
	})
	

	it('should call CreateAccountRepository.create', async () => {
		const data: AddAccountParams = {
			owner_name: 'Caio Tony',
			cpf: '1234567890', 
			balance: 123.5
		}
		const { sut, createAccountRepository, getAccountRepository } = make_sut() 

		jest.spyOn(getAccountRepository, 'existsByCPF').mockReturnValue(Promise.resolve(false))
		jest.spyOn(createAccountRepository, 'create')

		await sut.createAccountService(data)
		expect(createAccountRepository.create).toHaveBeenCalledTimes(1)
	})

	it('should call CreateAccountRepository.create with proper argument', async () => {
		
		const data: AddAccountParams = {
			owner_name: 'Caio Tony',
			cpf: '1234567890', 
			balance: 123.5
		}
		const { sut, createAccountRepository, getAccountRepository} = make_sut() 

		jest.spyOn(getAccountRepository, 'existsByCPF').mockReturnValue(Promise.resolve(false))
		jest.spyOn(createAccountRepository, 'create')

		await sut.createAccountService(data)
		expect(createAccountRepository.create).toHaveBeenCalledWith(data)
	})

	it('should return what CreateAccountRepository.create does returns',async () => {
		const data: AddAccountParams = {
			owner_name: 'Caio Tony',
			cpf: '1234567890', 
			balance: 123.5
		}

		const account = Object.assign({id: 'some-id'}, data)
		const { sut, createAccountRepository, getAccountRepository } = make_sut() 
		
		jest.spyOn(getAccountRepository, 'existsByCPF').mockReturnValue(Promise.resolve(false))
		// eslint-disable-next-line @typescript-eslint/ban-ts-comment
		//@ts-ignore
		jest.spyOn(createAccountRepository, 'create').mockReturnValue(Promise.resolve(account))
		const result = await sut.createAccountService(data)

		expect(result).toEqual(account)
	})

})
