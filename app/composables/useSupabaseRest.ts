type ProductRow = {
  id: string | number
  sku: string | null
  name: string | null
  brand: string | null
  category: string | null
  image_url: string | null
  unit: string | null
  quantity: number | null
  purchase_price?: number | null
  price: number | null
}

type CreateProductPayload = {
  sku: string
  name: string
  brand?: string | null
  category: string
  unit: string
  quantity: number
  purchase_price?: number | null
  price: number
  image_url?: string | null
}

type UpdateProductPayload = Partial<CreateProductPayload>
type DecrementStockPayload = {
  id?: string | number | null
  sku?: string | null
  qty: number
}

type SaleLinePayload = {
  productId?: string | number | null
  name?: string | null
  sku?: string | null
  unit?: string | null
  qty?: number
  price?: number
  subtotal?: number
}

type CreateSalePayload = {
  receiptNo?: string
  paymentMethod?: "cash" | "qris" | "debit"
  paymentLabel?: string
  totalQty?: number
  total?: number
  cash?: number
  change?: number
  lines?: SaleLinePayload[]
}

export const useSupabaseRest = () => {
  const config = useRuntimeConfig()
  const fallbackSupabaseUrl = "https://ezaccpveuyilyfownpzs.supabase.co"
  const fallbackSupabaseAnonKey =
    "sb_publishable_lu9mwNQ95NC6C2ajzQSSXg_pqzEIfMA"
  const supabaseUrl = String(config.public.supabaseUrl || fallbackSupabaseUrl).trim()
  const supabaseAnonKey = String(config.public.supabaseAnonKey || fallbackSupabaseAnonKey).trim()

  const ensureEnv = () => {
    if (!supabaseUrl || !supabaseAnonKey) {
      throw new Error("Missing NUXT_PUBLIC_SUPABASE_URL or NUXT_PUBLIC_SUPABASE_ANON_KEY")
    }
  }

  const headers = () => {
    ensureEnv()
    return {
      apikey: supabaseAnonKey,
      "Content-Type": "application/json",
    }
  }

  const withApiKey = (url: string) => {
    ensureEnv()
    const sep = url.includes("?") ? "&" : "?"
    return `${url}${sep}apikey=${encodeURIComponent(supabaseAnonKey)}`
  }

  const listProducts = async (): Promise<ProductRow[]> => {
    try {
      const withBrandAndPurchasePrice = await $fetch<ProductRow[]>(
        withApiKey(
          `${supabaseUrl}/rest/v1/products_primary?select=id,sku,name,brand,category,image_url,unit,quantity,purchase_price,price&order=id.desc`
        ),
        { headers: { ...headers(), "Cache-Control": "no-cache" }, cache: "no-store" }
      )
      return Array.isArray(withBrandAndPurchasePrice) ? withBrandAndPurchasePrice : []
    } catch {
      try {
        const withoutBrandWithPurchase = await $fetch<any[]>(
          withApiKey(
            `${supabaseUrl}/rest/v1/products_primary?select=id,sku,name,category,image_url,unit,quantity,purchase_price,price&order=id.desc`
          ),
          { headers: { ...headers(), "Cache-Control": "no-cache" }, cache: "no-store" }
        )
        return Array.isArray(withoutBrandWithPurchase)
          ? withoutBrandWithPurchase.map((x) => ({ ...x, brand: null }))
          : []
      } catch {
        const withoutBrand = await $fetch<any[]>(
          withApiKey(`${supabaseUrl}/rest/v1/products_primary?select=id,sku,name,category,image_url,unit,quantity,price&order=id.desc`),
          { headers: { ...headers(), "Cache-Control": "no-cache" }, cache: "no-store" }
        )
        return Array.isArray(withoutBrand)
          ? withoutBrand.map((x) => ({ ...x, brand: null, purchase_price: null }))
          : []
      }
    }
  }

  const createProduct = async (payload: CreateProductPayload) => {
    const h = { ...headers(), Prefer: "return=representation" }
    const sku = encodeURIComponent(payload.sku)
    const existing = await $fetch<any[]>(
      withApiKey(`${supabaseUrl}/rest/v1/products_primary?select=id&sku=eq.${sku}&limit=1`),
      { headers: h }
    )
    if (Array.isArray(existing) && existing.length > 0) {
      throw new Error("SKU นี้มีอยู่แล้ว กรุณาใช้ SKU ใหม่")
    }

    const bodies: any[] = [
      payload,
      ((x) => {
        const { brand: _brand, ...rest } = x
        return rest
      })(payload),
      ((x) => {
        const { purchase_price: _purchasePrice, ...rest } = x
        return rest
      })(payload),
      ((x) => {
        const { brand: _brand, purchase_price: _purchasePrice, ...rest } = x
        return rest
      })(payload),
    ]

    let lastErr: any = null
    for (const body of bodies) {
      try {
        const inserted = await $fetch<any[]>(withApiKey(`${supabaseUrl}/rest/v1/products_primary`), {
          method: "POST",
          headers: h,
          body: [body],
        })
        return Array.isArray(inserted) ? inserted[0] : inserted
      } catch (err: any) {
        lastErr = err
      }
    }
    throw lastErr || new Error("Create product failed")
  }

  const deleteProduct = async (id: string | number) => {
    await $fetch(withApiKey(`${supabaseUrl}/rest/v1/products_primary?id=eq.${encodeURIComponent(String(id))}`), {
      method: "DELETE",
      headers: { ...headers(), Prefer: "return=minimal" },
    })
    return { ok: true }
  }

  const updateProduct = async (id: string | number, payload: UpdateProductPayload) => {
    const h = { ...headers(), Prefer: "return=representation" }
    const encodedId = encodeURIComponent(String(id))
    const getProductById = async () => {
      try {
        const rows = await $fetch<any[]>(
          withApiKey(
            `${supabaseUrl}/rest/v1/products_primary?select=id,sku,name,brand,category,image_url,unit,quantity,purchase_price,price&id=eq.${encodedId}&limit=1`
          ),
          { headers: headers() }
        )
        if (Array.isArray(rows) && rows[0]) return rows[0]
      } catch {
        try {
          const rows = await $fetch<any[]>(
            withApiKey(
              `${supabaseUrl}/rest/v1/products_primary?select=id,sku,name,category,image_url,unit,quantity,purchase_price,price&id=eq.${encodedId}&limit=1`
            ),
            { headers: headers() }
          )
          if (Array.isArray(rows) && rows[0]) return { ...rows[0], brand: null }
        } catch {
          const rows = await $fetch<any[]>(
            withApiKey(
              `${supabaseUrl}/rest/v1/products_primary?select=id,sku,name,category,image_url,unit,quantity,price&id=eq.${encodedId}&limit=1`
            ),
            { headers: headers() }
          )
          if (Array.isArray(rows) && rows[0]) return { ...rows[0], brand: null, purchase_price: null }
        }
      }
      return null
    }

    const valueEquals = (key: string, a: any, b: any) => {
      if (a == null && b == null) return true
      if (key === "quantity" || key === "price" || key === "purchase_price") {
        return Number(a ?? 0) === Number(b ?? 0)
      }
      return String(a ?? "") === String(b ?? "")
    }

    const rowMatchesPayload = (row: any, expected: UpdateProductPayload) => {
      const entries = Object.entries(expected).filter(([, v]) => v !== undefined)
      for (const [key, value] of entries) {
        if (!valueEquals(key, row?.[key], value)) return false
      }
      return true
    }

    const ensureUpdatedRow = async (updated: any, expected: UpdateProductPayload) => {
      const row = Array.isArray(updated) ? updated[0] : updated
      if (row && row.id != null && rowMatchesPayload(row, expected)) return row
      const latest = await getProductById()
      if (latest && latest.id != null && rowMatchesPayload(latest, expected)) return latest
      throw new Error("Update product failed: values not changed")
    }

    const bodies: any[] = [
      payload,
      ((x) => {
        const { brand: _brand, ...rest } = x
        return rest
      })(payload),
      ((x) => {
        const { purchase_price: _purchasePrice, ...rest } = x
        return rest
      })(payload),
      ((x) => {
        const { brand: _brand, purchase_price: _purchasePrice, ...rest } = x
        return rest
      })(payload),
    ]

    let lastErr: any = null
    for (const body of bodies) {
      try {
        const updated = await $fetch<any[]>(
          withApiKey(`${supabaseUrl}/rest/v1/products_primary?id=eq.${encodedId}`),
          {
            method: "PATCH",
            headers: h,
            body,
          }
        )
        return await ensureUpdatedRow(updated, body)
      } catch (err: any) {
        lastErr = err
      }
    }
    throw lastErr || new Error("Update product failed")
  }

  const decrementProductStock = async (payload: DecrementStockPayload) => {
    const qty = Number(payload.qty || 0)
    if (!Number.isFinite(qty) || qty <= 0) {
      throw new Error("Invalid stock decrement qty")
    }

    const h = headers()
    let product: any = null

    if (payload.id != null && String(payload.id).trim()) {
      const byId = await $fetch<any[]>(
        withApiKey(
          `${supabaseUrl}/rest/v1/products_primary?select=id,sku,quantity&id=eq.${encodeURIComponent(
            String(payload.id)
          )}&limit=1`
        ),
        { headers: h }
      )
      if (Array.isArray(byId) && byId[0]) product = byId[0]
    }

    if (!product && payload.sku && String(payload.sku).trim()) {
      const bySku = await $fetch<any[]>(
        withApiKey(
          `${supabaseUrl}/rest/v1/products_primary?select=id,sku,quantity&sku=eq.${encodeURIComponent(
            String(payload.sku).trim()
          )}&limit=1`
        ),
        { headers: h }
      )
      if (Array.isArray(bySku) && bySku[0]) product = bySku[0]
    }

    if (!product || product.id == null) {
      throw new Error("ไม่พบสินค้าเพื่อตัดสต็อก")
    }

    const beforeQty = Number(product.quantity || 0)
    if (beforeQty < qty) {
      throw new Error("สินค้าไม่พอในสต็อก")
    }

    const afterQty = Math.max(0, beforeQty - qty)
    const updated = await updateProduct(product.id, { quantity: afterQty })

    return {
      id: product.id,
      sku: product.sku ?? null,
      beforeQty,
      afterQty: Number(updated?.quantity ?? afterQty),
    }
  }

  const listSalesHistory = async () => {
    const query =
      "select=id,receipt_no,sold_at,payment_method,payment_label,total_qty,total_amount,cash_amount,change_amount,sales_history_items(id,product_id,product_name,sku,unit,qty,unit_price,line_total)&order=id.desc"
    const rows = await $fetch<any[]>(withApiKey(`${supabaseUrl}/rest/v1/sales_history?${query}`), {
      headers: headers(),
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
      lines: (Array.isArray(row.sales_history_items) ? row.sales_history_items : []).map((line: any) => ({
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
  }

  const createSaleHistory = async (payload: CreateSalePayload) => {
    const lines = Array.isArray(payload.lines) ? payload.lines : []
    if (lines.length === 0) {
      throw new Error("lines is required")
    }

    const paymentMethod =
      payload.paymentMethod === "qris" || payload.paymentMethod === "debit"
        ? payload.paymentMethod
        : "cash"

    const salePayload = {
      receipt_no: String(payload.receiptNo || `RX-${Date.now().toString().slice(-8)}`),
      payment_method: paymentMethod,
      payment_label:
        paymentMethod === "cash"
          ? "เงินสด"
          : paymentMethod === "qris"
            ? "QRIS"
            : "Debit",
      total_qty: Number(payload.totalQty ?? 0),
      total_amount: Number(payload.total ?? 0),
      cash_amount: Number(payload.cash ?? 0),
      change_amount: Number(payload.change ?? 0),
    }

    const h = { ...headers(), Prefer: "return=representation" }
    const insertedSale = await $fetch<any[]>(withApiKey(`${supabaseUrl}/rest/v1/sales_history`), {
      method: "POST",
      headers: h,
      body: [salePayload],
    })
    const saleId = Array.isArray(insertedSale) ? insertedSale[0]?.id : insertedSale?.id
    if (!saleId) {
      throw new Error("Create sale failed")
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
      await $fetch(withApiKey(`${supabaseUrl}/rest/v1/sales_history_items`), {
        method: "POST",
        headers: h,
        body: itemRows,
      })
    }
    return { ok: true, id: String(saleId) }
  }

  const deleteSaleHistory = async (id: string | number) => {
    await $fetch(withApiKey(`${supabaseUrl}/rest/v1/sales_history?id=eq.${encodeURIComponent(String(id))}`), {
      method: "DELETE",
      headers: { ...headers(), Prefer: "return=minimal" },
    })
    return { ok: true }
  }

  return {
    listProducts,
    createProduct,
    updateProduct,
    decrementProductStock,
    deleteProduct,
    listSalesHistory,
    createSaleHistory,
    deleteSaleHistory,
  }
}
