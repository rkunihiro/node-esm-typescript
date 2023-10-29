import { randomUUID } from "node:crypto";
import { createServer, type IncomingMessage, type ServerResponse } from "node:http";

async function requestListener(request: IncomingMessage, response: ServerResponse) {
    const start = performance.now();
    const requestId = randomUUID();
    const { method, url } = request;

    // eslint-disable-next-line no-console
    console.log(`${new Date().toISOString()} ${requestId} request ${method} ${url}`);

    const payload = JSON.stringify({ method, url });
    await new Promise<void>((resolve) => {
        response.writeHead(200, { "Content-Type": "application/json" }).write(payload, () => {
            response.end();
            resolve();
        });
    });

    const time = Math.floor(performance.now() - start);
    // eslint-disable-next-line no-console
    console.log(`${new Date().toISOString()} ${requestId} response ${time}ms`);
}

const server = createServer(requestListener);

await new Promise<void>((resolve) => {
    server.listen({ port: 3000 }, resolve);
});

// eslint-disable-next-line no-console
console.log(`Start server`);
