<template>
  <div class="login-page">
    <div class="login-container">
      <h1>Giriş Yap</h1>
      
      <form @submit.prevent="handleLogin">
        <div class="form-group">
          <input 
            v-model="email"
            type="email"
            placeholder="E-posta"
            required
          />
        </div>

        <div class="form-group">
          <input 
            v-model="password"
            type="password"
            placeholder="Şifre"
            required
          />
        </div>

        <!-- Success Message -->
        <div v-if="successMessage" class="success-message">
          {{ successMessage }}
        </div>

        <!-- Error Message -->
        <div v-if="error" class="error-message">
          {{ error }}
        </div>

        <button type="submit" :disabled="loading">
          {{ loading ? 'Giriş yapılıyor...' : 'Giriş Yap' }}
        </button>

        <div class="links">
          <NuxtLink to="/register">Hesap oluştur</NuxtLink>
          <NuxtLink to="/forgot-password">Şifremi unuttum</NuxtLink>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useAuthStore } from '~/stores/auth'
import { useRouter } from 'vue-router'

const auth = useAuthStore()
const router = useRouter()

const email = ref('')
const password = ref('')
const error = ref('')
const loading = ref(false)
const successMessage = ref('')

async function handleLogin() {
  try {
    loading.value = true
    error.value = ''
    successMessage.value = ''

    await auth.login(email.value, password.value)
    successMessage.value = 'Giriş başarılı! Yönlendiriliyorsunuz...'
    
    setTimeout(() => {
      router.push('/')
    }, 2000)
    
  } catch (err) {
    error.value = 'Giriş başarısız. Lütfen bilgilerinizi kontrol edin.'
  } finally {
    loading.value = false
  }
}
</script>

<style scoped>
.login-page {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
}

.login-container {
  width: 100%;
  max-width: 400px;
  padding: 30px;
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0,0,0,0.1);
}

h1 {
  text-align: center;
  margin-bottom: 30px;
}

.form-group {
  margin-bottom: 20px;
}

input {
  width: 100%;
  padding: 12px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 16px;
}

button {
  width: 100%;
  padding: 12px;
  background: #006394;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 16px;
  cursor: pointer;
  margin: 20px 0;
}

button:disabled {
  background: #ccc;
  cursor: not-allowed;
}

.success-message {
  color: #4CAF50;
  text-align: center;
  margin: 10px 0;
  font-weight: bold;
}

.error-message {
  color: #f44336;
  text-align: center;
  margin: 10px 0;
}

.links {
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
}

.links a {
  color: #006394;
  text-decoration: none;
}

.links a:hover {
  text-decoration: underline;
}
</style>