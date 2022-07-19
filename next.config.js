module.exports = {
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
				source: "/projects/nah-son-free-pie-gaming",
				destination: "/work/nsfpgaming",
				permanent: true,
			},
			{
				source: "/projects/alive-in-christ-apparel",
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
				source: "/projects/k9-web-protection-password-cracker",
				destination: "https://github.com/isaacyakl/k9wppc",
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
