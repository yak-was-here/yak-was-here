# Ad Gagger

Automatically mute and skip Twitch ads.

## TODO

- [ ] Skip the new "Using ad blocker?" message that Twitch shows
- [ ] Mute ad and unmute "mini-player" version of stream when an ad is running
- [ ] Support YouTube.com
- [ ] Support Amazon Prime Video
- [ ] Support Netflix
- [ ] Add stats that sync between browsers in chrome.storage.sync
  - [ ] Ads muted per platform
  - [ ] Ads skipped per platform

## Development

For best DX, develop in Windows so that the extension can launch in browser with HMR.

Do not install `package.json` found in this directory. Instead, make sure that the following packages (React specific) are added to the top-level `package.json` for the mono-repo:

```sh
npm i -D wxt typescript @types/react @types/react-dom @wxt-dev/module-react
```

```sh
npm i react react-dom
```
