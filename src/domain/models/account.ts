export type AccountModel = {
    id: string
    cpf: string
    owner_name: string
    balance: number
}

export type AddAccountParams = Omit<AccountModel, 'id'>
