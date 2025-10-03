const http = require("http");
const fs = require("fs");
const path = require("path");
const url = require("url");

const server = http.createServer((req, res) => {
	// Parse the URL
	const parsedUrl = url.parse(req.url);
	let pathname = parsedUrl.pathname;

	// Default to index.html if root path
	if (pathname === "/") {
		pathname = "/index.html";
	}

	// Remove leading slash and construct file path
	const filePath = path.join(__dirname, pathname.substring(1));

	// Security check - prevent directory traversal
	if (!filePath.startsWith(__dirname)) {
		res.writeHead(403, { "Content-Type": "text/plain" });
		res.end("Forbidden");
		return;
	}

	// Get file extension for MIME type
	const extname = path.extname(filePath).toLowerCase();
	const mimeTypes = {
		".html": "text/html",
		".htm": "text/html",
		".js": "text/javascript",
		".css": "text/css",
		".json": "application/json",
		".png": "image/png",
		".jpg": "image/jpeg",
		".jpeg": "image/jpeg",
		".gif": "image/gif",
		".svg": "image/svg+xml",
		".ico": "image/x-icon",
		".woff": "application/font-woff",
		".woff2": "application/font-woff2",
		".ttf": "application/font-ttf",
		".eot": "application/vnd.ms-fontobject",
		".otf": "application/font-otf",
		".wasm": "application/wasm",
		".mp4": "video/mp4",
		".webm": "video/webm",
		".ogg": "video/ogg",
		".mp3": "audio/mpeg",
		".wav": "audio/wav",
	};

	const contentType = mimeTypes[extname] || "application/octet-stream";

	// Check if path exists and handle directories
	fs.stat(filePath, (err, stats) => {
		if (err) {
			// Path not found
			res.writeHead(404, { "Content-Type": "text/html" });
			res.end(`
                <!DOCTYPE html>
                <html>
                <head>
                    <title>404 - File Not Found</title>
                    <style>
                        body { font-family: Arial, sans-serif; text-align: center; padding: 50px; }
                        h1 { color: #e74c3c; }
                        a { color: #3498db; text-decoration: none; }
                        a:hover { text-decoration: underline; }
                    </style>
                </head>
                <body>
                    <h1>404 - File Not Found</h1>
                    <p>The requested file <code>${pathname}</code> was not found.</p>
                    <p><a href="/">← Back to Home</a></p>
                </body>
                </html>
            `);
			return;
		}

		// If it's a directory, try to serve index.html
		if (stats.isDirectory()) {
			const indexPath = path.join(filePath, "index.html");
			fs.access(indexPath, fs.constants.F_OK, (indexErr) => {
				if (indexErr) {
					// No index.html, show directory listing
					fs.readdir(filePath, (readErr, files) => {
						if (readErr) {
							res.writeHead(500, { "Content-Type": "text/plain" });
							res.end(`Server Error: ${readErr.code}`);
							return;
						}

						// Generate directory listing
						const fileList = files
							.map((file) => {
								const fileUrl = path.join(pathname, file).replace(/\\/g, "/");
								if (fileUrl.includes("traditional")) { // If file urls are for the traditional-web-stack, add a trailing slash for webserver to locate .css files
									return `<li><a href="${fileUrl}/">${file}</a></li>`;
								} else {
									return `<li><a href="${fileUrl}">${file}</a></li>`;
								}

							})
							.join("");

						res.writeHead(200, { "Content-Type": "text/html" });
						res.end(`
							<!DOCTYPE html>
							<html>
							<head>
								<title>Directory Listing - ${pathname}</title>
								<style>
									body { font-family: Arial, sans-serif; padding: 20px; }
									h1 { color: #2c3e50; }
									ul { list-style: none; padding: 0; }
									li { margin: 5px 0; }
									a { color: #3498db; text-decoration: none; }
									a:hover { text-decoration: underline; }
									.back { margin-bottom: 20px; }
								</style>
							</head>
							<body>
								<div class="back"><a href="..">← Back</a></div>
								<h1>Directory: ${pathname}</h1>
								<ul>${fileList}</ul>
							</body>
							</html>
						`);
					});
				} else {
					// Serve index.html
					fs.readFile(indexPath, (error, content) => {
						if (error) {
							res.writeHead(500, { "Content-Type": "text/plain" });
							res.end(`Server Error: ${error.code}`);
							return;
						}

						// Set CORS headers for external resources
						res.setHeader("Access-Control-Allow-Origin", "*");
						res.setHeader(
							"Access-Control-Allow-Methods",
							"GET, POST, PUT, DELETE, OPTIONS"
						);
						res.setHeader(
							"Access-Control-Allow-Headers",
							"Content-Type, Authorization"
						);

						res.writeHead(200, { "Content-Type": "text/html" });
						res.end(content);
					});
				}
			});
			return;
		}

		// It's a file, read and serve it
		fs.readFile(filePath, (error, content) => {
			if (error) {
				res.writeHead(500, { "Content-Type": "text/plain" });
				res.end(`Server Error: ${error.code}`);
				return;
			}

			// Set CORS headers for external resources
			res.setHeader("Access-Control-Allow-Origin", "*");
			res.setHeader(
				"Access-Control-Allow-Methods",
				"GET, POST, PUT, DELETE, OPTIONS"
			);
			res.setHeader(
				"Access-Control-Allow-Headers",
				"Content-Type, Authorization"
			);

			res.writeHead(200, { "Content-Type": contentType });
			res.end(content);
		});
	});
});

// Handle OPTIONS requests for CORS
server.on("request", (req, res) => {
	if (req.method === "OPTIONS") {
		res.setHeader("Access-Control-Allow-Origin", "*");
		res.setHeader(
			"Access-Control-Allow-Methods",
			"GET, POST, PUT, DELETE, OPTIONS"
		);
		res.setHeader(
			"Access-Control-Allow-Headers",
			"Content-Type, Authorization"
		);
		res.writeHead(200);
		res.end();
	}
});

const PORT = process.env.PORT || 3000;
const HOST = "localhost";

server.listen(PORT, HOST, () => {
	console.log(`🚀 Simple HTTP Server running at http://${HOST}:${PORT}/`);
	console.log(`📁 Serving files from: ${__dirname}`);
	console.log(`\n📚 Available paths:`);
	console.log(
		`   • Traditional Web Stack: http://${HOST}:${PORT}/traditional-web-stack/`
	);
	console.log(
		`   • Modern Web Stack: http://${HOST}:${PORT}/modern-web-stack/`
	);
	console.log(`   • Resources: http://${HOST}:${PORT}/resources/`);
	console.log(`\n💡 Press Ctrl+C to stop the server`);
});

// Handle port already in use
server.on("error", (err) => {
	if (err.code === "EADDRINUSE") {
		console.log(`❌ Port ${PORT} is already in use.`);
		console.log(`💡 Try a different port:`);
		console.log(`   PORT=8000 node simple-server.js`);
		console.log(`   PORT=8080 node simple-server.js`);
		console.log(`   PORT=9000 node simple-server.js`);
		console.log(`\n🔍 To find what's using port ${PORT}:`);
		console.log(`   lsof -ti:${PORT}`);
		console.log(`   kill $(lsof -ti:${PORT})`);
	} else {
		console.error("❌ Server error:", err);
	}
	process.exit(1);
});

// Graceful shutdown
process.on("SIGINT", () => {
	console.log("\n👋 Shutting down server...");
	server.close(() => {
		console.log("✅ Server closed");
		process.exit(0);
	});
});
