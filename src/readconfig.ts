import { readFileSync } from 'fs'

export interface Config {
	password: string
	server_addr: string
	server_port: number
	client_port: number
}
export function readConfig(configPath: string): Config {
	let config
	try {
		const configText = readFileSync(configPath, 'utf-8')
		config = JSON.parse(configText)
	} catch (e) {
		console.error('Failed to read config.json')
		process.exit(-1)
	}
	return config
}
