httpProxy = require('http-proxy');

const port = 8000;

const proxy = httpProxy.createProxyServer({
    target:{
        protocol: 'https:',
        host:'rickandmortyapi.com',
    },
    changeOrigin: true
});

proxy.on('proxyRes', (proxyRes, req, res) => {
    const exchange = `[${req.method}] [${proxyRes.statusCode}] -> ${proxyRes.connection.servername}${proxyRes.req.path}`;
    console.log(exchange);
});

proxy.on('error', (err, req, res) => {
    res.writeHead(500, { 'Content-Type': 'text/plain' });
    console.error(err)
    res.end('Something went wrong. And we are reporting a custom error message.');
});

proxy.listen(port, () =>{ 
    console.log('Proxy works and listen ', port )
});