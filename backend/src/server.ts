import Fastify from 'fastify'
const server = Fastify()
import cors from '@fastify/cors'

import {AppRoutes} from './routes'

server.register(AppRoutes)
server.register(cors)

server.listen({
    port: 3333
})
.then (() => {
    console.log('HTTP Server running and listening on port 3333')
})