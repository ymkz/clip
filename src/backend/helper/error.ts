export const ErrorCode = {
  UNKNOWN_ERROR: 'UNKNOWN_ERROR',
  KV_GET_ALL_ERROR: 'KV_GET_ALL_ERROR',
  KV_ADD_ONE_ERROR: 'KV_ADD_ONE_ERROR',
  KV_REMOVE_ONE_ERROR: 'KV_REMOVE_ONE_ERROR',
  KV_ASSET_NOT_FOUND_ERROR: 'KV_ASSET_NOT_FOUND_ERROR',
  REQUEST_BODY_MISSING_ERROR: 'REQUEST_BODY_MISSING_ERROR',
  PAGE_FETCH_ERROR: 'PAGE_FETCH_ERROR',
} as const

export const errorHandler = (
  error: typeof ErrorCode[keyof typeof ErrorCode]
): Response => {
  switch (error) {
    case 'REQUEST_BODY_MISSING_ERROR': {
      return new Response(error, {
        status: 400,
        statusText: 'Bad Request',
      })
    }
    case 'KV_ASSET_NOT_FOUND_ERROR': {
      return new Response(error, {
        status: 404,
        statusText: 'Not Found',
      })
    }
    case 'KV_GET_ALL_ERROR':
    case 'KV_ADD_ONE_ERROR':
    case 'KV_REMOVE_ONE_ERROR':
    case 'PAGE_FETCH_ERROR': {
      return new Response(error, {
        status: 500,
        statusText: 'Internal Worker Error',
      })
    }
    default: {
      return new Response(ErrorCode.UNKNOWN_ERROR, {
        status: 500,
        statusText: 'Internal Worker Error',
      })
    }
  }
}
