import { useAuthStore } from '~/stores/auth';

export default defineNuxtRouteMiddleware((to) => {
  const authStore = useAuthStore();
  
  // Public routes that don't require authentication
  const publicRoutes = ['/login', '/register'];
  
  // If route is public, allow access
  if (publicRoutes.includes(to.path)) {
    return;
  }
  
  // Check if user is not authenticated and trying to access protected route
  if (!authStore.user) {
    // Redirect to login page
    return navigateTo('/login');
  }
});