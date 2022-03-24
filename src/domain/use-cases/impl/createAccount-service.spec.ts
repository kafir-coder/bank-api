import { AccountModel, AddAccountParams } from '@/domain/models/account'
import { IWriteAccountRepository } from '@/domain/models/contracts/writeAccount-repository'
import { ICreateAccountService } from '../createAccount-service'
import { CreateAccountServiceImpl } from './createAccount-service-impl'
import { WriteAccountRepositoryMock } from './mocks/createAccount-service'


type SutTypes = {
	sut: ICreateAccountService
	writeAccountRepository: IWriteAccountRepository
}
const make_sut = (): SutTypes => {

	const writeAccountRepository = new WriteAccountRepositoryMock()

	const sut = new CreateAccountServiceImpl(
		writeAccountRepository
	)

	return {
		sut,
		writeAccountRepository
	}
}

const make_account = (data: AddAccountParams): AccountModel => Object.assign({id: 'some_id'}, data)
describe('CreateAccount Service', () => {
	it('should call writeAccountRepository.create', async () => {
		const data: AddAccountParams = {
			owner_name: 'Caio Tony',
			cpf: '1234567890', 
			balance: 123.5
		}
		const { sut, writeAccountRepository } = make_sut() 

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
		const { sut, writeAccountRepository} = make_sut() 

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
		const { sut, writeAccountRepository } = make_sut() 
		
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
		const { sut } = make_sut() 
		const result = await sut.createAccountService(data)
	
		expect(result).toEqual(account)
	})

})
