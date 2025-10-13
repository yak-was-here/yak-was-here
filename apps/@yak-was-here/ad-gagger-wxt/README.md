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

Install [nvm-windows](https://github.com/coreybutler/nvm-windows/releases) and make sure to leave the "Open with PowerShell" option checked so that it updates the environment variables after installation. Then make sure to fully restart the editor + terminal(s) after installation.

Navigate to the monorepo root directory to use the correct version of node + npm:

```sh
# See what version of Node needs to be installed
cat .nvmrc
```

```sh
# Install and use the version from above
nvm install 22 && nvm use 22
```

Install the monorepo's packages. All packages for this project should already be included in the root `package.json` of the monorepo. <u>Do not install `package.json` found in this directory.</u> Navigate to the repo's root dir and run:

```sh
# Install monorepo packages
npm i
```

## Packages Used

The following packages (React specific) are used by this project and should be in the top-level `package.json` of the monorepo.

```sh
npm i -D wxt typescript @types/react @types/react-dom @wxt-dev/module-react
```

```sh
npm i react react-dom @webext-core/messaging
```
