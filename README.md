# yak-was-here

A monorepo of my personal websites and tools.

## [yak-was-here.com](https://www.yak-was-here.com)

[`apps/yak-was-here-web`](./apps/yak-was-here-web/)
[`apps/yak-was-here-web-e2e`](./apps/yak-was-here-web-e2e/)

My personal website created with NextJS and shadcn/ui. [Read more...](https://www.yak-was-here.com/article/personal-website)

## Yaku

[`library/@yak-was-here/yaku`](./library/@yak-was-here/yaku/)

My UI component library.

## Ad Gagger

[`apps/@yak-was-here/ad-gagger-wxt`](./apps/@yak-was-here/ad-gagger-wxt/)

Automatically mute and skip video ads on YouTube, Twitch, and any website you configure.

## [isaacyakl.com](https://www.isaacyakl.com)

[`apps/isaacyakl-web`](./apps/isaacyakl-web/)

An old version of my personal website created with NextJS without a component library. Originally, this was an experiment in using CSS relative viewport units (REM) for element sizing and layouts in lieu of media queries and breakpoints so that it would only need a single-layout. However, after testing, I learned — though not impossible — it does pose many challenges. [Read more...](https://www.isaacyakl.com/work/isaacyakl-com)

## To-Do

- Update resume
- Grab tagline from Twitter
- Use an icon library
- Add code highlighter
- yak's Thoughts (Blog Articles)
  - Add GitHub action to published articles
  - Create automatic "TOC" from article headings
  - Add automatic heading anchors with copy to clipboard button
  - Add automatic campaign URL generation
- Add sitemap generator

## Development

### Setup

Install nvm or [nvm-windows](https://github.com/coreybutler/nvm-windows) if necessary and restart editor and terminal(s).

Install packages:

```sh
npm i
```

### Updating packages

Update a specific package:

```sh
./nx migrate <package-name>@<version>
```

Update all packages:

```sh
# Updates the versions of the relevant packages in the package.json file
# Generates a migrations.json if there are pending migrations
./nx migrate latest
```

References:

- [nx migrate Command](https://nx.dev/docs/reference/nx-commands#nx-migrate)
- [Automate Updating Dependencies](https://nx.dev/features/automate-updating-dependencies)
- [Advanced Update Process](https://nx.dev/docs/guides/tips-n-tricks/advanced-update)

### Troubleshooting

#### Nx command not found

If `nx` commands fails to find the command, make 
sure to do:

```sh
./nx <command>
# OR
npx nx <command>
```

#### Nx general error or cannot find module error

Try the below and attempt installing the packages again after.

```sh
# Remove nx data
rm -rf .nx/cache/ .nx/installation/ ./nx/workspace-data

# Remove node_modules
rm -rf node_modules/
```
