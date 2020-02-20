"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = require("fs");
function readConfig() {
    let config;
    try {
        const configText = fs_1.readFileSync('config.json', 'utf-8');
        config = JSON.parse(configText);
    }
    catch (e) {
        console.error('Failed to read config.json');
        process.exit(-1);
    }
    return config;
}
exports.readConfig = readConfig;
