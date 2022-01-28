import path from 'path';
import { defineConfig } from 'vite';
import dts from 'vite-dts';
import react from '@vitejs/plugin-react';

const isExternal = (id: string) => (!id.startsWith('.') && !path.isAbsolute(id)) || id.endsWith('.md');

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
    ],
}));
