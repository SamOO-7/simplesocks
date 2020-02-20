import { readFileSync } from 'fs'

interface Config {
	password: string
	server_addr: string
	server_port: number
	client_port: number
}
export function readConfig(): Config {
	let config
	try {
		const configText = readFileSync('config.json', 'utf-8')
		config = JSON.parse(configText)
	} catch (e) {
		console.error('Failed to read config.json')
		process.exit(-1)
	}
	return config
}
