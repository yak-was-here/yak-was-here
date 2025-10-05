import { defineConfig } from 'wxt';

// See https://wxt.dev/api/config.html
export default defineConfig({
    modules: [
        '@wxt-dev/module-react',
        '@wxt-dev/auto-icons', // https://www.npmjs.com/package/@wxt-dev/auto-icons
    ],
    manifest: {
        name: 'Ad Gagger',
        permissions: ['storage'],
        host_permissions: ['<all_urls>'],
    },
    imports: {
        eslintrc: {
            enabled: 9,
        },
    },
});
