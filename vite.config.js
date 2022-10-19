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
                'index': path.resolve(__dirname, './src/scenes/index.html'),
                'main.html': path.resolve(__dirname, './src/scenes/main.html'),
                'world-generation.html': path.resolve(__dirname, './src/scenes/world-generation.html'),
            },
        },
        outDir: path.resolve(__dirname, './dist'),
    },
    worker: {
        format: 'es',
    },
    test: {
        include: [
            'test/unit/**',
        ],
        coverage: {
            all: true,
            skipFull: true,
        },
    },
})