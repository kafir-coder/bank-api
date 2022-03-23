export class AccountHasNotSufficientMoneyError extends Error {
	constructor() {
		// eslint-disable-next-line quotes
		super(`Account doesn't has sufficient money`)
		this.name = 'AccountHasNotSufficientMoneyError'
	}
}
