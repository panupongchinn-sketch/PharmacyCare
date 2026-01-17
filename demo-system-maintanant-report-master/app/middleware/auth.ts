export default defineNuxtRouteMiddleware(async (to) => {
  if (process.server) return;

  const { getSession } = useAuth();

  // Public routes that don't require authentication
  const publicRoutes = ["/login", "/signup"];
  const isPublicRoute = publicRoutes.includes(to.path);

  // Check if user has valid session
  const { session } = await getSession();

  // If no session and trying to access protected route, redirect to login
  if (!session && !isPublicRoute) {
    return navigateTo("/login");
  }

  // If has session and trying to access login/signup, redirect to home
  if (session && isPublicRoute) {
    return navigateTo("/");
  }
});
