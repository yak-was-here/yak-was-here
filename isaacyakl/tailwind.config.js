/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ["./pages/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
	theme: {
		extend: {
			colors: {
				"yak-green": "#03c03c",
				"yak-green-hover": "#048a2c",
				"yak-cyan": "#0dd1d1",
				"yak-magenta": "#9f00c5",
			},
			fontFamily: {
				"resume-body": ["Arial", "Helvetica", "sans-serif"],
			},
		},
	},
	plugins: [],
};
