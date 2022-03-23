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
	async getBalance(@Query() accound_id: string): Promise<any> {
		this.getBalanceService.getBalance(accound_id)
		return 'Welcome to the world of clean architecture'
	}
}
