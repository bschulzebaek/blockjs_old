/// <reference types="vitest" />
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
        },
    },
    build: {
        rollupOptions: {
            input: {
                index: path.resolve(__dirname, './index.html'),
                main: path.resolve(__dirname, './scenes/main/index.html'),
                worldGeneration: path.resolve(__dirname, './scenes/world-generation/index.html'),
            }
        },
        outDir: 'dist',
    },
    worker: {
        format: 'es',
    },
    test: {
        include: ['test/unit/**'],
        coverage: {
            all: true,
            skipFull: true,
        },
    },
})