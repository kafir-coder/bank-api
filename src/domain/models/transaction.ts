export type TransactionModel = {
    id: string
    account_id: string
    amount: number
    type: string // enum('debit', 'credit')
}

export type AddTransactionParams = Omit<TransactionModel, 'id'>
