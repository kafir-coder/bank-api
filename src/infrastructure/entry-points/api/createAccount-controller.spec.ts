import { IAccountExistsByCpfService } from '@/domain/use-cases/accountExistsByCpf-service'
import { ICreateAccountService } from '@/domain/use-cases/createAccount-service'
import { CreateAccountController, CreateAccountRequest } from './createAccount-controller'
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

		jest.spyOn(accountExistsByCpf, 'existsByCpf')

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

		jest.spyOn(accountExistsByCpf, 'existsByCpf')

		await sut.createAccount(accountParams)

		expect(accountExistsByCpf.existsByCpf).toHaveBeenCalledWith(accountParams.cpf)
	})
})
