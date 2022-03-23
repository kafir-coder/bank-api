import { GET_BALANCE_SERVICE, IGetBalanceService } from '@/domain/use-cases/getBalance-service'
import {Mapping, Get, HttpCode, Adapter, Query, BadRequestException} from '@tsclean/core'
import { badRequest, HttpResponse, ok } from './helpers/http-helpers'

@Mapping('api/v1/getBalance')
export class GetBalanceController {

	constructor(
        @Adapter(GET_BALANCE_SERVICE) private readonly getBalanceService: IGetBalanceService
	) {}
    
    // Example function
    @Get()
    @HttpCode(200)
	async getBalance(@Query() query: GetBalanceControllerParams): Promise<HttpResponse> {
		const result = await this.getBalanceService.getBalance(query.account_id)
		
		const errors = ['AccountDoesntExistsError']
		if (result instanceof Error) {
			if (errors.includes(result.name)) throw new BadRequestException(badRequest(result))
		}
		return ok({balance: result})
	}
}


export type GetBalanceControllerParams = {
	account_id: string
}

export type GetBalanceControllerResponse = {
	balance: number
}
