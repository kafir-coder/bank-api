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
  
	it('should call readAccountRepository.existsByCPF', async () => {
		const { sut, readAccountRepository } = make_sut()

		const cpf = 'some-cpf'

		jest.spyOn(readAccountRepository, 'existsByCPF')

		await sut.existsByCpf(cpf)

		expect(readAccountRepository.existsByCPF).toHaveBeenCalledTimes(1)
	})

	it('should call readAccountRepository.existsByCPF with proper argument', async () => {
		const { sut, readAccountRepository } = make_sut()

		const cpf = 'some-cpf'

		jest.spyOn(readAccountRepository, 'existsByCPF')

		await sut.existsByCpf(cpf)

		expect(readAccountRepository.existsByCPF).toHaveBeenCalledWith(cpf)
	})

	it('should return false if readAccountRepository.existsByCPF false',async () => {
		const { sut, readAccountRepository } = make_sut()

		const cpf = 'some-cpf'

		jest.spyOn(readAccountRepository, 'existsByCPF').mockReturnValue(Promise.resolve(false))

		const result = await sut.existsByCpf(cpf)

		expect(result).toBe(false)

	})

	it('should return true if readAccountRepository.existsByCPF returns true', async () => {
		const { sut, readAccountRepository } = make_sut()

		const cpf = 'some-cpf'

		jest.spyOn(readAccountRepository, 'existsByCPF')

		const result = await sut.existsByCpf(cpf)

		expect(result).toBe(true)
	})
})
