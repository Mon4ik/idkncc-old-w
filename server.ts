import {parse} from 'url'
import next from 'next'
import express from 'express'
import serveIndex from 'serve-index'

const port = parseInt(process.env.PORT || '3000', 10)
const dev = process.env.NODE_ENV !== 'production'
const nextServer = next({dev})
const handle = nextServer.getRequestHandler()

const app = express()

app.use("/viewer", express.static("public"), serveIndex("public"))

nextServer.prepare().then(() => {
	app.all("*", (req, res) => {
		const parsedUrl = parse(req.url!, true)
		handle(req, res, parsedUrl)
	})

	app.listen(port)

	console.log(
		`> Server listening at http://localhost:${port} as ${
			dev ? 'development' : process.env.NODE_ENV
		}`
	)
})