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

describe('AccountExists usecase', () => {

	it('should call readAccountRepository.existsByCPF', async () => {
		const { sut, readAccountRepository } = make_sut()

		const cpf = 'some-cpf'

		jest.spyOn(readAccountRepository, 'exists')

		await sut.exists(cpf)

		expect(readAccountRepository.exists).toHaveBeenCalledTimes(1)
	})

	it('should call readAccountRepository.exists with proper argument', async () => {
		const { sut, readAccountRepository } = make_sut()

		const cpf = 'some-cpf'

		jest.spyOn(readAccountRepository, 'exists')

		await sut.exists(cpf)

		expect(readAccountRepository.exists).toHaveBeenCalledWith(cpf)
	})

	it('should return false if readAccountRepository.exists false',async () => {
		const { sut, readAccountRepository } = make_sut()

		const cpf = 'some-cpf'

		jest.spyOn(readAccountRepository, 'exists').mockReturnValue(Promise.resolve(false))

		const result = await sut.exists(cpf)

		expect(result).toBe(false)

	})

	it('should return true if readAccountRepository.exists returns true', async () => {
		const { sut, readAccountRepository } = make_sut()

		const cpf = 'some-cpf'

		jest.spyOn(readAccountRepository, 'exists')

		const result = await sut.exists(cpf)

		expect(result).toBe(true)
	})
})
