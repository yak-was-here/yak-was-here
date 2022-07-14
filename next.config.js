module.exports = {
	i18n: {
		locales: ["en"],
		defaultLocale: "en",
	},
	reactStrictMode: true,

	async redirects() {
		return [
			{
				source: "/projects",
				destination: "/work",
				permanent: true,
			},
			{
				source: "/projects/map-training",
				destination: "/work/map-training",
				permanent: true,
			},
			{
				source: "/projects/nah-son-free-pie-gaming",
				destination: "/work/nsfpgaming",
				permanent: true,
			},
			{
				source: "/projects/yourpbfriend",
				destination: "/work/yourpbfriend",
				permanent: true,
			},
			{
				source: "/projects/k9-web-protection-password-cracker",
				destination: "https://github.com/isaacyakl/k9wppc",
				permanent: true,
			},
		];
	},
};
