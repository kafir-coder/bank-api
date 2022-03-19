import { IReadAccountRepository } from 'src/domain/models/contracts/readAccount-repository'
import { IWriteTransactionRepository } from 'src/domain/models/contracts/writeTransaction-repository'
import { ICreditToAccountService } from '../creditToAccount-service'
import { CreditToAccountServiceImpl } from './creditToAccount-service-impl'
import { ReadAccountRepositoryMock } from './mocks/createAccount-service'
import { WriteTransactionRepositoryMock } from './mocks/debitFromAccount-service'

type SutTypes = {
  sut: ICreditToAccountService
  readAccountRepository: IReadAccountRepository
  writeTransactionRepository: IWriteTransactionRepository
}
const make_sut = (): SutTypes => {
	const readAccountRepository = new ReadAccountRepositoryMock()
	const writeTransactionRepository = new WriteTransactionRepositoryMock()

	const sut = new CreditToAccountServiceImpl(
		readAccountRepository,
		writeTransactionRepository
	)

	return { 
		sut, 
		readAccountRepository, 
		writeTransactionRepository
	}
}
