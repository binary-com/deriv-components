import path from 'path';
import { defineConfig } from 'vite';
import dts from 'vite-dts';

const isExternal = (id: string) => !id.startsWith('.') && !path.isAbsolute(id);

interface CSSModulesOptions {
    scopeBehaviour?: 'global' | 'local';
    globalModulePaths?: RegExp[];
    generateScopedName?: string | ((name: string, filename: string, css: string) => string);
    hashPrefix?: string;
    /**
     * default: null
     */
    localsConvention?: 'camelCase' | 'camelCaseOnly' | 'dashes' | 'dashesOnly' | null;
}

export default defineConfig(() => ({
    css: {
        postcss: {},
    },
    esbuild: {
        jsxInject: "import React from 'react'",
    },
    build: {
        lib: {
            entry: path.resolve(__dirname, 'src/index.tsx'),
            formats: ['es'],
        },
        rollupOptions: {
            external: isExternal,
        },
    },
    plugins: [dts()],
}));
