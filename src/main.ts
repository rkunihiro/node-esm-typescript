import { randomUUID } from "node:crypto";

import { fastify } from "fastify";

import { logger } from "./logger.ts";

const host = process.env["HOST"] ?? "0.0.0.0";
const port = Number.parseInt(process.env["PORT"] ?? "3000", 10);

try {
    // create server
    const server = fastify({
        logger,
        genReqId() {
            return randomUUID();
        },
    });

    // add route handler
    server.get("/", async () => {
        return "ok";
    });

    // start server
    await server.listen({ host, port });

    // wait signals
    const signal = await new Promise<NodeJS.Signals>((resolve) => {
        process.once("SIGINT", resolve);
        process.once("SIGTERM", resolve);
    });
    logger.info({ signal }, "server stop by signal");

    // shutdown server
    await server.close();
    logger.info("server stoped");
    // eslint-disable-next-line unicorn/no-process-exit
    process.exit(0);
} catch (error) {
    logger.error({ error }, "error");
    // eslint-disable-next-line unicorn/no-process-exit
    process.exit(1);
}
