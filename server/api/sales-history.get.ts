type HistoryItemRow = {
  id: number
  product_id: number | null
  product_name: string | null
  sku: string | null
  unit: string | null
  qty: number | null
  unit_price: number | null
  line_total: number | null
}

type HistoryRow = {
  id: number
  receipt_no: string
  sold_at: string
  payment_method: "cash" | "qris" | "debit"
  payment_label: string
  total_qty: number | null
  total_amount: number | null
  cash_amount: number | null
  change_amount: number | null
  sales_history_items?: HistoryItemRow[] | null
}

export default defineEventHandler(async () => {
  const supabaseUrl = process.env.SUPABASE_URL
  const supabaseKey = process.env.SUPABASE_KEY

  if (!supabaseUrl || !supabaseKey) {
    throw createError({
      statusCode: 500,
      statusMessage: "SUPABASE_URL or SUPABASE_KEY is not configured",
    })
  }

  const query =
    "select=id,receipt_no,sold_at,payment_method,payment_label,total_qty,total_amount,cash_amount,change_amount,sales_history_items(id,product_id,product_name,sku,unit,qty,unit_price,line_total)&order=id.desc"
  const url = `${supabaseUrl}/rest/v1/sales_history?${query}`

  const rows = await $fetch<HistoryRow[]>(url, {
    headers: {
      apikey: supabaseKey,
      Authorization: `Bearer ${supabaseKey}`,
    },
  })

  return (Array.isArray(rows) ? rows : []).map((row) => ({
    id: String(row.id),
    receiptNo: row.receipt_no,
    createdAt: row.sold_at,
    paymentMethod: row.payment_method,
    paymentLabel: row.payment_label,
    totalQty: Number(row.total_qty || 0),
    total: Number(row.total_amount || 0),
    cash: Number(row.cash_amount || 0),
    change: Number(row.change_amount || 0),
    lines: (Array.isArray(row.sales_history_items) ? row.sales_history_items : []).map((line) => ({
      id: String(line.id),
      productId: line.product_id == null ? null : String(line.product_id),
      name: line.product_name,
      sku: line.sku,
      unit: line.unit,
      qty: Number(line.qty || 0),
      price: Number(line.unit_price || 0),
      subtotal: Number(line.line_total || 0),
    })),
  }))
})
