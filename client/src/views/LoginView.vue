<template>
  <div class="login-view">
    <h1>ログイン</h1>
    <form @submit.prevent="handleLogin" class="form">
      <div class="form-group">
        <label for="email">メールアドレス:</label>
        <input type="email" id="email" v-model="email" placeholder="メールアドレスを入力" required />
      </div>
      <div class="form-group">
        <label for="password">パスワード:</label>
        <input type="password" id="password" v-model="password" placeholder="パスワードを入力" required />
      </div>
      <div class="form-group">
        <button type="submit" class="submit-btn">ログイン</button>
      </div>
      <p class="redirect-link">アカウントをお持ちでない方は <router-link to="/signup">新規登録</router-link></p>
    </form>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import axios from 'axios'
import { useRouter } from 'vue-router'
import { useToast } from 'vue-toast-notification'

const email = ref('')
const password = ref('')
const router = useRouter()
const toast = useToast()

const handleLogin = async () => {
  try {
    const response = await axios.post('/auth/login', {
      email: email.value,
      password: password.value
    })

    router.push('/')
  } catch (err: any) {
    toast.error('ログイン失敗')
  }
}
</script>

<style scoped>
.login-view {
  max-width: 450px;
  margin: 0 auto;
  padding: 2rem;
  background-color: #f9f9f9;
  border-radius: 8px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
}

h1 {
  text-align: center;
  font-size: 1.6rem;
  margin-bottom: 1.5rem;
  color: #333;
}

.form {
  display: flex;
  flex-direction: column;
}

.form-group {
  margin-bottom: 1.2rem;
}

label {
  display: block;
  margin-bottom: 0.5rem;
  color: #555;
  font-size: 1rem;
}

input {
  width: 100%;
  padding: 0.75rem;
  font-size: 1rem;
  border: 1px solid #ccc;
  border-radius: 4px;
  transition: border 0.2s;
}

input:focus {
  border-color: #007bff;
  outline: none;
}

.submit-btn {
  background-color: #007bff;
  color: white;
  padding: 0.75rem;
  font-size: 1.1rem;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s ease-in-out;
}

.submit-btn:hover {
  background-color: #0056b3;
}

.error {
  color: red;
  font-size: 0.95rem;
  margin-top: 0.5rem;
  text-align: center;
}

.redirect-link {
  text-align: center;
  margin-top: 1.5rem;
  font-size: 0.95rem;
}

.redirect-link a {
  color: #007bff;
  text-decoration: none;
}

.redirect-link a:hover {
  text-decoration: underline;
}
</style>
