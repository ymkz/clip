const errorHandler: PagesFunction<Env> = async ({ next }) => {
  return await next().catch((error: Error) => {
    console.error(`[ERROR] ${error}`)
    return new Response(error.message, { status: 500 })
  })
}

export const onRequest = [errorHandler]
