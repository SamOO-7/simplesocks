const rand = (min: number, max: number) =>
	Math.floor(Math.random() * (max - min + 1)) + 1 // random int between min(inclusive) and max(inclusive)

export function genpass() {
	const arr: number[] = []
	for (let i = 0; i < 256; i++) {
		arr[i] = i
	}
	for (let i = 0; i < 256; i++) {
		const target = rand(i, 255)
		let tmp = arr[i]
		arr[i] = arr[target]
		arr[target] = tmp
	}
	return arr
}

if (require.main === module) {
	const pass = genpass()
	console.log(Buffer.from(pass).toString('base64'))
}
