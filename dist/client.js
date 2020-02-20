"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const net_1 = require("net");
const encrypt_1 = require("./encrypt");
const stream_1 = require("stream");
function startClient(config) {
    const encrypter = encrypt_1.createDuplexEncrypter(config.password);
    const server = net_1.createServer(socket => {
        const conn = net_1.createConnection(config.server_port, config.server_addr);
        encrypter(conn);
        stream_1.pipeline(conn, socket, conn, err => {
            if (err) {
                console.error('Something went wrong: ', err);
            }
        });
    });
    return server;
}
exports.startClient = startClient;
