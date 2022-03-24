import { AccountDoesntExistsError } from '@/domain/errors'
import { ACCOUNT_EXISTS_SERVICE, IAccountExistsService } from '@/domain/use-cases/accountExists-service'
import { CREDIT_TO_ACCOUNT_SERVICE, ICreditToAccountService } from '@/domain/use-cases/creditToAccount-service'
import {Adapter, BadRequestException, Body, HttpCode, Mapping, Post} from '@tsclean/core'
import { badRequest, HttpResponse, ok } from './helpers/http-helpers'

@Mapping('/api/v1/credit')
export class CreditAccountController {
	constructor(
				@Adapter(ACCOUNT_EXISTS_SERVICE) private readonly accountExistsService: IAccountExistsService,
        @Adapter(CREDIT_TO_ACCOUNT_SERVICE) private readonly creditToAccountService: ICreditToAccountService
	) {}

	@Post()
	@HttpCode(200)
	async creditToAccount(@Body() data: CreditAccountControllerParams) : Promise<HttpResponse> {
		const exists = await this.accountExistsService.exists(data.account_id)
		if (!exists) throw new BadRequestException(badRequest(new AccountDoesntExistsError()))
		const result = await this.creditToAccountService.creditToAccount({...data, type: 'credit'})
		return ok(result)
	}
}

export type CreditAccountControllerParams = {
	account_id: string
	amount: number
}
