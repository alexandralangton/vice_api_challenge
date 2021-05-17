const http = require('http');

const server = http
	.createServer((req, res) => {
		try {
			if (req.method === 'GET') {
				res.writeHead(200, { 'Content-Type': 'text/plain' });
				res.write('Got the get!');
				res.end();
			} else if (req.method === 'POST') {
				res.writeHead(201, { 'Content-Type': 'text/plain' });
				res.write('Got the post');
				res.end();
			} else {
				throw new Error('Unexpected request type');
			}
		} catch (err) {
			console.error(err);
			res.writeHead(500, { 'Content-Type': 'text/plain' });
			res.write(err.message);
			res.end();
		}
	})
	.listen(3000);
