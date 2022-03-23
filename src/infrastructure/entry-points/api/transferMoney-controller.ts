import { CREDIT_TO_ACCOUNT_SERVICE, ICreditToAccountService } from '@/domain/use-cases/creditToAccount-service'
import { DEBIT_FROM_ACCOUNT_SERVICE, IDebitFromAccountService } from '@/domain/use-cases/debitFromAccount-service'
import {Adapter, BadRequestException, Body, HttpCode, Mapping, Post} from '@tsclean/core'
import { badRequest, HttpResponse, ok } from './helpers/http-helpers'

@Mapping('/api/v1/transfer')
export class TransferMoneyController {
	constructor(
        @Adapter(DEBIT_FROM_ACCOUNT_SERVICE) private readonly debitFromAccountService: IDebitFromAccountService,
        @Adapter(CREDIT_TO_ACCOUNT_SERVICE) private readonly creditToAccountService: ICreditToAccountService
	) {}
    @Post()
    @HttpCode(200)
	async transferMoney(@Body() data: TransferControllerParams): Promise<HttpResponse> {
		const {origin_account_id, target_account_id, amount} = data
		const result = await this.debitFromAccountService.debitFromAccount({
			amount,
			account_id: origin_account_id,
			type: 'debit'
		})

		if (result instanceof Error) throw new BadRequestException(badRequest(result))
		
		this.creditToAccountService.creditToAccount({
			amount,
			account_id: target_account_id,
			type: 'credit'
		})
		return ok('12')
	}

}


export type TransferControllerParams = {
    origin_account_id: string
    target_account_id: string
    amount: number
}
