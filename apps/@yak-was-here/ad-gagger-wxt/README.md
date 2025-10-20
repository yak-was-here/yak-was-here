# Ad Gagger

Automatically mute and skip Twitch ads.

## TODO

- [X] Skip the new "Using ad blocker?" message that Twitch shows
- [X] Fix eslint errors
- [X] Support multiple site configurations matches for the same URL
- [ ] Mute ad and unmute "mini-player" version of stream when an ad is running
- [ ] Support YouTube.com
- [ ] Support Amazon Prime Video
- [ ] Support Netflix
- [ ] Add stats that sync between browsers in chrome.storage.sync
  - [ ] Ads muted per platform
  - [ ] Ads skipped per platform

## Development Setup

> Reference example: [https://github.com/wxt-dev/examples/tree/main/examples/react-shadcn](https://github.com/wxt-dev/examples/tree/main/examples/react-shadcn)

Develop in Windows so that the extension can launch in browser with HMR.

Refer to [nvm setup](../../../README.md).

```sh
# Install packages
npm i
```
