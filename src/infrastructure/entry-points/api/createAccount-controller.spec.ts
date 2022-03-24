import { IAccountExistsByCpfService } from '@/domain/use-cases/accountExistsByCpf-service'
import { ICreateAccountService } from '@/domain/use-cases/createAccount-service'
import { CreateAccountController, CreateAccountRequest } from './createAccount-controller'
import { ok } from './helpers/http-helpers'
import { AccountExistsByCpfServiceMock, CreateAccountServiceMock } from './mocks'

type SutTypes = {
  sut: CreateAccountController,
  createAccountService: ICreateAccountService,  
  accountExistsByCpf: IAccountExistsByCpfService
}
const make_sut = (): SutTypes => {

	const createAccountService = new CreateAccountServiceMock()
	const accountExistsByCpf = new AccountExistsByCpfServiceMock()

	const sut = new CreateAccountController(accountExistsByCpf, createAccountService)

	return {
		sut,
		accountExistsByCpf,
		createAccountService
	}
}


describe('createAccount controller', () => {

	it('should call accountExistsByCpfService.existsByCpf', async () => {
		const { sut, accountExistsByCpf } = make_sut()

		const accountParams: CreateAccountRequest = {
			owner_name: 'Caio Tony',
			cpf: 'some-cpf',
			initial_amount: 300
		}

		jest.spyOn(accountExistsByCpf, 'existsByCpf').mockReturnValue(Promise.resolve(false))

		await sut.createAccount(accountParams)

		expect(accountExistsByCpf.existsByCpf).toHaveBeenCalledTimes(1)
	})

	it('should call accountExistsByCpfService.existsByCpf with proper argument', async () => {
		const { sut, accountExistsByCpf } = make_sut()

		const accountParams: CreateAccountRequest = {
			owner_name: 'Caio Tony',
			cpf: 'some-cpf',
			initial_amount: 300
		}

		jest.spyOn(accountExistsByCpf, 'existsByCpf').mockReturnValue(Promise.resolve(false))

		await sut.createAccount(accountParams)

		expect(accountExistsByCpf.existsByCpf).toHaveBeenCalledWith(accountParams.cpf)
	})

	it('should return 400 if accountExistsByCpfService.existsByCpf returns false', async () => {
		const { sut, accountExistsByCpf} = make_sut()

		const accountParams: CreateAccountRequest = {
			owner_name: 'Caio Tony',
			cpf: 'some-cpf',
			initial_amount: 300
		}

		jest.spyOn(accountExistsByCpf, 'existsByCpf')
			.mockReturnValue(Promise.resolve(false))


		try {
			await sut.createAccount(accountParams)
		} catch (error) {
			expect(error.name).toBe('BadRequestException')
		}
	})

	it('should call createAccountService.create', async () => {
		const { sut, createAccountService, accountExistsByCpf } = make_sut()
		
		const accountParams: CreateAccountRequest = {
			owner_name: 'Caio Tony',
			cpf: 'some-cpf',
			initial_amount: 300
		}

		jest.spyOn(accountExistsByCpf, 'existsByCpf').mockReturnValue(Promise.resolve(false))
		jest.spyOn(createAccountService, 'createAccountService')

		await sut.createAccount(accountParams)

		expect(createAccountService.createAccountService).toHaveBeenCalledTimes(1)
	})

	it('should call createAccountService.create with proper argument', async () => {
		const { sut, createAccountService, accountExistsByCpf } = make_sut()
		
		const accountParams: CreateAccountRequest = {
			owner_name: 'Caio Tony',
			cpf: 'some-cpf',
			initial_amount: 300
		}

		jest.spyOn(accountExistsByCpf, 'existsByCpf').mockReturnValue(Promise.resolve(false))
		jest.spyOn(createAccountService, 'createAccountService')

		await sut.createAccount(accountParams)

		expect(createAccountService.createAccountService).toHaveBeenCalledWith({
			balance: accountParams.initial_amount,
			cpf: accountParams.cpf,
			owner_name: accountParams.owner_name
		})
	})

	it('should return ok', async () => {
		const { sut, accountExistsByCpf } = make_sut()
		
		const accountParams: CreateAccountRequest = {
			owner_name: 'Caio Tony',
			cpf: 'some-cpf',
			initial_amount: 300
		}

		jest.spyOn(accountExistsByCpf, 'existsByCpf').mockReturnValue(Promise.resolve(false))

		const result = await sut.createAccount(accountParams)

		expect(result).toEqual(ok({
			owner_name: accountParams.owner_name,
			cpf: accountParams.cpf,
			balance: accountParams.initial_amount,
			id: 'some-id'
		}))
		
	})
})
