import { useAppConfig } from '#imports';

export default defineContentScript({
    matches: ['*://*.twitch.tv/*'],
    main() {
        const { theme } = useAppConfig();
        console.log('ad-gagger: Hello twitch.tv content.');
        console.log(`ad-gagger: theme: ${theme}`);
    },
});
