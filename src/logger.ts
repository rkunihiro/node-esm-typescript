import { pino, stdTimeFunctions } from "pino";

export const logger = pino({
    formatters: {
        level(label) {
            return { level: label };
        },
        bindings() {
            return {};
        },
    },
    timestamp: stdTimeFunctions.isoTime,
    messageKey: "message",
    errorKey: "error",
}).child({ env: process.env["ENV"] });
