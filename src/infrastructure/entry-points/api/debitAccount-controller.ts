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

		
		
		if (result instanceof Error) {	
			if (result.name === 'AccountDoesntExistsError') return new BadRequestException(result)
		}
	}
}


export type DebitAccountControllerParams = {
    account_id: string
    amount: number
}
