import babel from '@rollup/plugin-babel';
import localResolve from "rollup-plugin-local-resolve";
import copy from 'rollup-plugin-copy';

const config = [{
    input: 'src/client/public/js/app.js',
    output: {
        dir: 'dist/client/public/js',
        format: 'iife'
    }
},
{
    input: 'src/server/app.js',
    output: {
        dir: 'dist/server',
        format: 'cjs'
    },
    plugins: [localResolve(),
    babel({ babelHelpers: 'bundled' }),
    copy({
        targets: [
            { src: 'src/client/public/css', dest: 'dist/client/public' },
            { src: 'src/client/public/images', dest: 'dist/client/public' },
            { src: 'src/client/views', dest: 'dist/client' },
        ]
    })]
}];

export default config;