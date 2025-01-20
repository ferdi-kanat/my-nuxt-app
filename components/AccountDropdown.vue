<template>
  <div class="account-dropdown">
    <div class="dropdown-content">
      <h2 class="title">GİRİŞ YAP</h2>
      <span class="required-info">* Zorunlu Alan</span>

      <form @submit.prevent="handleLogin">
        <!-- Email Input -->
        <div class="input-group">
          <input 
            v-model="email"
            type="email" 
            placeholder="E-Mail Adresi*" 
            required
          />
        </div>

        <!-- Password Input -->
        <div class="input-group password-group">
          <input 
            v-model="password"
            :type="showPassword ? 'text' : 'password'" 
            placeholder="Şifre*"
            required 
          />
          <button type="button" class="toggle-password" @click="togglePassword">
            <i :class="showPassword ? 'fas fa-eye-slash' : 'fas fa-eye'"></i>
          </button>
        </div>

        <p class="password-requirements">
          Şifreniz en az 8 karakter uzunluğunda olmalı, 1 büyük harf, 1 küçük harf ve 1 rakam içermelidir
        </p>

        <!-- Error Message -->
        <p v-if="error" class="error-message">{{ error }}</p>

        <p v-if="successMessage" class="success-message">{{ successMessage }}</p>

        <!-- Login Button -->
        <button type="submit" class="login-button" :disabled="loading">
          {{ loading ? 'GİRİŞ YAPILIYOR...' : 'GİRİŞ YAP' }}
        </button>

        <!-- Remember Me & Forgot Password -->
        <div class="options">
          <label class="remember-me">
            <input type="checkbox" v-model="rememberMe" />
            Beni Hatırla
          </label>
          <NuxtLink to="/forgot-password" class="forgot-password">Şifremi Unuttum</NuxtLink>
        </div>

        <!-- Additional Links -->
        <div class="additional-links">
          <NuxtLink to="/register">Üye Ol</NuxtLink>
          <NuxtLink to="/orders">Siparişi Takibi</NuxtLink>
        </div>
      </form>
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
const error = ref('');
const loading = ref(false);
const showPassword = ref(false);
const rememberMe = ref(false);

const togglePassword = () => {
  showPassword.value = !showPassword.value;
};

const emit = defineEmits(['close-dropdown']);
const successMessage = ref('');

async function handleLogin() {
  try {
    loading.value = true;
    error.value = '';
    successMessage.value = '';
    // Email ve şifre kontrolü
    if (!email.value || !password.value) {
      error.value = 'Email ve şifre alanları zorunludur';
      return;
    }

    // Firebase login işlemi
    const result = await auth.login(email.value, password.value);
    // Başarılı login işlemleri...
    if (result) {
      successMessage.value = 'Giriş başarılı! Yönlendiriliyorsunuz...';
      email.value = '';
      password.value = '';
      console.log('Login successful:', result);

      // 2 saniye bekleyip yönlendirme yapalım
      setTimeout(async () => {
        emit('close-dropdown');
        await navigateTo('/', { replace: true });
      }, 2000);
    }

  } catch (err) {
    console.error('Login error:', err);
    
    if (err?.code) {
      switch(err.code) {
        case 'auth/user-not-found':
          error.value = 'Bu email adresi ile kayıtlı kullanıcı bulunamadı';
          break;
        case 'auth/wrong-password':
          error.value = 'Hatalı şifre';
          break;
        case 'auth/invalid-email':
          error.value = 'Geçersiz email formatı';
          break;
        case 'auth/too-many-requests':
          error.value = 'Çok fazla başarısız deneme. Lütfen daha sonra tekrar deneyin';
          break;
        default:
          error.value = 'Giriş başarısız. Lütfen bilgilerinizi kontrol edin.';
      }
    }
  } finally {
    loading.value = false;
  }
}
</script>
  
<style scoped>
  /* Genel yapıyı ve pozisyonu ayarlama */
  .account-dropdown {
    position: absolute;
    top: 60px;
    right: 10px;
    background-color: white;
    border: 1px solid #ddd;
    border-radius: 8px;
    width: 320px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    z-index: 1000;
    padding: 20px;
    font-family: Arial, sans-serif; /* Görseldeki font */
  }
  
  /* Başlık */
  .title {
    font-size: 18px;
    font-weight: bold;
    margin-bottom: 5px;
  }
  
  /* Zorunlu Alan Bilgisi */
  .required-info {
    font-size: 12px;
    color: #555;
    margin-bottom: 20px;
    display: block;
  }
  
  /* Giriş kutuları */
  .input-group {
    margin-bottom: 15px;
  }
  
  .input-group input {
    width: 100%;
    padding: 10px;
    border: 1px solid #000; /* Siyah kenarlık */
    border-radius: 4px;
    font-size: 14px;
  }
  
  .password-group {
    display: flex;
    align-items: center;
  }
  
  .password-group input {
    flex: 1;
  }
  
  .password-group .toggle-password {
    background: none;
    border: none;
    cursor: pointer;
    margin-left: 5px;
  }
  
  .password-requirements {
    font-size: 12px;
    color: #777; /* Açıklama metni rengi */
    margin-top: -10px;
    margin-bottom: 15px;
  }
  
  /* Giriş Yap Butonu */
  .login-button {
    width: 100%;
    background-color: black; /* Siyah buton */
    color: white; /* Beyaz yazı */
    font-size: 14px;
    font-weight: bold;
    padding: 10px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
  }
  
  /* Beni Hatırla ve Şifremi Unuttum */
  .options {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 15px;
  }
  
  .options .remember-me {
    font-size: 12px;
    color: #555;
  }
  
  .options .forgot-password {
    font-size: 12px;
    color: black; /* Siyah yazı */
    text-decoration: none; /* Altı çizili değil */
  }
  
  .options .forgot-password:hover {
    text-decoration: underline; /* Hover'da altı çizili */
  }
  
  /* Üye Ol ve Siparişi Takibi */
  .additional-links {
    margin-top: 15px;
    text-align: center;
  }
  
  .additional-links a {
    display: block;
    font-size: 12px;
    color: black; /* Siyah yazı */
    text-decoration: underline; /* Altı çizili */
    margin: 5px 0;
  }
  
  .additional-links a:hover {
    text-decoration: none; /* Hover'da altı çizili kalkar */
  }
  .error-message {
  color: red;
  font-size: 12px;
  margin: 8px 0;
  text-align: center;
}

/* Password toggle button için ikon stili */
.fa-eye, .fa-eye-slash {
  color: #666;
}

/* Disabled button stili */
.login-button:disabled {
  background-color: #666;
  cursor: not-allowed;
}
.success-message {
  color: #4CAF50;
  font-size: 12px;
  margin: 8px 0;
  text-align: center;
  font-weight: bold;
}
  </style>
  