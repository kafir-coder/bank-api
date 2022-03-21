export class AccountDoesntExistsError extends Error {
	constructor() {
		// eslint-disable-next-line quotes
		super(`Account doesn't exists" }`)
		this.name = 'AccountDoesntExistsError'
	}
}
