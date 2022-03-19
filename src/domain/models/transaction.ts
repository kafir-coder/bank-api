export type TransactionModel = {
    id: string
    account_id: string
    value: number
    type: string // enum('debit', 'credit')
}

export type AddTransactionParams = Omit<TransactionModel, 'id'>
