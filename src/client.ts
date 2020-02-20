import { createServer, createConnection } from 'net'
import { createDuplexEncrypter } from './encrypt'
import { pipeline } from 'stream'
import { Config } from './readconfig'

export function startClient(config: Config) {
	const encrypter = createDuplexEncrypter(config.password)
	const server = createServer(socket => {
		const conn = createConnection(config.server_port, config.server_addr)
		encrypter(conn)
		pipeline(conn, socket, conn, err => {
			if (err) {
				console.error('Something went wrong: ', err)
			}
		})
	})
	return server
}
