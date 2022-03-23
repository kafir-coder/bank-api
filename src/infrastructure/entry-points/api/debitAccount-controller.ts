import { TransactionModel } from '@/domain/models/transaction'
import { DEBIT_FROM_ACCOUNT_SERVICE, IDebitFromAccountService } from '@/domain/use-cases/debitFromAccount-service'
import {Adapter, BadRequestException, Body, HttpException, Mapping, Post} from '@tsclean/core'
import { badRequest } from './helpers/http-helpers'

@Mapping('/api/v1/debit')
export class DebitAccountController {
	constructor(
        @Adapter(DEBIT_FROM_ACCOUNT_SERVICE) private readonly debitFromAccountService: IDebitFromAccountService
	) {}
  @Post()
	async debitFromAccount(@Body() data: DebitAccountControllerParams): Promise<TransactionModel | HttpException> {
		const result = await this.debitFromAccountService.debitFromAccount({...data, type: 'debit'})

		const errors = ['AccountDoesntExistsError', 'AccountHasNotSufficientMoneyError']
		if (result instanceof Error) {	
			if (errors.includes(result.name)) throw new BadRequestException(badRequest(result), result.message)
		}
		return result as TransactionModel
	}
}


export type DebitAccountControllerParams = {
    account_id: string
    amount: number
}
