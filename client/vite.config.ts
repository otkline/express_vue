import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  plugins: [vue()],
  server: {
    host: true,
    port: 5173,
    proxy: {
      // ブラウザから /auth/* に来たリクエストを
      // 内部で Docker ネットワーク名 server:3000 に転送する
      '/auth': {
        target: 'http://server:3000',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/auth/, '/auth'),
      },
    },
    watch: {
      usePolling: true, /* ファイルの変更をリアルタイムに監視し画面更新 */
    },
  },
  resolve: {
    alias: {
      '@': '/src'
    }
  },
})
