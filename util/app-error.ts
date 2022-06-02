export const AppError = {
  ErrRequestBodyParseFailure: new Error('request body can not parse as json'),
  ErrRequestBodyUrlMissing: new Error('request body <url> is required'),
  ErrRequestBodyIdMissing: new Error('request body <id> is required'),
  ErrRequestParamParseFailure: new Error('request param <key> is required'),

  ErrFetchClipInfoFailure: new Error('failed to fetch clip info'),

  ErrKvGetClipDataFailure: new Error('failed to get clip data from kv'),
  ErrKvAddClipItemFailure: new Error('failed to add clip item from kv'),
  ErrKvDeleteClipItemFailure: new Error('failed to delete clip item from kv'),

  ErrKvGetClipImageFailure: new Error('failed to remove image from kv'),
  ErrKvAddClipImageFailure: new Error('failed to add clip image from kv'),
  ErrKvDeleteClipImageFailure: new Error('failed to delete clip image from kv'),

  ErrImageSizeLimitOver: new Error('exceeding the image size upper limit'),
}
