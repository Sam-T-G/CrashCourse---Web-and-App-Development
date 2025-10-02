"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Code, Zap, Globe, Rocket } from "lucide-react";

export default function Home() {
	const [activeDemo, setActiveDemo] = useState<string | null>(null);

	const demos = [
		{
			id: "modern-dashboard",
			title: "Modern Dashboard",
			description: "Complete React + Next.js + Tailwind dashboard",
			url: "/modern-dashboard",
			icon: <Rocket className="w-8 h-8" />,
			color: "from-blue-500 to-purple-600",
		},
		{
			id: "framework-comparison",
			title: "Framework Comparison",
			description: "Side-by-side traditional vs modern approaches",
			url: "/framework-comparison",
			icon: <Code className="w-8 h-8" />,
			color: "from-green-500 to-blue-600",
		},
		{
			id: "performance-demo",
			title: "Performance Demo",
			description: "Real-time performance metrics and comparisons",
			url: "/performance-demo",
			icon: <Zap className="w-8 h-8" />,
			color: "from-orange-500 to-red-600",
		},
		{
			id: "production-example",
			title: "Production Example",
			description: "Enterprise-grade React + TypeScript implementation",
			url: "/production-example",
			icon: <Rocket className="w-8 h-8" />,
			color: "from-indigo-500 to-purple-600",
		},
		{
			id: "traditional-demos",
			title: "Traditional Demos",
			description: "View traditional HTML/CSS/JS implementations",
			url: "http://localhost:8000",
			icon: <Globe className="w-8 h-8" />,
			color: "from-gray-500 to-gray-700",
			external: true,
		},
	];

	return (
		<div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
			{/* Header */}
			<header className="bg-gradient-modern text-white shadow-lg">
				<div className="container mx-auto px-6 py-12">
					<motion.div
						initial={{ opacity: 0, y: 30 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.6 }}
						className="text-center">
						<h1 className="text-5xl font-bold mb-4">
							🚀 Crash Course in Web & App Development
						</h1>
						<p className="text-xl opacity-90 mb-8">
							Experience the power of modern frameworks with live development
							servers
						</p>
						<div className="glass rounded-lg p-6 max-w-2xl mx-auto">
							<h2 className="text-2xl font-semibold mb-4">
								Modern vs Traditional
							</h2>
							<div className="grid grid-cols-2 gap-4 text-sm">
								<div>
									<h3 className="font-semibold text-green-300 mb-2">
										Modern Stack
									</h3>
									<ul className="space-y-1 opacity-90">
										<li>✅ React + Next.js</li>
										<li>✅ Tailwind CSS</li>
										<li>✅ TypeScript</li>
										<li>✅ Hot Reloading</li>
									</ul>
								</div>
								<div>
									<h3 className="font-semibold text-red-300 mb-2">
										Traditional Stack
									</h3>
									<ul className="space-y-1 opacity-90">
										<li>❌ Vanilla HTML/CSS/JS</li>
										<li>❌ Manual DOM manipulation</li>
										<li>❌ No type safety</li>
										<li>❌ Manual refresh</li>
									</ul>
								</div>
							</div>
						</div>
					</motion.div>
				</div>
			</header>

			{/* Main Content */}
			<main className="container mx-auto px-6 py-12">
				<motion.div
					initial={{ opacity: 0, y: 30 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.6, delay: 0.2 }}
					className="text-center mb-12">
					<h2 className="text-3xl font-bold text-gray-800 mb-4">
						🎮 Interactive Demos
					</h2>
					<p className="text-lg text-gray-600 max-w-3xl mx-auto">
						Click on any demo below to experience modern framework benefits with
						live development servers, hot reloading, and real-time code editing
						capabilities.
					</p>
				</motion.div>

				{/* Demo Grid */}
				<div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
					{demos.map((demo, index) => (
						<motion.div
							key={demo.id}
							initial={{ opacity: 0, y: 30 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.6, delay: 0.3 + index * 0.1 }}
							className="group">
							<div
								className={`bg-gradient-to-br ${demo.color} rounded-xl shadow-lg p-8 text-white cursor-pointer transform transition-all duration-300 hover:scale-105 hover:shadow-2xl`}
								onClick={() => {
									if (demo.external) {
										window.open(demo.url, "_blank");
									} else {
										setActiveDemo(demo.id);
										// Navigate to demo
										window.location.href = demo.url;
									}
								}}>
								<div className="flex items-center justify-between mb-4">
									<div className="p-3 bg-white bg-opacity-20 rounded-lg">
										{demo.icon}
									</div>
									<ArrowRight className="w-6 h-6 opacity-0 group-hover:opacity-100 transition-opacity" />
								</div>
								<h3 className="text-2xl font-bold mb-2">{demo.title}</h3>
								<p className="opacity-90 mb-4">{demo.description}</p>
								<div className="flex items-center text-sm opacity-75">
									{demo.external ? (
										<>
											<Globe className="w-4 h-4 mr-2" />
											External Link
										</>
									) : (
										<>
											<Zap className="w-4 h-4 mr-2" />
											Live Development Server
										</>
									)}
								</div>
							</div>
						</motion.div>
					))}
				</div>

				{/* Performance Metrics */}
				<motion.div
					initial={{ opacity: 0, y: 30 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.6, delay: 0.7 }}
					className="mt-16 bg-white rounded-xl shadow-lg p-8">
					<h3 className="text-2xl font-bold text-center mb-8 text-gray-800">
						📊 Measurable Improvements
					</h3>
					<div className="grid grid-cols-1 md:grid-cols-4 gap-6">
						<div className="text-center">
							<div className="text-3xl font-bold text-blue-600 mb-2">80%</div>
							<div className="text-sm text-gray-600">Faster Loading</div>
						</div>
						<div className="text-center">
							<div className="text-3xl font-bold text-green-600 mb-2">90%</div>
							<div className="text-sm text-gray-600">Smaller Bundles</div>
						</div>
						<div className="text-center">
							<div className="text-3xl font-bold text-purple-600 mb-2">5x</div>
							<div className="text-sm text-gray-600">Faster Development</div>
						</div>
						<div className="text-center">
							<div className="text-3xl font-bold text-orange-600 mb-2">95%</div>
							<div className="text-sm text-gray-600">Better SEO</div>
						</div>
					</div>
				</motion.div>

				{/* Development Features */}
				<motion.div
					initial={{ opacity: 0, y: 30 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.6, delay: 0.9 }}
					className="mt-12 text-center">
					<h3 className="text-2xl font-bold mb-6 text-gray-800">
						🛠️ Modern Development Features
					</h3>
					<div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
						<div className="bg-white rounded-lg p-6 shadow-md">
							<Zap className="w-8 h-8 text-yellow-500 mx-auto mb-3" />
							<h4 className="font-semibold mb-2">Hot Reloading</h4>
							<p className="text-sm text-gray-600">
								Instant feedback on code changes
							</p>
						</div>
						<div className="bg-white rounded-lg p-6 shadow-md">
							<Code className="w-8 h-8 text-blue-500 mx-auto mb-3" />
							<h4 className="font-semibold mb-2">Type Safety</h4>
							<p className="text-sm text-gray-600">
								Compile-time error checking
							</p>
						</div>
						<div className="bg-white rounded-lg p-6 shadow-md">
							<Rocket className="w-8 h-8 text-green-500 mx-auto mb-3" />
							<h4 className="font-semibold mb-2">Zero Config</h4>
							<p className="text-sm text-gray-600">
								Out-of-the-box optimization
							</p>
						</div>
					</div>
				</motion.div>
			</main>

			{/* Footer */}
			<footer className="bg-gray-800 text-white py-8 mt-16">
				<div className="container mx-auto px-6 text-center">
					<p className="text-lg mb-2">
						Ready to experience modern web development?
					</p>
					<p className="text-sm opacity-75">
						Each demo runs on a live development server with hot reloading and
						real-time code editing
					</p>
				</div>
			</footer>
		</div>
	);
}
