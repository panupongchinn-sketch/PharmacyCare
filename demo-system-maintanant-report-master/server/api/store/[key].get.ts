import { getStoreValue } from "../../utils/db"
import { assertStoreKey } from "../../utils/store-keys"

export default defineEventHandler(async (event) => {
  const key = assertStoreKey(String(event.context.params?.key || ""))
  const value = await getStoreValue(key)
  return { key, value }
})
