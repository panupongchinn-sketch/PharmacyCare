import { getSupabaseEnv } from "../utils/supabase-env"

type CreateLinePayload = {
  productId?: string | number | null
  name?: string | null
  sku?: string | null
  unit?: string | null
  qty?: number
  price?: number
  subtotal?: number
}

type CreatePayload = {
  receiptNo?: string
  paymentMethod?: "cash" | "qris" | "debit"
  paymentLabel?: string
  totalQty?: number
  total?: number
  cash?: number
  change?: number
  lines?: CreateLinePayload[]
}

export default defineEventHandler(async (event) => {
  const { supabaseUrl, supabaseKey } = getSupabaseEnv()

  if (!supabaseUrl || !supabaseKey) {
    throw createError({
      statusCode: 500,
      statusMessage: "Supabase env is not configured (SUPABASE_URL + SUPABASE_KEY/ANON_KEY)",
    })
  }

  const body = await readBody<CreatePayload>(event)
  const lines = Array.isArray(body?.lines) ? body.lines : []

  if (lines.length === 0) {
    throw createError({ statusCode: 400, statusMessage: "lines is required" })
  }

  const paymentMethod =
    body?.paymentMethod === "qris" || body?.paymentMethod === "debit"
      ? body.paymentMethod
      : "cash"
  const receiptNo = String(body?.receiptNo || `RX-${Date.now().toString().slice(-8)}`)

  const salePayload = {
    receipt_no: receiptNo,
    payment_method: paymentMethod,
    payment_label:
      paymentMethod === "cash"
        ? "เงินสด"
        : paymentMethod === "qris"
          ? "QRIS"
          : "Debit",
    total_qty: Number(body?.totalQty ?? 0),
    total_amount: Number(body?.total ?? 0),
    cash_amount: Number(body?.cash ?? 0),
    change_amount: Number(body?.change ?? 0),
  }

  const headers = {
    apikey: supabaseKey,
    Authorization: `Bearer ${supabaseKey}`,
    "Content-Type": "application/json",
    Prefer: "return=representation",
  }

  const insertedSale = await $fetch<any[]>(`${supabaseUrl}/rest/v1/sales_history`, {
    method: "POST",
    headers,
    body: [salePayload],
  })

  const saleId = Array.isArray(insertedSale) ? insertedSale[0]?.id : insertedSale?.id
  if (!saleId) {
    throw createError({ statusCode: 500, statusMessage: "Create sale failed" })
  }

  const itemRows = lines.map((line) => {
    const parsedProductId = Number(line.productId)
    const qty = Number(line.qty ?? 0)
    const price = Number(line.price ?? 0)
    const subtotal = Number.isFinite(Number(line.subtotal))
      ? Number(line.subtotal)
      : qty * price

    return {
      sale_id: saleId,
      product_id: Number.isFinite(parsedProductId) ? parsedProductId : null,
      product_name: String(line.name || "").trim(),
      sku: line.sku ? String(line.sku).trim() : null,
      unit: line.unit ? String(line.unit).trim() : null,
      qty,
      unit_price: price,
      line_total: subtotal,
    }
  })

  if (itemRows.length > 0) {
    await $fetch(`${supabaseUrl}/rest/v1/sales_history_items`, {
      method: "POST",
      headers,
      body: itemRows,
    })
  }

  return { ok: true, id: String(saleId) }
})
