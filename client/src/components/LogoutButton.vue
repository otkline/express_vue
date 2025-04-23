<template>
  <button @click="logout" class="logout-button">ログアウト</button>
</template>
  
<script lang="ts" setup>
import api from '../api'
import { useRouter } from 'vue-router'
  
const router = useRouter()

const logout = async () => {
  try {
    await api.post('/auth/logout', {})
    router.push('/login')
  } catch (error) {
    console.error('ログアウト失敗:', error)
  }
}
</script>

<style scoped>
.logout-button {
  background-color: #e53935;
  color: white;
  padding: 8px 16px;
  border: none;
  border-radius: 6px;
  font-weight: bold;
  cursor: pointer;
  transition: background-color 0.2s ease;
}

.logout-button:hover {
  background-color: #c62828;   /* ホバー時に少し濃く */
}
</style>
