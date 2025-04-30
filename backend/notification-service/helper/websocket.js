const http = require('http');
const { server: WebSocketServer } = require('websocket');

function initWebSocketServer(port = 4005) {
    const server = http.createServer((req, res) => {
        res.writeHead(404);
        res.end();
    });

    server.listen(port, () => {
        console.log(`WebSocket Server listening on port ${port}`);
    });

    const wsServer = new WebSocketServer({
        httpServer: server,
        autoAcceptConnections: false
    });

    const clients = [];

    wsServer.on('request', (request) => {
        const connection = request.accept('echo-protocol', request.origin);
        console.log('WebSocket connection accepted');

        clients.push(connection);

        connection.on('message', (message) => {
            if (message.type === 'utf8') {
                console.log('Received: ' + message.utf8Data);
                connection.sendUTF('Echo: ' + message.utf8Data);
            }
        });

        connection.on('close', () => {
            console.log('WebSocket connection closed');
            const index = clients.indexOf(connection);
            if (index !== -1) clients.splice(index, 1);
        });
    });

    // Functions to expose
    return {
        broadcast: (message) => {
            clients.forEach((client) => {
                if (client.connected) {
                    client.sendUTF(message);
                }
            });
        }
    };
}

module.exports = { initWebSocketServer };
