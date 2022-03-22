import { DEBIT_FROM_ACCOUNT_SERVICE, IDebitFromAccountService } from '@/domain/use-cases/debitFromAccount-service'
import {Adapter, BadRequestException, Body, HttpException, Mapping, Post} from '@tsclean/core'

@Mapping('/api/v1/debit')
export class DebitAccountController {
	constructor(
        @Adapter(DEBIT_FROM_ACCOUNT_SERVICE) private readonly debitFromAccountService: IDebitFromAccountService
	) {}
  @Post()
	async debitFromAccount(@Body() data: DebitAccountControllerParams): Promise<HttpException> {
		const result = await this.debitFromAccountService.debitFromAccount({...data, type: 'debit'})

		
		const errors = ['AccountDoesntExistsError', 'AccountHasNotSufficientMoneyError']
		if (result instanceof Error) {	
			if (errors.includes(result.name)) return new BadRequestException(result)
		}
	}
}


export type DebitAccountControllerParams = {
    account_id: string
    amount: number
}
