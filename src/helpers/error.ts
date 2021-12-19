export const AppError = {
  KV_GET_ALL_ERROR: "KV_GET_ALL_ERROR",
  KV_ADD_ONE_ERROR: "KV_ADD_ONE_ERROR",
  KV_REMOVE_ONE_ERROR: "KV_REMOVE_ONE_ERROR",
  REQUEST_BODY_MISSING_ERROR: "REQUEST_BODY_MISSING_ERROR",
  FETCH_PAGE_ERROR: "FETCH_PAGE_ERROR",
} as const

export type AppErrorType = typeof AppError[keyof typeof AppError]