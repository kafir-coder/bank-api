import { IAccountExistsByCpfService } from '@/domain/use-cases/accountExistsByCpf-service'
import { ICreateAccountService } from '@/domain/use-cases/createAccount-service'
import { CreateAccountController } from './createAccount-controller'
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


describe('createAccount controller', () => {})
