export type TransactionModel = {
    id: string
    accountId: string
    value: number
    type: string // enum('debit', 'credit')
}

export type AddTransactionParams = Omit<TransactionModel, 'id'>
