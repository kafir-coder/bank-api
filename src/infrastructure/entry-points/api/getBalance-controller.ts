import { GET_BALANCE_SERVICE, IGetBalanceService } from '@/domain/use-cases/getBalance-service'
import {Mapping, Get, HttpCode, Adapter, Query} from '@tsclean/core'

@Mapping('api/v1/getBalance')
export class GetBalanceController {

	constructor(
        @Adapter(GET_BALANCE_SERVICE) private readonly getBalanceService: IGetBalanceService
	) {}
    
    // Example function
    @Get()
    @HttpCode(200)
	async getBalance(@Query() query: GetBalanceControllerParams): Promise<GetBalanceControllerResponse> {
		this.getBalanceService.getBalance(query.account_id)
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
