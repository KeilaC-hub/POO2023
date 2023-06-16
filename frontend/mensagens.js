async function consultaMensagens(){
    const mensagens = await fetch('http://localhost:3333/mensagens')
    .then( resposta => { // quando trouxe a resposta
        return resposta.json() // retorna os dados do servidor
    })
    .catch( error => {
        alert('Erro ao consultar')
    })

    let linhasTabela = ''
    mensagens.forEach(mensagem => {
        linhasTabela += `<tr> <td> ${mensagem.titulo} </td> <td> ${mensagem.conteudo} </td> <td> ${mensagem.publicado} </td> <td> ${mensagem.qtdeLikes} </td> <td>
        <div onclick=remover('${mensagem.id}')> <i class="bi bi-trash"></i> </div> </td> <td> <div onclick="editar('${mensagem.id}', '${mensagem.titulo}', '${mensagem.conteudo}', '${mensagem.publicado}', '${mensagem.qtdeLikes}')" <i class="bi bi-pencil"></i> </div> </td> </tr>`
    })
    document.getElementById("linhasTabela").innerHTML = linhasTabela
}

function editar(id, titulo, conteudo, publicado, qtdeLikes){
    document.getElementById("titulo").value = titulo
    document.getElementById("conteudo").value = conteudo
    document.getElementById("publicado").value = publicado
    document.getElementById("qtdeLikes").value = qtdeLikes
    document.getElementById("id").value = id
}

async function remover(id){
    const confirma = confirm('Deseja realmente apagar essa mensagem?')
    if (!confirma){
        return // sai da função
    }
    // quer remover
    await fetch(`http://localhost:3333/mensagem/id/${id}`, {
        method: 'DELETE'
    })
    .then(resposta => {
        alert('Remoção com sucesso')
    })
    .catch(erro => {
        alert('Problema na remoção')
    })
    // atualizar tabela
    consultaMensagens()
}

async function cadastraMensagem(){
    // recupera os dados do formulário
    const titulo = document.getElementById("titulo").value
    const conteudo = document.getElementById("conteudo").value
    const publicado = Boolean(document.getElementById("publicado").value)
    const qtdeLikes = Number(document.getElementById("qtdeLikes").value)
    const id = document.getElementById("id").value
    let metodo
    let url
    if (id) { // tem o id
        metodo = 'PUT'
        url = `http://localhost:3333/mensagem/id/${id}` 
        document.getElementById("id").value = ''
    }
    else {
        metodo = 'POST'
        url = `http://localhost:3333/mensagem`
    }
    // mostra o objeto json
    const mensagem = {titulo, conteudo, publicado, qtdeLikes}
    // consome a api - verbo é post
    const novaMensagem = await fetch(url, {
        method: metodo,
        body: JSON.stringify(mensagem),
        headers: {
            'Content-Type': 'application/json;charset="UTF-8"'
        }
    })
    .then(resposta => {
        alert('Operação foi realizada com sucesso')
    })
    .catch(error => {
        alert('Erro durante a tentativa')
    })
    // atualiza a tabela no frontend
     consultaMensagens()
}