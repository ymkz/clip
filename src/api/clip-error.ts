export const AppError = {
  ErrRequestBodyParseFailure: new Error('request body can not parse as json'),
  ErrRequestBodyUrlMissing: new Error('request body <url> is required'),
  ErrRequestBodyIdMissing: new Error('request body <id> is required'),
  ErrFetchClipItemFailure: new Error('failed to fetch clip item'),
  ErrKvGetAllFailure: new Error('failed to get data from kv'),
  ErrKvAddOneFailure: new Error('failed to add item from kv'),
  ErrKvRemoveOneFailure: new Error('failed to remove item from kv'),
}
