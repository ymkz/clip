import { AppError, ErrorCode } from '../utils/error'

export const errorHandler: PagesFunction<Env> = async ({ next }) => {
  return await next().catch((err) => {
    if (err instanceof AppError) {
      console.error(err.toString())
      return new Response(JSON.stringify({ error: err.toJson() }), {
        status: err.statusCode,
        headers: {
          'Content-Type': 'application/json',
        },
      })
    }
    return new Response(
      JSON.stringify({
        error: { code: ErrorCode.UNKNOWN, message: err.message },
      }),
      {
        status: 500,
        headers: {
          'Content-Type': 'application/json',
        },
      }
    )
  })
}
