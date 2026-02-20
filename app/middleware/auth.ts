export default defineNuxtRouteMiddleware(async (to) => {
  if (process.server) return

  const { getSession } = useAuth()
  const path = (to.path || "/").replace(/\/+$/, "") || "/"

  const protectedPrefixes = ["/admin"]
  const isProtectedRoute = protectedPrefixes.some(
    (p) => path === p || path.startsWith(`${p}/`)
  )

  const { session } = await getSession()

  if (!session && isProtectedRoute) {
    return navigateTo("/")
  }
})
