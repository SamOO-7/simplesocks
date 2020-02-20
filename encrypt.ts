import { Duplex } from 'stream'

export function createDuplexEncrypter(passBase64: string) {
	const pass = Array.from(Buffer.from(passBase64, 'base64'))
	const invertedPass = []
	for (let i = 0; i < 256; i++) {
		invertedPass[i] = pass.indexOf(i)
	}
	return (duplex: Duplex) => {
		const _write = duplex._write.bind(duplex)
		duplex._write = (chunk, encoding, callback) => {
			for (let i = 0; i < chunk.length; i++) {
				chunk[i] = pass[chunk[i]]
			}
			_write(chunk, encoding, callback)
		}
		const push = duplex.push.bind(duplex)
		duplex.push = (chunk, encoding?) => {
			if (!chunk) return push(null, encoding)
			for (let i = 0; i < chunk.length; i++) {
				chunk[i] = invertedPass[chunk[i]]
			}
			return push(chunk, encoding)
		}
	}
}
