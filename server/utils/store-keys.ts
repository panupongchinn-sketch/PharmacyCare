export const ALLOWED_STORE_KEYS = new Set([
  "projects",
  "products",
  "partners",
  "contact_messages",
  "invoice_requests",
  "training_courses",
])

export const assertStoreKey = (value: string) => {
  if (!ALLOWED_STORE_KEYS.has(value)) {
    throw createError({
      statusCode: 400,
      statusMessage: `Invalid store key: ${value}`,
    })
  }
  return value
}
