import { CREDIT_TO_ACCOUNT_SERVICE, ICreditToAccountService } from '@/domain/use-cases/creditToAccount-service'
import {Adapter, Body, Mapping, Post} from '@tsclean/core'

@Mapping('/api/v1/credit')
export class CreditAccountController {
	constructor(
        @Adapter(CREDIT_TO_ACCOUNT_SERVICE) private readonly creditToAccountService: ICreditToAccountService
	) {}

	@Post()
	async creditToAccount(@Body() data: CreditAccountControllerParams) {
		this.creditToAccountService.creditToAccount({...data, type: 'credit'})
	}
}

export type CreditAccountControllerParams = {
	account_id: string
	amount: number
}
