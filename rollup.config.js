import typescriptPlugin from 'rollup-plugin-typescript2';
import clearPlugin from 'rollup-plugin-clear';
import filesizePlugin from 'rollup-plugin-filesize';
import { terser as terserPlugin } from 'rollup-plugin-terser';
import gzipPlugin from 'rollup-plugin-gzip';

import pkg from './package.json';

const outputDir = 'dist';
const globals = {
    ky: 'ky',
    'ky-universal': 'ky'
}

export default {
    input: 'src/index.ts',
    output: [
        {
            file: `${outputDir}/index.js`,
            format: 'cjs',
            globals
        },
        {
            file: `${outputDir}/index.es.js`,
            format: 'esm',
            globals
        },
        {
            name: 'OpenIcecat',
            file: `${outputDir}/index.umd.js`,
            format: 'umd',
            globals
        }
    ],
    external: Object.keys(pkg.dependencies || {}),
    plugins: [
        clearPlugin({
            targets: [outputDir],
            watch: true
        }),
        typescriptPlugin({
            typescript: require('typescript')
        }),
        terserPlugin(),
        filesizePlugin(),
        gzipPlugin()
    ]
};
