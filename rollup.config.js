import commonjs from 'rollup-plugin-commonjs';
import resolve from 'rollup-plugin-node-resolve';

export default {
    input: './src/index.js',
    output: {
        file: 'wind-tunnel.js',
        format: 'es'
    },
    external: ['p5beh'],
    plugins: [
        resolve(),
        commonjs()
    ]
};
