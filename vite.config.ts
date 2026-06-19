import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import dts from 'vite-plugin-dts';
import { resolve } from 'path';

export default defineConfig({
    plugins: [
        tailwindcss(),
        react(),
        dts({
            include: ['src'],
            outDir: 'dist',
            rollupTypes: true,
        }),
    ],
    build: {
        lib: {
            entry: resolve(__dirname, 'src/index.ts'),
            name: 'SchemaFormsUI',
            formats: ['es', 'cjs'],
            fileName: (format) => format === 'cjs' ? 'index.cjs' : 'index.js',
        },
        rollupOptions: {
            external: [
                'react',
                'react/jsx-runtime',
                'react-dom',
                'lucide-react',
                '@schema-forms-data/templates',
            ],
            output: {
                globals: {
                    react: 'React',
                    'react/jsx-runtime': 'ReactJSXRuntime',
                    'react-dom': 'ReactDOM',
                    'lucide-react': 'LucideReact',
                    '@schema-forms-data/templates': 'SchemaFormsTemplates',
                },
                assetFileNames: (assetInfo) => {
                    const name = assetInfo.names?.[0] ?? '';
                    return name.endsWith('.css') ? 'style.css' : name;
                },
            },
        },
        sourcemap: true,
        minify: false,
    },
});
