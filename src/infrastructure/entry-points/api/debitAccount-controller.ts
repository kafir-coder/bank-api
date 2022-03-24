import { ACCOUNT_EXISTS_SERVICE, IAccountExistsService } from '@/domain/use-cases/accountExists-service'
import { DEBIT_FROM_ACCOUNT_SERVICE, IDebitFromAccountService } from '@/domain/use-cases/debitFromAccount-service'
import {Adapter, BadRequestException, Body, HttpCode, Mapping, Post} from '@tsclean/core'
import { badRequest, HttpResponse, ok } from './helpers/http-helpers'

@Mapping('/api/v1/debit')
export class DebitAccountController {
	constructor(
				@Adapter(ACCOUNT_EXISTS_SERVICE) private readonly accountExistsService: IAccountExistsService,
        @Adapter(DEBIT_FROM_ACCOUNT_SERVICE) private readonly debitFromAccountService: IDebitFromAccountService
	) {}
  @Post()
	@HttpCode(200)
	async debitFromAccount(@Body() data: DebitAccountControllerParams): Promise<HttpResponse> {
		this.accountExistsService.exists(data.account_id)
		const result = await this.debitFromAccountService.debitFromAccount({...data, type: 'debit'})

		return ok(result)
	}
}


export type DebitAccountControllerParams = {
    account_id: string
    amount: number
}
