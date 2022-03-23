import { CREDIT_TO_ACCOUNT_SERVICE, ICreditToAccountService } from '@/domain/use-cases/creditToAccount-service'
import {Adapter, BadRequestException, Body, HttpCode, Mapping, Post} from '@tsclean/core'
import { badRequest, HttpResponse, ok } from './helpers/http-helpers'

@Mapping('/api/v1/credit')
export class CreditAccountController {
	constructor(
        @Adapter(CREDIT_TO_ACCOUNT_SERVICE) private readonly creditToAccountService: ICreditToAccountService
	) {}

	@Post()
	@HttpCode(200)
	async creditToAccount(@Body() data: CreditAccountControllerParams) : Promise<HttpResponse> {
		const result = await this.creditToAccountService.creditToAccount({...data, type: 'credit'})

		const errors = ['AccountDoesntExistsError']
		if (result instanceof Error) {
			if (errors.includes(result.name)) throw new BadRequestException(badRequest(result))
		}
		return ok(result)
	}
}

export type CreditAccountControllerParams = {
	account_id: string
	amount: number
}
