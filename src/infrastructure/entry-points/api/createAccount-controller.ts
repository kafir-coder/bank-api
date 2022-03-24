import { ACCOUNT_EXISTS_BY_CPF_SERVICE, IAccountExistsByCpfService } from '@/domain/use-cases/accountExistsByCpf-service'
import { CREATE_ACCOUNT_SERVICE, ICreateAccountService } from '@/domain/use-cases/createAccount-service'
import {Mapping, HttpCode, Post, Body, Adapter, BadRequestException} from '@tsclean/core'
import { badRequest, HttpResponse, ok } from './helpers/http-helpers'

@Mapping('api/v1/account')
export class CreateAccountController {

	constructor(
        @Adapter(ACCOUNT_EXISTS_BY_CPF_SERVICE) private readonly accountExistsByCpfService: IAccountExistsByCpfService,
        @Adapter(CREATE_ACCOUNT_SERVICE) private readonly createAccountService: ICreateAccountService
	) {}
    
    // Example function
    @Post()
    @HttpCode(201)
	async createAccount(@Body() data: CreateAccountRequest): Promise<HttpResponse> {

		const exists = await this.accountExistsByCpfService.existsByCpf(data.cpf)

		if (exists instanceof Error) throw new BadRequestException(badRequest(exists))
		return ok(12)
	}
}

export type CreateAccountRequest = {
    owner_name: string
    cpf: string
    initial_amount: number
}
