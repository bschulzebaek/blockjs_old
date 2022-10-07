import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import path from 'path';

export default defineConfig({
    server: {
        port: 3000,
    },
    plugins: [vue()],
    resolve: {
        extensions: ['.ts', '.vue'],
        alias: {
            '@': path.resolve(__dirname, './src'),
        }
    },
    build: {
        outDir: 'dist',
    },
    worker: {
        format: 'es'
    }
})