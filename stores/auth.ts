/**
 * Firebase Authentication store using Pinia
 * 
 * This store handles authentication state and operations using Firebase Auth
 * with Pinia state management.
 * 
 * @module AuthStore
 * 
 * @property {User | null} user - Current authenticated Firebase user
 * @property {boolean} loading - Loading state for async operations
 * @property {string | null} error - Error message from last operation
 * 
 * @method login - Authenticates user with email/password
 * @method register - Creates new user account with email/password
 * @method logout - Signs out current user
 * 
 * Usage example:
 * ```typescript
 * const authStore = useAuthStore();
 * await authStore.login(email, password);
 * ```
 */
import { defineStore } from 'pinia';
import { auth } from '~/firebaseConfig';
import { 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword,
  signOut,
  type User,
  type AuthError
} from 'firebase/auth';

interface AuthState {
  user: User | null;
  loading: boolean;
  error: string | null;
}

export const useAuthStore = defineStore('auth', {
    // State yönetimi için kullanılacak olan başlangıç değerlerini tanımlıyoruz.
  state: (): AuthState => ({
    user: null,
    loading: false,
    error: null
  }),
  // Actions - Firebase auth işlemleri için kullanılacak olan fonksiyonları tanımlıyoruz.
  actions: {
    async login(email: string, password: string) {
      this.loading = true;
      this.error = null;
      try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        this.user = userCredential.user;
        return userCredential;
      } catch (error) {
        this.error = (error as AuthError).message;
        throw error;
      } finally {
        this.loading = false;
      }
    },

    async register(email: string, password: string) {
      this.loading = true;
      this.error = null;
      try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        this.user = userCredential.user;
        return userCredential;
      } catch (error) {
        this.error = (error as AuthError).message;
        throw error;
      } finally {
        this.loading = false;
      }
    },

    async logout() {
      await signOut(auth);
      this.user = null;
    }
  }
});