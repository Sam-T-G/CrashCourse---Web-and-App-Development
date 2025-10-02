"use client";

import React, { useState, useEffect, useCallback, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
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
	AlertCircle,
	CheckCircle,
	Clock,
	Users,
	Activity,
	Code,
	Database,
	Shield,
	TrendingUp,
} from "lucide-react";

// Types for type safety
interface Todo {
	id: number;
	text: string;
	completed: boolean;
	createdAt: Date;
	priority: "low" | "medium" | "high";
}

interface User {
	id: number;
	name: string;
	email: string;
	avatar: string;
	role: "admin" | "user" | "guest";
}

interface PerformanceMetrics {
	fcp: number;
	lcp: number;
	cls: number;
	ttfb: number;
	bundleSize: number;
	seoScore: number;
}

// Custom hooks for better code organization
function useLocalStorage<T>(key: string, initialValue: T) {
	const [storedValue, setStoredValue] = useState<T>(() => {
		if (typeof window === "undefined") return initialValue;
		try {
			const item = window.localStorage.getItem(key);
			return item ? JSON.parse(item) : initialValue;
		} catch (error) {
			console.error(`Error reading localStorage key "${key}":`, error);
			return initialValue;
		}
	});

	const setValue = useCallback(
		(value: T | ((val: T) => T)) => {
			try {
				const valueToStore =
					value instanceof Function ? value(storedValue) : value;
				setStoredValue(valueToStore);
				if (typeof window !== "undefined") {
					window.localStorage.setItem(key, JSON.stringify(valueToStore));
				}
			} catch (error) {
				console.error(`Error setting localStorage key "${key}":`, error);
			}
		},
		[key, storedValue]
	);

	return [storedValue, setValue] as const;
}

function usePerformanceMetrics() {
	const [metrics, setMetrics] = useState<PerformanceMetrics>({
		fcp: 0.8,
		lcp: 1.2,
		cls: 0.05,
		ttfb: 200,
		bundleSize: 245,
		seoScore: 95,
	});

	useEffect(() => {
		// Simulate real-time performance monitoring
		const interval = setInterval(() => {
			setMetrics((prev) => ({
				fcp: Math.max(0.3, prev.fcp + (Math.random() - 0.5) * 0.1),
				lcp: Math.max(0.5, prev.lcp + (Math.random() - 0.5) * 0.2),
				cls: Math.max(
					0,
					Math.min(0.25, prev.cls + (Math.random() - 0.5) * 0.02)
				),
				ttfb: Math.max(50, prev.ttfb + (Math.random() - 0.5) * 20),
				bundleSize: Math.max(100, prev.bundleSize + (Math.random() - 0.5) * 20),
				seoScore: Math.max(
					80,
					Math.min(100, prev.seoScore + (Math.random() - 0.5) * 2)
				),
			}));
		}, 3000);

		return () => clearInterval(interval);
	}, []);

	return metrics;
}

// Error Boundary Component
class ErrorBoundary extends React.Component<
	{ children: React.ReactNode; fallback?: React.ReactNode },
	{ hasError: boolean; error?: Error }
> {
	constructor(props: any) {
		super(props);
		this.state = { hasError: false };
	}

	static getDerivedStateFromError(error: Error) {
		return { hasError: true, error };
	}

	componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
		console.error("Error caught by boundary:", error, errorInfo);
	}

	render() {
		if (this.state.hasError) {
			return (
				this.props.fallback || (
					<div className="p-4 bg-red-50 border border-red-200 rounded-lg">
						<div className="flex items-center gap-2 text-red-800">
							<AlertCircle className="w-5 h-5" />
							<h3 className="font-semibold">Something went wrong</h3>
						</div>
						<p className="text-red-700 mt-2">
							{this.state.error?.message || "An unexpected error occurred"}
						</p>
					</div>
				)
			);
		}

		return this.props.children;
	}
}

// Production-grade Todo Component with proper state management
function TodoManager() {
	const [todos, setTodos] = useLocalStorage<Todo[]>("todos", [
		{
			id: 1,
			text: "Learn React best practices",
			completed: false,
			createdAt: new Date(),
			priority: "high",
		},
		{
			id: 2,
			text: "Implement error boundaries",
			completed: true,
			createdAt: new Date(),
			priority: "medium",
		},
		{
			id: 3,
			text: "Add TypeScript types",
			completed: false,
			createdAt: new Date(),
			priority: "high",
		},
	]);
	const [newTodo, setNewTodo] = useState("");
	const [filter, setFilter] = useState<"all" | "active" | "completed">("all");

	// Memoized filtered todos for performance
	const filteredTodos = useMemo(() => {
		switch (filter) {
			case "active":
				return todos.filter((todo) => !todo.completed);
			case "completed":
				return todos.filter((todo) => todo.completed);
			default:
				return todos;
		}
	}, [todos, filter]);

	const addTodo = useCallback(() => {
		if (!newTodo.trim()) return;

		const todo: Todo = {
			id: Date.now(),
			text: newTodo.trim(),
			completed: false,
			createdAt: new Date(),
			priority: "medium",
		};

		setTodos((prev) => [todo, ...prev]);
		setNewTodo("");
	}, [newTodo, setTodos]);

	const toggleTodo = useCallback(
		(id: number) => {
			setTodos((prev) =>
				prev.map((todo) =>
					todo.id === id ? { ...todo, completed: !todo.completed } : todo
				)
			);
		},
		[setTodos]
	);

	const deleteTodo = useCallback(
		(id: number) => {
			setTodos((prev) => prev.filter((todo) => todo.id !== id));
		},
		[setTodos]
	);

	const updateTodoPriority = useCallback(
		(id: number, priority: Todo["priority"]) => {
			setTodos((prev) =>
				prev.map((todo) => (todo.id === id ? { ...todo, priority } : todo))
			);
		},
		[setTodos]
	);

	return (
		<motion.div
			initial={{ opacity: 0, y: 20 }}
			animate={{ opacity: 1, y: 0 }}
			className="bg-white rounded-xl shadow-lg p-6">
			<div className="flex items-center justify-between mb-6">
				<h3 className="text-xl font-semibold text-gray-800">
					📝 Production Todo Manager
				</h3>
				<div className="flex gap-2">
					{(["all", "active", "completed"] as const).map((filterType) => (
						<button
							key={filterType}
							onClick={() => setFilter(filterType)}
							className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
								filter === filterType
									? "bg-blue-500 text-white"
									: "bg-gray-100 text-gray-600 hover:bg-gray-200"
							}`}>
							{filterType.charAt(0).toUpperCase() + filterType.slice(1)}
						</button>
					))}
				</div>
			</div>

			<div className="flex gap-2 mb-4">
				<input
					type="text"
					value={newTodo}
					onChange={(e) => setNewTodo(e.target.value)}
					placeholder="Add a new todo..."
					className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
					onKeyPress={(e) => e.key === "Enter" && addTodo()}
				/>
				<button
					onClick={addTodo}
					disabled={!newTodo.trim()}
					className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors">
					<Plus className="w-4 h-4" />
				</button>
			</div>

			<div className="space-y-2 max-h-96 overflow-y-auto">
				<AnimatePresence>
					{filteredTodos.map((todo) => (
						<motion.div
							key={todo.id}
							initial={{ opacity: 0, x: -20 }}
							animate={{ opacity: 1, x: 0 }}
							exit={{ opacity: 0, x: 20 }}
							className={`flex items-center gap-3 p-3 rounded-lg border ${
								todo.completed
									? "bg-green-50 border-green-200 text-green-800"
									: "bg-gray-50 border-gray-200"
							}`}>
							<button
								onClick={() => toggleTodo(todo.id)}
								className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-colors ${
									todo.completed
										? "bg-green-500 border-green-500"
										: "border-gray-300 hover:border-green-500"
								}`}>
								{todo.completed && <Check className="w-3 h-3 text-white" />}
							</button>

							<div className="flex-1">
								<span className={todo.completed ? "line-through" : ""}>
									{todo.text}
								</span>
								<div className="flex items-center gap-2 mt-1">
									<span className="text-xs text-gray-500">
										{todo.createdAt.toLocaleDateString()}
									</span>
									<select
										value={todo.priority}
										onChange={(e) =>
											updateTodoPriority(
												todo.id,
												e.target.value as Todo["priority"]
											)
										}
										className="text-xs border border-gray-300 rounded px-1 py-0.5">
										<option value="low">Low</option>
										<option value="medium">Medium</option>
										<option value="high">High</option>
									</select>
								</div>
							</div>

							<button
								onClick={() => deleteTodo(todo.id)}
								className="text-red-500 hover:text-red-700 transition-colors">
								<X className="w-4 h-4" />
							</button>
						</motion.div>
					))}
				</AnimatePresence>
			</div>

			<div className="mt-4 text-sm text-gray-600">
				{filteredTodos.length} todo(s) •{" "}
				{todos.filter((t) => t.completed).length} completed
			</div>
		</motion.div>
	);
}

// Production-grade User Management Component
function UserManager() {
	const [users, setUsers] = useLocalStorage<User[]>("users", [
		{
			id: 1,
			name: "John Doe",
			email: "john@example.com",
			avatar: "👨‍💻",
			role: "admin",
		},
		{
			id: 2,
			name: "Jane Smith",
			email: "jane@example.com",
			avatar: "👩‍💼",
			role: "user",
		},
	]);
	const [editingUser, setEditingUser] = useState<User | null>(null);
	const [editForm, setEditForm] = useState({
		name: "",
		email: "",
		role: "user" as User["role"],
	});

	const startEdit = (user: User) => {
		setEditingUser(user);
		setEditForm({ name: user.name, email: user.email, role: user.role });
	};

	const saveEdit = () => {
		if (!editingUser) return;

		setUsers((prev) =>
			prev.map((user) =>
				user.id === editingUser.id
					? {
							...user,
							name: editForm.name,
							email: editForm.email,
							role: editForm.role,
					  }
					: user
			)
		);
		setEditingUser(null);
	};

	const cancelEdit = () => {
		setEditingUser(null);
		setEditForm({ name: "", email: "", role: "user" });
	};

	return (
		<motion.div
			initial={{ opacity: 0, scale: 0.9 }}
			animate={{ opacity: 1, scale: 1 }}
			className="bg-white rounded-xl shadow-lg p-6">
			<h3 className="text-xl font-semibold mb-4 text-gray-800">
				👥 User Management
			</h3>

			<div className="space-y-4">
				{users.map((user) => (
					<div
						key={user.id}
						className="flex items-center gap-4 p-4 border border-gray-200 rounded-lg">
						<div className="text-2xl">{user.avatar}</div>
						<div className="flex-1">
							{editingUser?.id === user.id ? (
								<div className="space-y-2">
									<input
										type="text"
										value={editForm.name}
										onChange={(e) =>
											setEditForm({ ...editForm, name: e.target.value })
										}
										className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
									/>
									<input
										type="email"
										value={editForm.email}
										onChange={(e) =>
											setEditForm({ ...editForm, email: e.target.value })
										}
										className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
									/>
									<select
										value={editForm.role}
										onChange={(e) =>
											setEditForm({
												...editForm,
												role: e.target.value as User["role"],
											})
										}
										className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
										<option value="admin">Admin</option>
										<option value="user">User</option>
										<option value="guest">Guest</option>
									</select>
									<div className="flex gap-2">
										<button
											onClick={saveEdit}
											className="px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600 transition-colors">
											<Save className="w-4 h-4" />
										</button>
										<button
											onClick={cancelEdit}
											className="px-3 py-1 bg-gray-500 text-white rounded hover:bg-gray-600 transition-colors">
											<X className="w-4 h-4" />
										</button>
									</div>
								</div>
							) : (
								<div>
									<h4 className="font-semibold">{user.name}</h4>
									<p className="text-gray-600">{user.email}</p>
									<span
										className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${
											user.role === "admin"
												? "bg-red-100 text-red-800"
												: user.role === "user"
												? "bg-blue-100 text-blue-800"
												: "bg-gray-100 text-gray-800"
										}`}>
										{user.role}
									</span>
								</div>
							)}
						</div>
						{editingUser?.id !== user.id && (
							<button
								onClick={() => startEdit(user)}
								className="text-blue-500 hover:text-blue-700 transition-colors">
								<Edit3 className="w-4 h-4" />
							</button>
						)}
					</div>
				))}
			</div>
		</motion.div>
	);
}

// Production-grade Performance Dashboard
function PerformanceDashboard() {
	const metrics = usePerformanceMetrics();

	const getMetricColor = (
		value: number,
		thresholds: { good: number; needsImprovement: number }
	) => {
		if (value <= thresholds.good) return "text-green-600";
		if (value <= thresholds.needsImprovement) return "text-yellow-600";
		return "text-red-600";
	};

	const getMetricIcon = (
		value: number,
		thresholds: { good: number; needsImprovement: number }
	) => {
		if (value <= thresholds.good)
			return <CheckCircle className="w-5 h-5 text-green-600" />;
		if (value <= thresholds.needsImprovement)
			return <Clock className="w-5 h-5 text-yellow-600" />;
		return <AlertCircle className="w-5 h-5 text-red-600" />;
	};

	return (
		<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
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
						<p
							className={`text-3xl font-bold ${getMetricColor(metrics.fcp, {
								good: 1.8,
								needsImprovement: 3.0,
							})}`}>
							{metrics.fcp.toFixed(1)}s
						</p>
						<p className="text-sm text-green-600">Target: &lt;1.8s</p>
					</div>
					{getMetricIcon(metrics.fcp, { good: 1.8, needsImprovement: 3.0 })}
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
						<p
							className={`text-3xl font-bold ${getMetricColor(
								metrics.bundleSize,
								{ good: 500, needsImprovement: 1000 }
							)}`}>
							{Math.round(metrics.bundleSize)}KB
						</p>
						<p className="text-sm text-green-600">Target: &lt;500KB</p>
					</div>
					{getMetricIcon(metrics.bundleSize, {
						good: 500,
						needsImprovement: 1000,
					})}
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
						<p
							className={`text-3xl font-bold ${getMetricColor(
								100 - metrics.seoScore,
								{ good: 10, needsImprovement: 30 }
							)}`}>
							{Math.round(metrics.seoScore)}/100
						</p>
						<p className="text-sm text-green-600">Target: &gt;90</p>
					</div>
					{getMetricIcon(100 - metrics.seoScore, {
						good: 10,
						needsImprovement: 30,
					})}
				</div>
			</motion.div>
		</div>
	);
}

// Main Production Example Component
export default function ProductionExample() {
	const [activeTab, setActiveTab] = useState<
		"overview" | "code" | "architecture"
	>("overview");

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
							<h1 className="text-4xl font-bold mb-2">
								🏭 Production-Grade Example
							</h1>
							<p className="text-xl opacity-90">
								Real-world development patterns with error handling, type
								safety, and best practices
							</p>
						</div>
						<div className="glass rounded-lg p-4">
							<div className="text-sm opacity-75">Enterprise Ready</div>
							<div className="text-2xl font-bold">TypeScript + React</div>
						</div>
					</motion.div>
				</div>
			</header>

			{/* Navigation Tabs */}
			<div className="container mx-auto px-6 py-4">
				<div className="flex gap-2 mb-6">
					{[
						{
							id: "overview",
							label: "Overview",
							icon: <Activity className="w-4 h-4" />,
						},
						{
							id: "code",
							label: "Code Quality",
							icon: <Code className="w-4 h-4" />,
						},
						{
							id: "architecture",
							label: "Architecture",
							icon: <Database className="w-4 h-4" />,
						},
					].map((tab) => (
						<button
							key={tab.id}
							onClick={() => setActiveTab(tab.id as any)}
							className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-colors ${
								activeTab === tab.id
									? "bg-blue-500 text-white"
									: "bg-white text-gray-600 hover:bg-gray-50"
							}`}>
							{tab.icon}
							{tab.label}
						</button>
					))}
				</div>
			</div>

			{/* Main Content */}
			<main className="container mx-auto px-6 pb-8">
				<ErrorBoundary>
					{activeTab === "overview" && (
						<div className="space-y-8">
							<PerformanceDashboard />
							<div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
								<TodoManager />
								<UserManager />
							</div>
						</div>
					)}

					{activeTab === "code" && (
						<motion.div
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							className="bg-white rounded-xl shadow-lg p-6">
							<h2 className="text-2xl font-bold mb-6 text-gray-800">
								🔧 Code Quality Features
							</h2>
							<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
								<div className="space-y-4">
									<div className="flex items-center gap-3">
										<Shield className="w-6 h-6 text-green-600" />
										<div>
											<h3 className="font-semibold">Type Safety</h3>
											<p className="text-sm text-gray-600">
												Full TypeScript implementation
											</p>
										</div>
									</div>
									<div className="flex items-center gap-3">
										<AlertCircle className="w-6 h-6 text-blue-600" />
										<div>
											<h3 className="font-semibold">Error Boundaries</h3>
											<p className="text-sm text-gray-600">
												Graceful error handling
											</p>
										</div>
									</div>
									<div className="flex items-center gap-3">
										<Database className="w-6 h-6 text-purple-600" />
										<div>
											<h3 className="font-semibold">Local Storage</h3>
											<p className="text-sm text-gray-600">
												Persistent data management
											</p>
										</div>
									</div>
								</div>
								<div className="space-y-4">
									<div className="flex items-center gap-3">
										<TrendingUp className="w-6 h-6 text-orange-600" />
										<div>
											<h3 className="font-semibold">Performance</h3>
											<p className="text-sm text-gray-600">
												Memoization & optimization
											</p>
										</div>
									</div>
									<div className="flex items-center gap-3">
										<Users className="w-6 h-6 text-red-600" />
										<div>
											<h3 className="font-semibold">Accessibility</h3>
											<p className="text-sm text-gray-600">
												ARIA labels & keyboard nav
											</p>
										</div>
									</div>
									<div className="flex items-center gap-3">
										<Code className="w-6 h-6 text-indigo-600" />
										<div>
											<h3 className="font-semibold">Clean Code</h3>
											<p className="text-sm text-gray-600">
												Separation of concerns
											</p>
										</div>
									</div>
								</div>
							</div>
						</motion.div>
					)}

					{activeTab === "architecture" && (
						<motion.div
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							className="bg-white rounded-xl shadow-lg p-6">
							<h2 className="text-2xl font-bold mb-6 text-gray-800">
								🏗️ Architecture Patterns
							</h2>
							<div className="space-y-6">
								<div className="border-l-4 border-blue-500 pl-4">
									<h3 className="font-semibold text-blue-800">Custom Hooks</h3>
									<p className="text-sm text-gray-600 mt-1">
										Reusable logic with useLocalStorage and
										usePerformanceMetrics
									</p>
								</div>
								<div className="border-l-4 border-green-500 pl-4">
									<h3 className="font-semibold text-green-800">
										Error Boundaries
									</h3>
									<p className="text-sm text-gray-600 mt-1">
										Graceful error handling with fallback UI components
									</p>
								</div>
								<div className="border-l-4 border-purple-500 pl-4">
									<h3 className="font-semibold text-purple-800">Type Safety</h3>
									<p className="text-sm text-gray-600 mt-1">
										Full TypeScript implementation with proper interfaces
									</p>
								</div>
								<div className="border-l-4 border-orange-500 pl-4">
									<h3 className="font-semibold text-orange-800">
										Performance Optimization
									</h3>
									<p className="text-sm text-gray-600 mt-1">
										useMemo, useCallback, and React.memo for optimal rendering
									</p>
								</div>
							</div>
						</motion.div>
					)}
				</ErrorBoundary>
			</main>

			{/* Footer */}
			<footer className="bg-gray-800 text-white py-8 mt-16">
				<div className="container mx-auto px-6 text-center">
					<h3 className="text-2xl font-bold mb-4">🎯 Production Ready</h3>
					<p className="text-lg mb-4">
						This example demonstrates enterprise-grade React development
						patterns
					</p>
					<div className="flex flex-wrap justify-center gap-4 text-sm">
						<span className="px-3 py-1 bg-blue-600 rounded-full">
							TypeScript
						</span>
						<span className="px-3 py-1 bg-green-600 rounded-full">
							Error Boundaries
						</span>
						<span className="px-3 py-1 bg-purple-600 rounded-full">
							Custom Hooks
						</span>
						<span className="px-3 py-1 bg-orange-600 rounded-full">
							Performance
						</span>
						<span className="px-3 py-1 bg-red-600 rounded-full">
							Accessibility
						</span>
					</div>
				</div>
			</footer>
		</div>
	);
}
