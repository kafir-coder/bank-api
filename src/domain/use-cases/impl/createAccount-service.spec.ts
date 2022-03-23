import { AccountModel, AddAccountParams } from '@/domain/models/account'
import { IWriteAccountRepository } from '@/domain/models/contracts/writeAccount-repository'
import { IReadAccountRepository } from '@/domain/models/contracts/readAccount-repository'
import { ICreateAccountService } from '../createAccount-service'
import { CreateAccountServiceImpl } from './createAccount-service-impl'
import { WriteAccountRepositoryMock, ReadAccountRepositoryMock } from './mocks/createAccount-service'
import { AccountAlreadyExistsError } from '@/domain/errors/account-already-exists-error'


type SutTypes = {
	sut: ICreateAccountService
	writeAccountRepository: IWriteAccountRepository
	readAccountRepository: IReadAccountRepository
}
const make_sut = (): SutTypes => {

	const writeAccountRepository = new WriteAccountRepositoryMock()
	const readAccountRepository = new ReadAccountRepositoryMock()

	const sut = new CreateAccountServiceImpl(
		writeAccountRepository, 
		readAccountRepository
	)

	return {
		sut,
		writeAccountRepository,
		readAccountRepository
	}
}

const make_account = (data: AddAccountParams): AccountModel => Object.assign({id: 'some_id'}, data)
describe('CreateAccount Service', () => {
  
	it('should call readAccountRepository.existsByCPF', async () => {

		const data: AddAccountParams = {
			owner_name: 'Caio Tony',
			cpf: '1234567890', 
			balance: 123.5
		}
		const { sut, readAccountRepository } = make_sut() 

		jest.spyOn(readAccountRepository, 'existsByCPF')

		await sut.createAccountService(data)
		expect(readAccountRepository.existsByCPF).toHaveBeenCalledTimes(1)
	})

	it('should call readAccountRepository.existsByCPF with proper argument', async () => {
		
		const data: AddAccountParams = {
			owner_name: 'Caio Tony',
			cpf: '1234567890', 
			balance: 123.5
		}
		const { sut, readAccountRepository } = make_sut() 

		jest.spyOn(readAccountRepository, 'existsByCPF')

		await sut.createAccountService(data)
		expect(readAccountRepository.existsByCPF).toHaveBeenCalledWith(data.cpf)
	})

	it('should return AccountAlreadyExistsError error if readAccountRepository.existsByCPF returns true', async () => {
		const data: AddAccountParams = {
			owner_name: 'Caio Tony',
			cpf: '1234567890', 
			balance: 123.5
		}
		const { sut } = make_sut() 
		
		const result = await sut.createAccountService(data)

		expect(result).toEqual(new AccountAlreadyExistsError())
	})

	it('should call writeAccountRepository.create', async () => {
		const data: AddAccountParams = {
			owner_name: 'Caio Tony',
			cpf: '1234567890', 
			balance: 123.5
		}
		const { sut, writeAccountRepository, readAccountRepository } = make_sut() 

		jest.spyOn(readAccountRepository, 'existsByCPF').mockReturnValue(Promise.resolve(false))
		jest.spyOn(writeAccountRepository, 'create')

		await sut.createAccountService(data)
		expect(writeAccountRepository.create).toHaveBeenCalledTimes(1)
	})

	it('should call writeAccountRepository.create with proper argument', async () => {
		
		const data: AddAccountParams = {
			owner_name: 'Caio Tony',
			cpf: '1234567890', 
			balance: 123.5
		}
		const { sut, writeAccountRepository, readAccountRepository} = make_sut() 

		jest.spyOn(readAccountRepository, 'existsByCPF').mockReturnValue(Promise.resolve(false))
		jest.spyOn(writeAccountRepository, 'create')

		await sut.createAccountService(data)
		expect(writeAccountRepository.create).toHaveBeenCalledWith(data)
	})

	it('should return what writeAccountRepository.create does returns',async () => {
		const data: AddAccountParams = {
			owner_name: 'Caio Tony',
			cpf: '1234567890', 
			balance: 123.5
		}

		const account = make_account(data)
		const { sut, writeAccountRepository, readAccountRepository } = make_sut() 
		
		jest.spyOn(readAccountRepository, 'existsByCPF').mockReturnValue(Promise.resolve(false))
		// eslint-disable-next-line @typescript-eslint/ban-ts-comment
		//@ts-ignore
		jest.spyOn(writeAccountRepository, 'create').mockReturnValue(Promise.resolve(account))
		const result = await sut.createAccountService(data)

		expect(result).toEqual(account)
	})

	it('should return an AccountModel object', async () => {
		const data: AddAccountParams = {
			owner_name: 'Caio Tony',
			cpf: '1234567890', 
			balance: 123.5
		}
	
		const account = make_account(data)
		const { sut, readAccountRepository } = make_sut() 
		
		jest.spyOn(readAccountRepository, 'existsByCPF').mockReturnValue(Promise.resolve(false))
		
		const result = await sut.createAccountService(data)
	
		expect(result).toEqual(account)
	})

})
