async function consultaMensagens(){
    let mensagens = await fetch('http://localhost:3333/mensagens')
        .then(resp => {
            return resp.json()
        })
        .catch(error => {
            alert('Erro ao buscar mensagens')
        })
    let saida = ''
    mensagens.forEach(mensagem => {
        saida += `<option value="${mensagem.id}"> ${mensagem.titulo} </option>`
    })
    document.getElementById("idSelecionado").innerHTML = saida
}

async function aumentar(){
    // recupera os dados do formulário
    const id = document.getElementById("idSelecionado").value
    const qtdeLikes = Number(document.getElementById("qtdeLikes").value)
    const corpo = {id, qtdeLikes}
    const likesUp = await fetch('http://localhost:3333/mensagem/mais', {
            method: 'PATCH',
            body: JSON.stringify(corpo),
            headers: {
                "Content-Type": "application/json;charset=UTF-8"
            }
        })
        .then(resp => {
            return resp.json()
        })
    alert(`Atualização feita com sucesso. A nova quantidade de likes é ${likesUp.qtdeLikes}`)
}