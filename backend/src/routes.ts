import {z} from 'zod'
import {prisma} from './lib/prisma'
import { FastifyInstance } from 'fastify'

export async function AppRoutes(server: FastifyInstance) {
    server.get('/mensagens', async() => {
        const mensagens = await prisma.mensagem.findMany()
        return mensagens
    })

server.get('/mensagem/:id', async (request) => {
    const idParam = z.object({
        id: z.string().uuid()
    })
    const {id} = idParam.parse(request.params)
    const mensagem = prisma.mensagem.findFirst({
        where: {
            id
        }
    })
    return mensagem
})

// rota para inserir mensagem
server.post('/mensagem', async (request) => {
    const mensagemBody = z.object({
        titulo: z.string(),
        conteudo: z.string(),
        publicado: z.boolean(),
        qtdeLikes: z.number()
    })

    // recupera os dados do frontend
    const {titulo, conteudo, publicado, qtdeLikes} = mensagemBody.parse(request.body)
    const newMensagem = prisma.mensagem.create({
        data: {
            titulo: titulo,
            conteudo: conteudo,
            publicado: publicado,
            qtdeLikes: qtdeLikes,
            created_at: new Date()
        }
    })
    return newMensagem
})

    // aumenta o número de likes
    server.patch('/mensagem/mais', async (request) => {
        const aumentoBody = z.object({
            id: z.string().uuid(),
            qtdeLikes: z.number()
        })
        // recupera os dados do frontend
        const {id, qtdeLikes} = aumentoBody.parse(request.body)
        //atualiza a quantidade de likes
        const likesMais = await prisma.mensagem.update({
            where: {
                id: id
            },
            data: {
                qtdeLikes: {
                    increment: qtdeLikes
                }
            }
        })
        return likesMais
    })

    server.patch('/mensagem/menos', async (request) => {
        const diminuiBody = z.object({
            id: z.string().uuid(),
            qtdeLikes: z.number()
        })
        // recupera os dados do frontend
        const {id, qtdeLikes} = diminuiBody.parse(request.body)
        //atualiza a quantidade de likes
        const resp = await prisma.mensagem.updateMany({
            where: {
                id: id,
                qtdeLikes: {
                    gte: qtdeLikes
                }
            },
            data: {
                qtdeLikes: {
                    decrement: qtdeLikes
                }
            }
        })
        if (resp.count >= 1) {
            let aux = {
                "status": "Likes atualizado com sucesso"
            }
            return aux
        }
        else {
            let aux = {
                "status": "Quantidade de likes não pode ficar negativa"
            }
            return aux
        }
    })

    // rota para atualizar uma mensagem
    server.put('/mensagem/id/:id', async (request) => {
        const idParam = z.object({
            id: z.string().uuid()
        })
        const putBody = z.object({
            titulo: z.string(),
            conteudo: z.string(),
            publicado: z.boolean(),
            qtdeLikes: z.number()
        })
        // recupera os dados do frontend com o params
        const {id} = idParam.parse(request.params)
        // recupera os dados do frontend com o body
        const {titulo, conteudo, publicado, qtdeLikes} = putBody.parse(request.body)
        // atualiza a mensagem no banco de dados
        const mensagemAtualizacao = await prisma.mensagem.update({
            where: {
                id: id
            },
            data: {
                titulo,
                conteudo,
                publicado,
                qtdeLikes
            }
        })
        return mensagemAtualizacao
    })

    // rota para remover uma mensagem
    server.delete('/mensagem/id/:id', async (request) => {
        const idParam = z.object({
            id: z.string().uuid()
        })
        // recupera dados do frontend com o params
        const {id} = idParam.parse(request.params)
        //remove do banco de dados
        const mensagemRemovida = await prisma.mensagem.delete({
            where: {
                id
            }
        })
        return mensagemRemovida
    })
}