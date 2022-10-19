/// <reference types="vitest" />
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import path from 'path';

const ROOT_DIR = process.env.VITEST ? path.resolve(__dirname) : path.resolve(__dirname, './src/scenes');

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
    root: ROOT_DIR,
    
    publicDir: path.resolve(__dirname, './src/scenes/__public'),
    build: {
        emptyOutDir: true,
        rollupOptions: {
            input: {
                'index.html': path.resolve(__dirname, './src/scenes/index.html'),
                'pages.html': path.resolve(__dirname, './src/scenes/pages.html'),
                'world-generation.html': path.resolve(__dirname, './src/scenes/world-generation.html'),
            },
        },
        outDir: path.resolve(__dirname, './dist'),
    },
    worker: {
        format: 'es',
    },
    test: {
        environment: 'jsdom',
        include: [
            'test/unit/**',
        ],
        coverage: {
            all: true,
            skipFull: true,
        },
    },
})