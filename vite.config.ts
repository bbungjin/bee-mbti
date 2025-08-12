import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  // GitHub Pages 하위 경로 배포 시 정적 자산 경로 보정
  base: '/bee-mbti/',
  plugins: [react()],
})
