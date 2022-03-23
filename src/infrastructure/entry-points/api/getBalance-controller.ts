import { GET_BALANCE_SERVICE, IGetBalanceService } from '@/domain/use-cases/getBalance-service'
import {Mapping, Get, HttpCode, Adapter, Query, BadRequestException} from '@tsclean/core'
import { badRequest } from './helpers/http-helpers'

@Mapping('api/v1/getBalance')
export class GetBalanceController {

	constructor(
        @Adapter(GET_BALANCE_SERVICE) private readonly getBalanceService: IGetBalanceService
	) {}
    
    // Example function
    @Get()
    @HttpCode(200)
	async getBalance(@Query() query: GetBalanceControllerParams): Promise<GetBalanceControllerResponse> {
		const result = await this.getBalanceService.getBalance(query.account_id)
		
		const errors = ['AccountDoesntExistsError']
		console.log(result)
		console.log(result instanceof Error)
		if (result instanceof Error) {
			console.log(result)
			if (errors.includes(result.name)) throw new BadRequestException(badRequest(result))
		}
		return {
			balance: 20
		}
	}
}


export type GetBalanceControllerParams = {
	account_id: string
}

export type GetBalanceControllerResponse = {
	balance: number
}
