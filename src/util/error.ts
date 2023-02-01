export class KVError extends Error {
  override readonly name = 'KVError' as const
  constructor(message: string, options?: ErrorOptions) {
    super(message, options)
    this.cause = options?.cause
  }
}

export const createKVError = ({
  reason,
  cause,
}: {
  reason: string
  cause?: unknown
}) => {
  return new KVError(JSON.stringify({ reason }), { cause })
}

export class FetchError extends Error {
  override readonly name = 'FetchError' as const
  constructor(message: string, options?: ErrorOptions) {
    super(message, options)
    this.cause = options?.cause
  }
}

export const createFetchError = ({
  reason,
  url,
  cause,
}: {
  reason: string
  url: string
  cause?: unknown
}) => {
  return new FetchError(JSON.stringify({ reason, url }), { cause })
}
