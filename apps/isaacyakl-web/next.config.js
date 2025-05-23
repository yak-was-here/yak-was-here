//@ts-check

// eslint-disable-next-line @typescript-eslint/no-var-requires
const { composePlugins, withNx } = require('@nx/next');

/**
 * @type {import('@nx/next/plugins/with-nx').WithNxOptions}
 **/
const nextConfig = {
    // Use this to set Nx-specific options
    // See: https://nx.dev/recipes/next/next-config-setup
    nx: {},
    i18n: {
		locales: ["en"],
		defaultLocale: "en",
	},
	reactStrictMode: true,

	async redirects() {
		return [
			{
				source: "/index.html",
				destination: "/",
				permanent: true,
			},
			{
				source: "/projects.html",
				destination: "/work",
				permanent: true,
			},
			{
				source: "/500.html",
				destination: "/500",
				permanent: true,
			},
			{
				source: "/projects/nah-son-free-pie-gaming",
				destination: "/work/nsfpgaming",
				permanent: true,
			},
			{
				source: "/projects/nah-son-free-pie-gaming/:slug*",
				destination: "/work/nsfpgaming",
				permanent: true,
			},
			{
				source: "/projects/alive-in-christ-apparel",
				destination: "/work/aic",
				permanent: true,
			},
			{
				source: "/projects/alive-in-christ-apparel/:slug*",
				destination: "/work/aic",
				permanent: true,
			},
			{
				source: "/work/alive-in-christ-apparel",
				destination: "/work/aic",
				permanent: true,
			},
			{
				source: "/work/aic",
				destination: "/work/alive-in-christ",
				permanent: true,
			},
			{
				source: "/projects/map-training/:slug*",
				destination: "/work/map-training",
				permanent: true,
			},
			{
				source: "/projects/k9-web-protection-password-cracker",
				destination: "https://github.com/isaacyakl/k9wppc",
				permanent: true,
			},
			{
				source: "/projects/k9-web-protection-password-cracker/main.cpp",
				destination: "https://github.com/isaacyakl/k9wppc/blob/master/main.cpp",
				permanent: true,
			},
			{
				source: "/projects/k9-web-protection-password-cracker/K9%20Web%20Protection%20Password%20Cracker.exe",
				destination: "https://github.com/isaacyakl/k9wppc/blob/master/K9%20Web%20Protection%20Password%20Cracker.zip",
				permanent: true,
			},
			{
				source: "/projects/k9-web-protection-password-cracker/K9%20Web%20Protection%20Password%20Cracker.zip",
				destination: "https://github.com/isaacyakl/k9wppc/blob/master/K9%20Web%20Protection%20Password%20Cracker.zip",
				permanent: true,
			},
			{
				source: "/projects/k9-web-protection-password-cracker/:slug*",
				destination: "https://github.com/isaacyakl/k9wppc",
				permanent: true,
			},
			{
				source: "/projects/k9wppc",
				destination: "https://github.com/isaacyakl/k9wppc",
				permanent: true,
			},
			{
				source: "/projects/yourpbfriend/:slug*",
				destination: "/work/yourpbfriend",
				permanent: true,
			},
			{
				source: "/projects/:project",
				destination: "/work/:project",
				permanent: true,
			},
		];
	},
};

const plugins = [
    // Add more Next.js plugins to this list if needed.
    withNx,
];

module.exports = composePlugins(...plugins)(nextConfig);
