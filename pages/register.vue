<template>
  <div class="register-page">
    <div class="container">
      <div class="register-card">
        <h1>Hesap Oluştur</h1>
        
        <form @submit.prevent="handleRegister">
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

          <div class="form-group">
            <input 
              v-model="confirmPassword"
              type="password"
              placeholder="Şifre Tekrar"
              required 
            />
          </div>

          <button type="submit" :disabled="loading">
            {{ loading ? 'Hesap oluşturuluyor...' : 'Hesap Oluştur' }}
          </button>
        </form>

        <p v-if="error" class="error">{{ error }}</p>

        <div class="links">
          <p>Zaten hesabınız var mı? <NuxtLink to="/login">Giriş yap</NuxtLink></p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useAuthStore } from '~/stores/auth';

const auth = useAuthStore();
const router = useRouter();

const email = ref('');
const password = ref('');
const confirmPassword = ref('');
const error = ref('');
const loading = ref(false);

async function handleRegister() {
  try {
    loading.value = true;
    error.value = '';

    // Şifre kontrolü
    if (password.value.length < 6) {
      error.value = 'Şifre en az 6 karakter olmalıdır';
      return;
    }

    if (password.value !== confirmPassword.value) {
      error.value = 'Şifreler eşleşmiyor';
      return;
    }

    // Firebase kayıt işlemi
    await auth.register(email.value, password.value);
    
    // Başarılı kayıt sonrası yönlendirme
    router.push('/login');
  } catch (err) {
    console.error('Kayıt hatası:', err);
    
    // Firebase hata kodlarına göre özel mesajlar
    switch(err.code) {
      case 'auth/email-already-in-use':
        error.value = 'Bu e-posta adresi zaten kullanımda';
        break;
      case 'auth/invalid-email':
        error.value = 'Geçersiz e-posta adresi formatı';
        break;
      case 'auth/operation-not-allowed':
        error.value = 'E-posta/şifre girişi devre dışı bırakılmış';
        break;
      case 'auth/weak-password':
        error.value = 'Şifre çok zayıf. En az 6 karakter olmalıdır';
        break;
      default:
        error.value = `Kayıt hatası: ${err.message}`;
    }
  } finally {
    loading.value = false;
  }
}
</script>

<style scoped>
.login-page {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #f5f5f5;
}

.container {
  width: 100%;
  max-width: 400px;
  padding: 20px;
}

.login-card {
  background: white;
  padding: 30px;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0,0,0,0.1);
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
}

button:disabled {
  background: #ccc;
}

.error {
  color: red;
  margin-top: 10px;
}

.links {
  margin-top: 20px;
  display: flex;
  justify-content: space-between;
}
</style>