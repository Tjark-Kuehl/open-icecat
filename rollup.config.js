import typescriptPlugin from 'rollup-plugin-typescript2';
import clearPlugin from 'rollup-plugin-clear';
import filesizePlugin from 'rollup-plugin-filesize';
import { terser as terserPlugin } from 'rollup-plugin-terser';

import pkg from './package.json';

const outputDir = 'dist';

export default {
    input: 'src/index.ts',
    output: [
        {
            file: `${outputDir}/index.js`,
            format: 'cjs'
        },
        {
            file: `${outputDir}/index.es.js`,
            format: 'esm'
        },
        {
            name: 'OpenIcecat',
            file: `${outputDir}/index.umd.js`,
            format: 'umd'
        }
    ],
    external: [...Object.keys(pkg.dependencies || {}), ...Object.keys(pkg.peerDependencies || {})],
    plugins: [
        clearPlugin({
            targets: [outputDir],
            watch: true
        }),
        typescriptPlugin({
            typescript: require('typescript')
        }),
        terserPlugin(),
        filesizePlugin({
            showBrotliSize: true
        })
    ]
};
