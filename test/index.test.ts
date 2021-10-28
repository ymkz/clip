import { Miniflare } from 'miniflare'
import { test } from 'uvu'
import * as assert from 'uvu/assert'
import { Page } from '~/types/page'

const miniflare = new Miniflare({ scriptPath: 'dist-backend/index.js' })

let testedId: string

test('/api/get response `[]` with 200', async () => {
  const response = await miniflare.dispatchFetch(
    'http://localhost:3000/api/get'
  )
  const text = await response.text()
  assert.is(response.status, 200)
  assert.is(text, '[]')
})

test('/api/add response `OK` with 200', async () => {
  const response = await miniflare.dispatchFetch(
    'http://localhost:3000/api/add',
    {
      method: 'POST',
      body: JSON.stringify({ url: 'https://example.com' }),
    }
  )
  const text = await response.text()
  assert.is(response.status, 200)
  assert.is(text, 'OK')
})

test('/api/get response `[{"id":"",...}]` with 200', async () => {
  const response = await miniflare.dispatchFetch(
    'http://localhost:3000/api/get'
  )
  const text = await response.text()
  const json: Page[] = JSON.parse(text)
  testedId = json[0].id
  assert.is(response.status, 200)
  assert.is(json.length, 1)
})

test('/api/del response `OK` with 200', async () => {
  const response = await miniflare.dispatchFetch(
    'http://localhost:3000/api/del',
    { method: 'DELETE', body: JSON.stringify({ id: testedId }) }
  )
  const text = await response.text()
  assert.is(response.status, 200)
  assert.is(text, 'OK')
})

test('/api/get response `[]` with 200', async () => {
  const response = await miniflare.dispatchFetch(
    'http://localhost:3000/api/get'
  )
  const text = await response.text()
  assert.is(response.status, 200)
  assert.is(text, '[]')
})

test.after(async () => {
  await miniflare.dispose()
})

test.run()
