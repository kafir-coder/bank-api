import { DEBIT_FROM_ACCOUNT_SERVICE, IDebitFromAccountService } from '@/domain/use-cases/debitFromAccount-service'
import {Adapter, Body, Mapping, Post} from '@tsclean/core'
import { HttpResponse } from './helpers/http-helpers'

@Mapping('/api/v1/debit')
export class DebitAccountController {
	constructor(
        @Adapter(DEBIT_FROM_ACCOUNT_SERVICE) private readonly debitFromAccountService: IDebitFromAccountService
	) {}
  @Post()
	async debitFromAccount(@Body() data: DebitAccountControllerParams): Promise<HttpResponse> {
		this.debitFromAccountService.debitFromAccount({...data, type: 'debit'})
		return { 
			statusCode: 201,
			body: 'ola'
		}
	}
}


export type DebitAccountControllerParams = {
    account_id: string
    amount: number
}
