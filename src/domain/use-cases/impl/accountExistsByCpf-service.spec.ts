import { IReadAccountRepository } from '@/domain/models/contracts/readAccount-repository'
import { IAccountExistsByCpfService } from '../accountExistsByCpf-service'
import { AccountExistsByCpfServiceImpl } from './accountExistsByCpf-service-impl'
import { ReadAccountRepositoryMock } from './mocks/createAccount-service'

type SutTypes = {
  sut: IAccountExistsByCpfService,
  readAccountRepository: IReadAccountRepository
}
const make_sut = (): SutTypes => {

	const readAccountRepository = new ReadAccountRepositoryMock()
	const sut = new AccountExistsByCpfServiceImpl(readAccountRepository)

	return {
		sut, readAccountRepository
	}
}


describe('AccountExistsByCpf usecase', () => {
  
})
