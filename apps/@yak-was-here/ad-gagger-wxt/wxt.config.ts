import { defineConfig } from 'wxt';
import tailwindcss from '@tailwindcss/vite';

// See https://wxt.dev/api/config.html
export default defineConfig({
    modules: [
        '@wxt-dev/module-react',
        '@wxt-dev/auto-icons', // https://www.npmjs.com/package/@wxt-dev/auto-icons
    ],
    vite: () => ({
        plugins: [tailwindcss()],
    }),
    manifest: {
        name: 'Ad Gagger',
        permissions: ['storage'],
    },
    imports: {
        eslintrc: {
            enabled: 9,
        },
    },
    webExt: {
        binaries: {
            brave: 'C:\\Program Files\\BraveSoftware\\Brave-Browser\\Application\\brave.exe',
            braveUser: `${process.env.USERPROFILE}\\AppData\\Local\\BraveSoftware\\Brave-Browser\\Application\\brave.exe`,
        },
        openConsole: true,
        openDevtools: true,
        startUrls: ['https://www.twitch.tv/caseoh_'],
    },
});
