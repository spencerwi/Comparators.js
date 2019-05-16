import typescript from 'rollup-plugin-typescript2'

import pkg from './package.json'

export default {
    input: 'src/comparators.ts',
    output: [
        {
            dir: "dist/umd",
            format: 'umd',
            name: 'Comparators'
        },
    ],
    external: [
        ...Object.keys(pkg.dependencies || {}),
        ...Object.keys(pkg.peerDependencies || {}),
    ],

    plugins: [
        typescript({
            typescript: require('typescript'),
            tsconfig: "tsconfig.base.json",
            tsconfigOverride: {
                compilerOptions: {
                    declaration: true,
                    inlineSources: false // unfortunately, rollup-plugin-tyescript2 doesn't do inline source maps
                }
            }
        }),
    ],
}
