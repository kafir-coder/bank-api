import { CREDIT_TO_ACCOUNT_SERVICE, ICreditToAccountService } from '@/domain/use-cases/creditToAccount-service'
import { DEBIT_FROM_ACCOUNT_SERVICE, IDebitFromAccountService } from '@/domain/use-cases/debitFromAccount-service'
import {Adapter, Body, HttpCode, Mapping, Post} from '@tsclean/core'
import { HttpResponse, ok } from './helpers/http-helpers'

@Mapping('/api/v1/transfer')
export class TransferMoneyController {
	constructor(
        @Adapter(DEBIT_FROM_ACCOUNT_SERVICE) private readonly debitFromAccountService: IDebitFromAccountService,
        @Adapter(CREDIT_TO_ACCOUNT_SERVICE) private readonly creditToAccountService: ICreditToAccountService
	) {}
    @Post()
    @HttpCode(200)
	async transferMoney(@Body() data: TransferControllerParams): Promise<HttpResponse> {
		return ok('12')
	}

}


export type TransferControllerParams = {
    from_account_id: number
    to_account_id: number
    ammount: number
}
