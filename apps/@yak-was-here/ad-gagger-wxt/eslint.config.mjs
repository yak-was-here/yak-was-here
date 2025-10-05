import baseConfig from '../../../eslint.config.mjs';
import autoImports from './.wxt/eslint-auto-imports.mjs';

export default [
    ...baseConfig,
    autoImports,
    {
        files: ['**/*.ts', '**/*.tsx', '**/*.js', '**/*.jsx'],
        settings: {
            'import/resolver': {
                typescript: {
                    alwaysTryTypes: true,
                    project: './tsconfig.json',
                },
            },
        },
        rules: {
            'import/no-unresolved': [
                'error',
                {
                    ignore: ['^@/', '^/'],
                },
            ],
        },
    },
];
