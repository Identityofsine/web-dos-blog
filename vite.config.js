import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base:'https://identityofsine.github.io/web-dos-blog/',
  assetsInclude: ['**/*.png', '**/*.jpg', '**/*.jpeg', '**/*.gif', '**/*.svg'],
	server: {
		proxy: {
			"/api": {
				target: "http://localhost:1337",
				changeOrigin: false,
				secure: false,
			},
		}
	}
})
