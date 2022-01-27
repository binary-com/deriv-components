import path from 'path';
import { defineConfig } from 'vite';
import sassDts from 'vite-plugin-sass-dts';
import dts from 'vite-dts';
import react from '@vitejs/plugin-react';
import reactRefresh from '@vitejs/plugin-react-refresh';

const isExternal = (id: string) => !id.startsWith('.') && !path.isAbsolute(id);

export default defineConfig(() => ({
    build: {
        lib: {
            entry: path.resolve(__dirname, 'src/index.tsx'),
            formats: ['es'],
        },
        rollupOptions: {
            external: isExternal,
        },
    },
    plugins: [
        dts(),
        react({
            include: '**/*.tsx',
        }),
        reactRefresh({
            include: '**/*.tsx',
        }),
        sassDts({
            allGenerate: true,
        }),
    ],
}));
