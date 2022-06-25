import { StatusCode } from 'hono/utils/http-status'

export const ErrorCode = {
  UNKNOWN: 'UNKNOWN',

  KV_GET_CLIP_DATA_FAILURE: 'KV_GET_CLIP_DATA_FAILURE',
  KV_ADD_CLIP_ITEM_FAILURE: 'KV_ADD_CLIP_ITEM_FAILURE',
  KV_DELETE_CLIP_ITEM_FAILURE: 'KV_DELETE_CLIP_ITEM_FAILURE',

  KV_GET_CLIP_IMAGE_FAILURE: 'KV_GET_CLIP_IMAGE_FAILURE',
  KV_ADD_CLIP_IMAGE_FAILURE: 'KV_ADD_CLIP_IMAGE_FAILURE',
  KV_DELETE_CLIP_IMAGE_FAILURE: 'KV_DELETE_CLIP_IMAGE_FAILURE',

  REQUEST_BODY_PARSE_FAILURE: 'REQUEST_BODY_PARSE_FAILURE',
  REQUEST_BODY_URL_MISSING: 'REQUEST_BODY_URL_MISSING',
  REQUEST_BODY_ID_MISSING: 'REQUEST_BODY_ID_MISSING',
  REQUEST_PARAM_PARSE_FAILURE: 'REQUEST_PARAM_PARSE_FAILURE',

  FETCH_CLIP_INFO_FAIL_ON_CLIENT: 'FETCH_CLIP_INFO_FAIL_ON_CLIENT',
  FETCH_CLIP_INFO_FAIL_ON_SERVER: 'FETCH_CLIP_INFO_FAIL_ON_SERVER',
  FETCH_CLIP_INFO_CANNOT_PARSE: 'FETCH_CLIP_INFO_CANNOT_PARSE',
  FETCH_CLIP_IMAGE_FAIL_ON_CLIENT: 'FETCH_CLIP_IMAGE_FAIL_ON_CLIENT',
  FETCH_CLIP_IMAGE_FAIL_ON_SERVER: 'FETCH_CLIP_IMAGE_FAIL_ON_SERVER',
  FETCH_CLIP_IMAGE_NOT_ARRAY_BUFFER: 'FETCH_CLIP_IMAGE_NOT_ARRAY_BUFFER',
} as const

export class AppError extends Error {
  constructor(
    public code: keyof typeof ErrorCode = ErrorCode.UNKNOWN,
    public statusCode: StatusCode = 500,
    message: string = 'unknown unexpected error caused'
  ) {
    super(message)
    this.name = new.target.name
  }

  toString() {
    return JSON.stringify({ error: this.toJson() })
  }

  toJson() {
    return {
      code: this.code,
      message: this.message,
    }
  }
}

export const E = {
  Unknown: new AppError(),

  KvGetClipDataFailure: new AppError(
    'KV_GET_CLIP_DATA_FAILURE',
    500,
    'failed to get clip data from kv'
  ),
  KvAddClipItemFailure: new AppError(
    'KV_ADD_CLIP_ITEM_FAILURE',
    500,
    'failed to add clip item from kv'
  ),
  KvDeleteClipItemFailure: new AppError(
    'KV_DELETE_CLIP_ITEM_FAILURE',
    500,
    'failed to delete clip item from kv'
  ),

  KvGetClipImageFailure: new AppError(
    'KV_GET_CLIP_IMAGE_FAILURE',
    500,
    'failed to get clip image from kv'
  ),
  KvAddClipImageFailure: new AppError(
    'KV_ADD_CLIP_IMAGE_FAILURE',
    500,
    'failed to add clip image from kv'
  ),
  KvDeleteClipImageFailure: new AppError(
    'KV_DELETE_CLIP_IMAGE_FAILURE',
    500,
    'failed to delete clip image from kv'
  ),

  RequestBodyParseFailure: new AppError(
    'REQUEST_BODY_PARSE_FAILURE',
    400,
    'request body can not parse as json'
  ),
  RequestBodyUrlMissing: new AppError(
    'REQUEST_BODY_URL_MISSING',
    400,
    'request body <url> is required'
  ),
  RequestBodyIdMissing: new AppError(
    'REQUEST_BODY_ID_MISSING',
    400,
    'request body <id> is required'
  ),
  RequestParamParseFailure: new AppError(
    'REQUEST_PARAM_PARSE_FAILURE',
    400,
    'request param <image-key> is required'
  ),

  FetchClipInfoFailOnClient: new AppError(
    'FETCH_CLIP_INFO_FAIL_ON_CLIENT',
    500,
    'failed to connect clip info url'
  ),
  FetchClipInfoFailOnServer: new AppError(
    'FETCH_CLIP_INFO_FAIL_ON_SERVER',
    500,
    'error responded from clip info url'
  ),
  FetchClipInfoCannotParse: new AppError(
    'FETCH_CLIP_INFO_CANNOT_PARSE',
    500,
    'failed on parse clip info by HTMLRewriter'
  ),
  FetchClipImageFailOnClient: new AppError(
    'FETCH_CLIP_IMAGE_FAIL_ON_CLIENT',
    500,
    'failed to connect clip image url'
  ),
  FetchClipImageFailOnServer: new AppError(
    'FETCH_CLIP_IMAGE_FAIL_ON_SERVER',
    500,
    'error responded from clip image url'
  ),
  FetchClipImageNotArrayBuffer: new AppError(
    'FETCH_CLIP_IMAGE_NOT_ARRAY_BUFFER',
    500,
    'failed on clip image response to arrayBuffer'
  ),
}
