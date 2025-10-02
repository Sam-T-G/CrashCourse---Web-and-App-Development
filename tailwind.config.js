/** @type {import('tailwindcss').Config} */
module.exports = {
	content: [
		"./pages/**/*.{js,ts,jsx,tsx,mdx}",
		"./components/**/*.{js,ts,jsx,tsx,mdx}",
		"./app/**/*.{js,ts,jsx,tsx,mdx}",
	],
	theme: {
		extend: {
			animation: {
				"fade-in-up": "fadeInUp 0.6s ease-out",
				"slide-in-right": "slideInRight 0.6s ease-out",
				"pulse-slow": "pulse 2s infinite",
			},
			keyframes: {
				fadeInUp: {
					"0%": {
						opacity: "0",
						transform: "translateY(30px)",
					},
					"100%": {
						opacity: "1",
						transform: "translateY(0)",
					},
				},
				slideInRight: {
					"0%": {
						opacity: "0",
						transform: "translateX(30px)",
					},
					"100%": {
						opacity: "1",
						transform: "translateX(0)",
					},
				},
			},
			backgroundImage: {
				"gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
				"gradient-conic":
					"conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
				"gradient-modern": "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
				"gradient-modern-2":
					"linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
				"gradient-modern-3":
					"linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)",
			},
		},
	},
	plugins: [],
};
