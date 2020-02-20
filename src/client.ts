import { createServer, createConnection } from 'net'
import { createDuplexEncrypter } from './encrypt'
import { pipeline } from 'stream'
import { readConfig } from './readconfig'

const config = readConfig()
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

server.listen(config.client_port, 'localhost', () =>
	console.log('Client is listening on ' + config.client_port)
)
