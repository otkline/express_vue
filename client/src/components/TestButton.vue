<template>
  <button @click="test" class="test-button">取得TEST</button>
</template>

<script lang="ts" setup>
import api from '../api'
import { useToast } from 'vue-toast-notification'

const toast = useToast()

const test = async () => {
  try {
    const response = await api.get('/user/me')
    console.log(response)
  } catch(err: any) {
    toast.error(err.message)
  }
}
</script>

<style scoped>
.test-button {
  background-color: #35d9e5;
  color: rgba(255, 255, 255, 0.699);
  padding: 8px 16px;
  border: none;
  border-radius: 6px;
  font-weight: bold;
  cursor: pointer;
  transition: background-color 0.2s ease;
}

.test-button:hover {
  background-color: #2aadb6;   /* ホバー時に少し濃く */
}
</style>
