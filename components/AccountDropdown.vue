<template>
    <div class="account-dropdown">
      <div class="dropdown-content">
        <h2 class="title">GİRİŞ YAP</h2>
        <span class="required-info">* Zorunlu Alan</span>
  
        <!-- Email Input -->
        <div class="input-group">
          <input type="email" placeholder="E-Mail Adresi*" />
        </div>
  
        <!-- Password Input -->
        <div class="input-group password-group">
          <input type="password" placeholder="Şifre*" />
          <button class="toggle-password">
            <i class="eye-icon"></i> <!-- Göz simgesi -->
          </button>
        </div>
        <p class="password-requirements">
          Şifreniz en az 8 karakter uzunluğunda olmalı, 1 büyük harf, 1 küçük harf ve 1 rakam içermelidir
        </p>
  
        <!-- Login Button -->
        <button class="login-button">GİRİŞ YAP</button>
  
        <!-- Remember Me & Forgot Password -->
        <div class="options">
          <label class="remember-me">
            <input type="checkbox" />
            Beni Hatırla
          </label>
          <a href="#" class="forgot-password">Şifremi Unuttum</a>
        </div>
  
        <!-- Additional Links -->
        <div class="additional-links">
          <a href="#">Üye Ol</a>
          <a href="#">Siparişi Takibi</a>
        </div>
      </div>
    </div>
  </template>
  
  <script lang="ts">
  import { defineComponent } from "vue";
  
  export default defineComponent({
    name: "AccountDropdown",
  });
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
  </style>
  