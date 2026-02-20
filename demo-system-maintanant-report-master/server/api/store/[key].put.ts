import { setStoreValue } from "../../utils/db"
import { assertStoreKey } from "../../utils/store-keys"

export default defineEventHandler(async (event) => {
  const key = assertStoreKey(String(event.context.params?.key || ""))
  const body = await readBody(event)

  if (!Array.isArray(body?.value)) {
    throw createError({
      statusCode: 400,
      statusMessage: "Body must be: { value: [] }",
    })
  }

  await setStoreValue(key, body.value)
  return { ok: true }
})
