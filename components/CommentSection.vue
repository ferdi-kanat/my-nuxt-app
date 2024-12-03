<template>
    <div class="comment-section">
      <h2>Yorumlar ve Değerlendirmeler</h2>
      
      <!-- Comment List -->
      <div v-if="comments.length > 0" class="comments-list">
        <div v-for="(comment, index) in comments" :key="index" class="comment-item">
          <div class="comment-header">
            <strong>{{ comment.name }}</strong>
            <span class="stars">{{ '★'.repeat(comment.rating) }}{{ '☆'.repeat(5 - comment.rating) }}</span>
          </div>
          <p class="comment-text">{{ comment.text }}</p>
        </div>
      </div>
      <p v-else>Henüz yorum yapılmamış. İlk yorumu siz yapın!</p>
  
      <!-- Comment Form -->
      <div class="comment-form">
        <h3>Yorum Yaz</h3>
        <input v-model="newComment.name" type="text" placeholder="Adınız" />
        <textarea v-model="newComment.text" placeholder="Yorumunuz"></textarea>
        <div class="rating-input">
          <label>Değerlendirme:</label>
          <select v-model.number="newComment.rating">
            <option :value="0">0</option>
            <option :value="1">1</option>
            <option :value="2">2</option>
            <option :value="3">3</option>
            <option :value="4">4</option>
            <option :value="5">5</option>
          </select>
        </div>
        <button @click="addComment" :disabled="!isFormValid">Yorumu Ekle</button>
      </div>
    </div>
  </template>
  
  <script lang="ts">
  import { defineComponent, ref, computed } from 'vue';
  
  export default defineComponent({
    name: 'CommentSection',
    setup() {
      const comments = ref([
        { name: 'Ali', text: 'Harika bir ürün, çok memnun kaldım!', rating: 5 },
        { name: 'Ayşe', text: 'Fiyatına göre gayet başarılı.', rating: 4 },
      ]);
  
      const newComment = ref({
        name: '',
        text: '',
        rating: 0,
      });
  
      const isFormValid = computed(() => {
        return newComment.value.name && newComment.value.text && newComment.value.rating > 0;
      });
  
      const addComment = () => {
        comments.value.push({ ...newComment.value });
        newComment.value.name = '';
        newComment.value.text = '';
        newComment.value.rating = 0;
      };
  
      return {
        comments,
        newComment,
        isFormValid,
        addComment,
      };
    },
  });
  </script>
  
  <style scoped>
  .comment-section {
    border: 1px solid #ddd;
    border-radius: 8px;
    padding: 16px;
    max-width: 500px;
    margin: 0 auto;
  }
  .comments-list {
    margin-bottom: 16px;
  }
  .comment-item {
    padding: 8px;
    border-bottom: 1px solid #eee;
  }
  .comment-header {
    display: flex;
    justify-content: space-between;
    margin-bottom: 4px;
  }
  .stars {
    color: #FFD700;
    font-size: 14px;
  }
  .comment-text {
    font-size: 14px;
    color: #555;
  }
  .comment-form input,
  .comment-form textarea,
  .comment-form select {
    width: 100%;
    margin-bottom: 8px;
    padding: 8px;
    border: 1px solid #ddd;
    border-radius: 4px;
  }
  .comment-form button {
    width: 100%;
    padding: 10px;
    background-color: #007BFF;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
  }
  .comment-form button:disabled {
    background-color: #ccc;
    cursor: not-allowed;
  }
  </style>
  