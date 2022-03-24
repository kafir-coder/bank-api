import { IReadAccountRepository } from '@/domain/models/contracts/readAccount-repository'
import { IAccountExistsService } from '../accountExists-service'
import { AccountExistsServiceImpl } from './accountExists-service-impl'
import { ReadAccountRepositoryMock } from './mocks/createAccount-service'

type SutTypes = {
  sut: IAccountExistsService,
  readAccountRepository: IReadAccountRepository
}
const make_sut = (): SutTypes => {

	const readAccountRepository = new ReadAccountRepositoryMock()
	const sut = new AccountExistsServiceImpl(readAccountRepository)

	return { sut, readAccountRepository}
}

describe('AccountExists usecase', () => {})
