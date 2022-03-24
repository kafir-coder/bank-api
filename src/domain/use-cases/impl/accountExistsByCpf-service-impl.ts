import {Adapter, Service} from '@tsclean/core'
import {IAccountExistsByCpfService} from '@/domain/use-cases/accountExistsByCpf-service'
import { IReadAccountRepository, READ_ACCOUNT_REPOSITORY } from '@/domain/models/contracts/readAccount-repository'

@Service()
export class AccountExistsByCpfServiceImpl implements IAccountExistsByCpfService {
	constructor(
        @Adapter(READ_ACCOUNT_REPOSITORY) private readonly readAccountRepository: IReadAccountRepository
	) {}
	async existsByCpf(cpf: string): Promise<boolean> {
		const exists = await this.readAccountRepository.existsByCPF(cpf)
		return exists
	}
}
