export type AppErrorType = {
  reason: string
  status: number
}

const REQUEST_BODY_PARSE_ERROR: AppErrorType = {
  reason: "request body can not parse as json",
  status: 400,
}

const REQUEST_BODY_URL_MISSING_ERROR: AppErrorType = {
  reason: "request body <url> is required",
  status: 400,
}

const REQUEST_BODY_ID_MISSING_ERROR: AppErrorType = {
  reason: "request body <id> is required",
  status: 400,
}

const KV_GET_ALL_ERROR: AppErrorType = {
  reason: "failed to get data from kv",
  status: 500,
}

const KV_ADD_ONE_ERROR: AppErrorType = {
  reason: "failed to add item from kv",
  status: 500,
}

const KV_REMOVE_ONE_ERROR: AppErrorType = {
  reason: "failed to remove item from kv",
  status: 500,
}

const FETCH_PAGE_INFO_ERROR: AppErrorType = {
  reason: "failed to fetch page info",
  status: 500,
}

export const AppError = {
  REQUEST_BODY_PARSE_ERROR,
  REQUEST_BODY_URL_MISSING_ERROR,
  REQUEST_BODY_ID_MISSING_ERROR,
  KV_GET_ALL_ERROR,
  KV_ADD_ONE_ERROR,
  KV_REMOVE_ONE_ERROR,
  FETCH_PAGE_INFO_ERROR,
}
