export default defineContentScript({
    matches: ['*://*.twitch.tv/*'],
    main() {
        console.log('ad-gagger: Hello twitch.tv content.');
    },
});
