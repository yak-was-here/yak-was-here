import baseConfig from '../../eslint.config.mjs';
import autoImports from './.wxt/eslint-auto-imports.mjs';

export default [autoImports, ...baseConfig];
