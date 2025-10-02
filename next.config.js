/** @type {import('next').NextConfig} */
const nextConfig = {
	experimental: {
		appDir: true,
	},
	images: {
		domains: ["localhost"],
	},
	async rewrites() {
		return [
			{
				source: "/traditional/:path*",
				destination: "http://localhost:8000/:path*",
			},
		];
	},
};

module.exports = nextConfig;
