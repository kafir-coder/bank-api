import { ServerError } from '@/domain/errors/'


export type HttpResponse = {
  statusCode: number
  body: any
}

export const badRequest = (error: Error): HttpResponse => ({
	statusCode: 400,
	body: {
		name: error.name,
		message: error.message
	}
})

export const serverError = (error: Error): HttpResponse => ({
	statusCode: 500,
	body: new ServerError(error.stack)
})

export const ok = (data: any): HttpResponse => ({
	statusCode: 200,
	body: data
})

export const created = (data: any): HttpResponse => ({
	statusCode: 201,
	body: data
})
export const noContent = (): HttpResponse => ({
	statusCode: 204,
	body: null
})
