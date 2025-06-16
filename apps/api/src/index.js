"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = require("./app");
const start = async () => {
    try {
        await app_1.server.listen({ port: 3000 });
        const address = app_1.server.server.address();
        const port = typeof address === 'string' ? address : address?.port;
    }
    catch (err) {
        app_1.server.log.error(err);
        process.exit(1);
    }
};
start();
