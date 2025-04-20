<template>
  <div class="signup">
    <h2>新規登録</h2>
    <form @submit.prevent="handleSignUp" class="form">
      <div class="form-group">
        <label for="name">名前:</label>
        <input type="text" id="name" v-model="name" placeholder="名前を入力" required />
      </div>
      <div class="form-group">
        <label for="email">メールアドレス:</label>
        <input type="email" id="email" v-model="email" placeholder="メールアドレスを入力" required />
      </div>
      <div class="form-group">
        <label for="password">パスワード:</label>
        <input type="password" id="password" v-model="password" placeholder="パスワードを入力" maxlength="10" required />
      </div>
      <div class="form-group">
        <button type="submit" class="submit-btn">登録</button>
      </div>
    </form>
    <p class="redirect-link">アカウントをお持ちですか？ <router-link to="/login">ログイン</router-link></p>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import axios from 'axios'
import { useRouter } from 'vue-router'
import { useToast } from 'vue-toast-notification'

const router = useRouter()
const toast = useToast()

const name = ref('')
const email = ref('')
const password = ref('')

const handleSignUp = async () => {
  // サーバーに新規登録リクエストを送る
try {
    const response = await axios.post('/auth/register', {
        name: name.value,
        email: email.value,
        password: password.value
    })
    toast.success('登録完了！')
    router.push('/login')
} catch (err: any) {
    toast.error('登録に失敗しました。')
    console.error('ユーザ登録失敗:', err)
}
}
</script>

<style scoped>
.signup {
  max-width: 450px;
  margin: 0 auto;
  padding: 20px;
  background-color: #f9f9f9;
  border-radius: 8px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
}

h2 {
  text-align: center;
  color: #333;
  font-size: 1.5rem;
  margin-bottom: 20px;
}

.form {
  display: flex;
  flex-direction: column;
}

.form-group {
  margin-bottom: 20px;
}

label {
  font-size: 1rem;
  color: #555;
  margin-bottom: 8px;
  display: block;
}

input {
  width: 100%;
  padding: 12px;
  border-radius: 4px;
  border: 1px solid #ccc;
  font-size: 1rem;
  background-color: #fff;
  transition: border 0.3s ease-in-out;
}

input:focus {
  border-color: #007bff;
  outline: none;
}

.submit-btn {
  padding: 12px 20px;
  border-radius: 4px;
  background-color: #007bff;
  color: white;
  font-size: 1.1rem;
  border: none;
  cursor: pointer;
  transition: background-color 0.3s ease-in-out;
}

.submit-btn:hover {
  background-color: #0056b3;
}

.redirect-link {
  text-align: center;
  margin-top: 20px;
  font-size: 0.9rem;
}

.redirect-link a {
  color: #007bff;
  text-decoration: none;
}

.redirect-link a:hover {
  text-decoration: underline;
}
</style>
