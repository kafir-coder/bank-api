export class AccountAlreadyExistsError extends Error {
	constructor() {
		// eslint-disable-next-line quotes
		super(`Account already exists`)
		this.name = 'AccountAlreadyExistsError'
	}
}
