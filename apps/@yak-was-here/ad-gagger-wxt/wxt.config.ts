import { defineConfig } from 'wxt';
import packageJson from './package.json';

// See https://wxt.dev/api/config.html
export default defineConfig({
    modules: ['@wxt-dev/module-react'],
    manifest: {
        name: "Ad Gagger",
        description: packageJson.description,
        version: packageJson.version,
        permissions: ['storage'],
        host_permissions: ['<all_urls>'],
    },
    imports: {
        eslintrc: {
            enabled: 9,
        },
    },
});
