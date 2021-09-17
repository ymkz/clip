export function ok(init?: ResponseInit): Response {
  return new Response('OK', { ...init })
}

export function okJson(body: unknown, init?: ResponseInit): Response {
  return new Response(JSON.stringify(body), {
    headers: { 'content-type': 'application/json' },
    ...init,
  })
}

export function badRequest(message?: string): Response {
  const body = message ? `Bad Request: ${message}` : 'Bad Request'
  return new Response(body, {
    status: 400,
    statusText: 'Bad Request',
  })
}

export function forbidden(message?: string): Response {
  const body = message ? `Forbidden: ${message}` : 'Forbidden'
  return new Response(body, {
    status: 403,
    statusText: 'Forbidden',
  })
}

export function notFound(message?: string): Response {
  const body = message ? `Not Found: ${message}` : 'Not Found'
  return new Response(body, {
    status: 404,
    statusText: 'Not Found',
  })
}

export function internalWorkerError(
  message = 'Internal Worker Error'
): Response {
  return new Response(message, {
    status: 500,
    statusText: 'Internal Worker Error',
  })
}
