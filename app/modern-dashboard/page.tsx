"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
	Zap,
	Package,
	Target,
	Rocket,
	Plus,
	Check,
	Edit3,
	Save,
	X,
	TrendingUp,
	Users,
	Activity,
} from "lucide-react";

// Counter Component
function Counter() {
	const [count, setCount] = useState(0);
	const [isAnimating, setIsAnimating] = useState(false);

	const increment = () => {
		setIsAnimating(true);
		setCount(count + 1);
		setTimeout(() => setIsAnimating(false), 300);
	};

	return (
		<motion.div
			initial={{ opacity: 0, scale: 0.9 }}
			animate={{ opacity: 1, scale: 1 }}
			className="bg-white rounded-xl shadow-lg p-6 text-center">
			<h3 className="text-xl font-semibold mb-4 text-gray-800">
				⚛️ React Counter
			</h3>
			<div
				className={`text-4xl font-bold mb-4 ${
					isAnimating ? "animate-pulse-slow" : ""
				}`}>
				{count}
			</div>
			<button
				onClick={increment}
				className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors">
				Increment
			</button>
			<p className="text-sm text-gray-600 mt-2">
				State management with React hooks
			</p>
		</motion.div>
	);
}

// Todo List Component
function TodoList() {
	const [todos, setTodos] = useState([
		{ id: 1, text: "Learn React", completed: false },
		{ id: 2, text: "Master Tailwind CSS", completed: true },
		{ id: 3, text: "Build with Next.js", completed: false },
	]);
	const [newTodo, setNewTodo] = useState("");

	const addTodo = () => {
		if (newTodo.trim()) {
			setTodos([
				...todos,
				{
					id: Date.now(),
					text: newTodo,
					completed: false,
				},
			]);
			setNewTodo("");
		}
	};

	const toggleTodo = (id: number) => {
		setTodos(
			todos.map((todo) =>
				todo.id === id ? { ...todo, completed: !todo.completed } : todo
			)
		);
	};

	const deleteTodo = (id: number) => {
		setTodos(todos.filter((todo) => todo.id !== id));
	};

	return (
		<motion.div
			initial={{ opacity: 0, y: 20 }}
			animate={{ opacity: 1, y: 0 }}
			className="bg-white rounded-xl shadow-lg p-6">
			<h3 className="text-xl font-semibold mb-4 text-gray-800">📝 Todo List</h3>
			<div className="flex gap-2 mb-4">
				<input
					type="text"
					value={newTodo}
					onChange={(e) => setNewTodo(e.target.value)}
					placeholder="Add a todo..."
					className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
					onKeyPress={(e) => e.key === "Enter" && addTodo()}
				/>
				<button
					onClick={addTodo}
					className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors">
					<Plus className="w-4 h-4" />
				</button>
			</div>
			<div className="space-y-2">
				{todos.map((todo) => (
					<motion.div
						key={todo.id}
						initial={{ opacity: 0, x: -20 }}
						animate={{ opacity: 1, x: 0 }}
						className={`flex items-center gap-3 p-3 rounded-lg ${
							todo.completed ? "bg-green-50 text-green-800" : "bg-gray-50"
						}`}>
						<button
							onClick={() => toggleTodo(todo.id)}
							className={`w-5 h-5 rounded border-2 flex items-center justify-center ${
								todo.completed
									? "bg-green-500 border-green-500"
									: "border-gray-300"
							}`}>
							{todo.completed && <Check className="w-3 h-3 text-white" />}
						</button>
						<span className={`flex-1 ${todo.completed ? "line-through" : ""}`}>
							{todo.text}
						</span>
						<button
							onClick={() => deleteTodo(todo.id)}
							className="text-red-500 hover:text-red-700">
							<X className="w-4 h-4" />
						</button>
					</motion.div>
				))}
			</div>
		</motion.div>
	);
}

// User Card Component
function UserCard() {
	const [user, setUser] = useState({
		name: "John Doe",
		email: "john@example.com",
		avatar: "👨‍💻",
	});
	const [isEditing, setIsEditing] = useState(false);
	const [editData, setEditData] = useState(user);

	const saveChanges = () => {
		setUser(editData);
		setIsEditing(false);
	};

	const cancelEdit = () => {
		setEditData(user);
		setIsEditing(false);
	};

	return (
		<motion.div
			initial={{ opacity: 0, scale: 0.9 }}
			animate={{ opacity: 1, scale: 1 }}
			className="bg-white rounded-xl shadow-lg p-6">
			<h3 className="text-xl font-semibold mb-4 text-gray-800">
				👤 User Profile
			</h3>
			<div className="text-center">
				<div className="text-4xl mb-4">{user.avatar}</div>
				{isEditing ? (
					<div className="space-y-3">
						<input
							type="text"
							value={editData.name}
							onChange={(e) =>
								setEditData({ ...editData, name: e.target.value })
							}
							className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
						/>
						<input
							type="email"
							value={editData.email}
							onChange={(e) =>
								setEditData({ ...editData, email: e.target.value })
							}
							className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
						/>
						<div className="flex gap-2">
							<button
								onClick={saveChanges}
								className="flex-1 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors flex items-center justify-center gap-2">
								<Save className="w-4 h-4" />
								Save
							</button>
							<button
								onClick={cancelEdit}
								className="flex-1 px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors flex items-center justify-center gap-2">
								<X className="w-4 h-4" />
								Cancel
							</button>
						</div>
					</div>
				) : (
					<div>
						<h4 className="text-xl font-semibold mb-2">{user.name}</h4>
						<p className="text-gray-600 mb-4">{user.email}</p>
						<button
							onClick={() => setIsEditing(true)}
							className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors flex items-center gap-2 mx-auto">
							<Edit3 className="w-4 h-4" />
							Edit Profile
						</button>
					</div>
				)}
			</div>
		</motion.div>
	);
}

// Performance Metrics Component
function PerformanceMetrics() {
	const [metrics, setMetrics] = useState({
		fcp: 0.8,
		bundle: 245,
		seo: 95,
		development: 5,
	});

	useEffect(() => {
		// Simulate real-time updates
		const interval = setInterval(() => {
			setMetrics((prev) => ({
				fcp: prev.fcp + (Math.random() - 0.5) * 0.1,
				bundle: prev.bundle + (Math.random() - 0.5) * 10,
				seo: Math.min(100, prev.seo + (Math.random() - 0.5) * 2),
				development: prev.development + (Math.random() - 0.5) * 0.2,
			}));
		}, 2000);

		return () => clearInterval(interval);
	}, []);

	return (
		<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
			<motion.div
				initial={{ opacity: 0, y: 20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ delay: 0.1 }}
				className="interactive-card bg-white rounded-xl shadow-lg p-6 border-l-4 border-blue-500">
				<div className="flex items-center justify-between">
					<div>
						<p className="text-sm font-medium text-gray-600">
							First Contentful Paint
						</p>
						<p className="text-3xl font-bold text-blue-600">
							{metrics.fcp.toFixed(1)}s
						</p>
						<p className="text-sm text-green-600">80% faster</p>
					</div>
					<div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
						<Zap className="w-6 h-6 text-blue-600" />
					</div>
				</div>
			</motion.div>

			<motion.div
				initial={{ opacity: 0, y: 20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ delay: 0.2 }}
				className="interactive-card bg-white rounded-xl shadow-lg p-6 border-l-4 border-green-500">
				<div className="flex items-center justify-between">
					<div>
						<p className="text-sm font-medium text-gray-600">Bundle Size</p>
						<p className="text-3xl font-bold text-green-600">
							{Math.round(metrics.bundle)}KB
						</p>
						<p className="text-sm text-green-600">90% smaller</p>
					</div>
					<div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
						<Package className="w-6 h-6 text-green-600" />
					</div>
				</div>
			</motion.div>

			<motion.div
				initial={{ opacity: 0, y: 20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ delay: 0.3 }}
				className="interactive-card bg-white rounded-xl shadow-lg p-6 border-l-4 border-purple-500">
				<div className="flex items-center justify-between">
					<div>
						<p className="text-sm font-medium text-gray-600">SEO Score</p>
						<p className="text-3xl font-bold text-purple-600">
							{Math.round(metrics.seo)}/100
						</p>
						<p className="text-sm text-green-600">95% better</p>
					</div>
					<div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
						<Target className="w-6 h-6 text-purple-600" />
					</div>
				</div>
			</motion.div>

			<motion.div
				initial={{ opacity: 0, y: 20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ delay: 0.4 }}
				className="interactive-card bg-white rounded-xl shadow-lg p-6 border-l-4 border-orange-500">
				<div className="flex items-center justify-between">
					<div>
						<p className="text-sm font-medium text-gray-600">
							Development Speed
						</p>
						<p className="text-3xl font-bold text-orange-600">
							{metrics.development.toFixed(1)}x
						</p>
						<p className="text-sm text-green-600">Faster</p>
					</div>
					<div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center">
						<Rocket className="w-6 h-6 text-orange-600" />
					</div>
				</div>
			</motion.div>
		</div>
	);
}

export default function ModernDashboard() {
	const [activeDemo, setActiveDemo] = useState<string | null>(null);

	const showDemo = (type: string) => {
		setActiveDemo(type);
	};

	return (
		<div className="min-h-screen bg-gray-50">
			{/* Header */}
			<header className="bg-gradient-modern text-white shadow-lg">
				<div className="container mx-auto px-6 py-8">
					<motion.div
						initial={{ opacity: 0, y: 30 }}
						animate={{ opacity: 1, y: 0 }}
						className="flex items-center justify-between">
						<div>
							<h1 className="text-4xl font-bold mb-2">🚀 Modern Dashboard</h1>
							<p className="text-xl opacity-90">
								Built with React, Next.js, and Tailwind CSS
							</p>
						</div>
						<div className="glass rounded-lg p-4">
							<div className="text-sm opacity-75">Live Development Server</div>
							<div className="text-2xl font-bold">Next.js + React</div>
						</div>
					</motion.div>
				</div>
			</header>

			{/* Main Content */}
			<main className="container mx-auto px-6 py-8">
				{/* Performance Metrics */}
				<motion.section
					initial={{ opacity: 0, y: 30 }}
					animate={{ opacity: 1, y: 0 }}
					className="mb-12">
					<h2 className="text-3xl font-bold mb-8 text-gray-800">
						📊 Real-Time Performance Metrics
					</h2>
					<PerformanceMetrics />
				</motion.section>

				{/* Interactive Components */}
				<motion.section
					initial={{ opacity: 0, y: 30 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ delay: 0.2 }}
					className="mb-12">
					<h2 className="text-3xl font-bold mb-8 text-gray-800">
						🎮 Interactive Components
					</h2>
					<div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
						<Counter />
						<TodoList />
						<UserCard />
					</div>
				</motion.section>

				{/* Interactive Demo Section */}
				<motion.section
					initial={{ opacity: 0, y: 30 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ delay: 0.4 }}
					className="mb-12">
					<div className="bg-gradient-modern rounded-xl p-8 text-white text-center">
						<h3 className="text-2xl font-bold mb-4">🎯 Try It Yourself!</h3>
						<p className="text-xl mb-6 opacity-90">
							Experience the power of modern frameworks
						</p>
						<div className="flex flex-wrap justify-center gap-4">
							<button
								onClick={() => showDemo("performance")}
								className="px-6 py-3 bg-white bg-opacity-20 rounded-lg hover:bg-opacity-30 transition-all">
								📊 Performance Demo
							</button>
							<button
								onClick={() => showDemo("components")}
								className="px-6 py-3 bg-white bg-opacity-20 rounded-lg hover:bg-opacity-30 transition-all">
								⚛️ Component Demo
							</button>
							<button
								onClick={() => showDemo("styling")}
								className="px-6 py-3 bg-white bg-opacity-20 rounded-lg hover:bg-opacity-30 transition-all">
								🎨 Styling Demo
							</button>
						</div>
						{activeDemo && (
							<motion.div
								initial={{ opacity: 0, y: 20 }}
								animate={{ opacity: 1, y: 0 }}
								className="mt-8 p-6 bg-white bg-opacity-10 rounded-lg backdrop-blur-sm">
								<div className="text-left">
									{activeDemo === "performance" && (
										<>
											<h4 className="text-lg font-semibold mb-4">
												📊 Performance Comparison
											</h4>
											<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
												<div className="p-4 bg-red-100 rounded-lg">
													<h5 className="font-semibold text-red-800 mb-2">
														Traditional
													</h5>
													<div className="space-y-1 text-sm text-red-700">
														<div>FCP: 3-5 seconds</div>
														<div>Bundle: 2-5MB</div>
														<div>SEO: 0/100</div>
													</div>
												</div>
												<div className="p-4 bg-green-100 rounded-lg">
													<h5 className="font-semibold text-green-800 mb-2">
														Modern
													</h5>
													<div className="space-y-1 text-sm text-green-700">
														<div>FCP: 0.5-1 seconds</div>
														<div>Bundle: 100-500KB</div>
														<div>SEO: 95/100</div>
													</div>
												</div>
											</div>
										</>
									)}
									{activeDemo === "components" && (
										<>
											<h4 className="text-lg font-semibold mb-4">
												⚛️ React Components
											</h4>
											<div className="p-4 bg-blue-100 rounded-lg">
												<h5 className="font-semibold text-blue-800 mb-2">
													Component Benefits
												</h5>
												<div className="space-y-1 text-sm text-blue-700">
													<div>✅ Reusable across the app</div>
													<div>✅ Self-contained logic</div>
													<div>✅ Easy to test and maintain</div>
													<div>✅ Declarative state management</div>
												</div>
											</div>
										</>
									)}
									{activeDemo === "styling" && (
										<>
											<h4 className="text-lg font-semibold mb-4">
												🎨 Tailwind CSS
											</h4>
											<div className="p-4 bg-purple-100 rounded-lg">
												<h5 className="font-semibold text-purple-800 mb-2">
													Utility-First Benefits
												</h5>
												<div className="space-y-1 text-sm text-purple-700">
													<div>✅ No CSS conflicts</div>
													<div>✅ Consistent design system</div>
													<div>✅ Rapid prototyping</div>
													<div>✅ Small bundle size</div>
												</div>
											</div>
										</>
									)}
								</div>
							</motion.div>
						)}
					</div>
				</motion.section>

				{/* Code Comparison */}
				<motion.section
					initial={{ opacity: 0, y: 30 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ delay: 0.6 }}
					className="mb-12">
					<h2 className="text-3xl font-bold mb-8 text-gray-800">
						💻 Code Comparison
					</h2>
					<div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
						<div className="bg-red-50 border border-red-200 rounded-xl p-6">
							<h3 className="text-xl font-semibold mb-4 text-red-800">
								❌ Traditional Approach
							</h3>
							<div className="code-snippet">
								<div className="comment">// HTML</div>
								<div>&lt;div class="card"&gt;</div>
								<div>&nbsp;&nbsp;&lt;h3 class="title"&gt;Title&lt;/h3&gt;</div>
								<div>
									&nbsp;&nbsp;&lt;p class="content"&gt;Content&lt;/p&gt;
								</div>
								<div>&lt;/div&gt;</div>
								<br />
								<div className="comment">// CSS (100+ lines)</div>
								<div>.card {`{ /* 50+ lines of CSS */ }`}</div>
								<div>.title {`{ /* 20+ lines of CSS */ }`}</div>
								<div>.content {`{ /* 15+ lines of CSS */ }`}</div>
								<br />
								<div className="comment">// JavaScript</div>
								<div>document.querySelector('.card')</div>
								<div>&nbsp;&nbsp;.addEventListener('click', ...)</div>
							</div>
							<p className="text-sm text-red-700 mt-2">
								Complex, scattered, hard to maintain
							</p>
						</div>

						<div className="bg-green-50 border border-green-200 rounded-xl p-6">
							<h3 className="text-xl font-semibold mb-4 text-green-800">
								✅ Modern Approach
							</h3>
							<div className="code-snippet">
								<div className="comment">// React Component</div>
								<div>
									function Card({`{ title, content }`}) {`{`}
								</div>
								<div>&nbsp;&nbsp;return (</div>
								<div>
									&nbsp;&nbsp;&nbsp;&nbsp;&lt;div className="bg-white p-6
									rounded-lg shadow"&gt;
								</div>
								<div>
									&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;h3 className="text-xl
									font-bold mb-2"&gt;
								</div>
								<div>
									&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{`{title}`}
								</div>
								<div>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;/h3&gt;</div>
								<div>
									&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;p
									className="text-gray-600"&gt;
								</div>
								<div>
									&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{`{content}`}
								</div>
								<div>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;/p&gt;</div>
								<div>&nbsp;&nbsp;&nbsp;&nbsp;&lt;/div&gt;</div>
								<div>&nbsp;&nbsp;);</div>
								<div>{`}`}</div>
							</div>
							<p className="text-sm text-green-700 mt-2">
								Simple, organized, easy to maintain
							</p>
						</div>
					</div>
				</motion.section>
			</main>

			{/* Footer */}
			<footer className="bg-gray-800 text-white py-8">
				<div className="container mx-auto px-6 text-center">
					<h3 className="text-2xl font-bold mb-4">🎉 Congratulations!</h3>
					<p className="text-lg mb-4">
						You've experienced the power of modern web development
					</p>
					<div className="flex flex-wrap justify-center gap-4 text-sm">
						<span className="px-3 py-1 bg-blue-600 rounded-full">
							React Components
						</span>
						<span className="px-3 py-1 bg-green-600 rounded-full">
							Tailwind CSS
						</span>
						<span className="px-3 py-1 bg-purple-600 rounded-full">
							Next.js
						</span>
						<span className="px-3 py-1 bg-orange-600 rounded-full">
							TypeScript
						</span>
					</div>
				</div>
			</footer>
		</div>
	);
}
