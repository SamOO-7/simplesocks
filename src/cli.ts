import { readConfig } from './readconfig'
import { startServer } from './server'
import { startClient } from './client'
import { genpass } from './genpass'

const args = process.argv.slice(2)

if (!args[0]) {
	console.log(`SimpleSocks CLI
SubCommand:
    server <config.json path>    Start a simplesocks server with config.json
    client <config.json path>    Start a simplesocks client with config.json
    genpass                      Generate a passowrd`)
	process.exit()
}
if (args[0] === 'server' || args[0] === 'client') {
	if (!args[1]) {
		console.log('Missing config.json path')
		process.exit(-1)
	}
	const config = readConfig(args[1])
	if (args[0] === 'server') {
		const server = startServer(config)
		server.listen(config.server_port, () => {
			console.log(`Server is listening on port ${config.server_port}`)
		})
	} else {
		const client = startClient(config)
		client.listen(config.client_port, () => {
			console.log(`Client is listening on port ${config.client_port}`)
		})
	}
} else if (args[0] === 'genpass') {
	const pass = genpass()
	console.log(Buffer.from(pass).toString('base64'))
} else {
	console.log(`Unknown subcommand ${args[0]}`)
}
