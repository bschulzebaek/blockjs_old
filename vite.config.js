import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

export default defineConfig({
    plugins: [vue()],
    resolve: {
        extensions: ['.ts', '.vue'],
    },
    build: {
        outDir: 'dist',
    },
})