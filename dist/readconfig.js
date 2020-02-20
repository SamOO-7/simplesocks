import { readFileSync } from 'fs';
export function readConfig() {
    let config;
    try {
        const configText = readFileSync('config.json', 'utf-8');
        config = JSON.parse(configText);
    }
    catch (e) {
        console.error('Failed to read config.json');
        process.exit(-1);
    }
    return config;
}
