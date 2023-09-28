
atualizarTabela()

function validacao(index,formulario){

    if (document.getElementById("nome").value == "" ||document.getElementById("email").value == "" || 
    document.getElementById("telefone").value == "" || document.getElementById("data").value == ""){
        console.log(" campo vazio")
        let erro = document.getElementById("erro")
        alert("preencha todos os campos")
        return
        
    }
    else{
        const formulario = {
            nome:document.getElementById("nome").value,
            email:document.getElementById("email").value,
            telefone:document.getElementById("telefone").value,
            data:document.getElementById("data").value,
        }

        const index = document.getElementById("nome").dataset.index
        if(index == 'new'){
        inserirContato(formulario)
        limparFomulario()    
        console.log("cadastrado")

        }else{
            atualizar(index, formulario)
            limparFomulario()
            document.getElementById("nome").dataset.index = 'new'
            
            document.getElementById("nome").disabled = false
            document.getElementById("data").disabled = false
            
            console.log("editando")
            console.log(formulario)
        }
    }
}
//limpar formulario-----------------------------------------------------------------
function limparFomulario(){
    let limpar = document.querySelectorAll(".form-input")
    limpar.forEach(limpo => limpo.value = "")
}



//--------------------------------------------------------------------------
let contato = []

//create-----------------------------------------------
function inserirContato(formulario){
    contato = getStorage()
    contato.push(formulario)
    setStorage(contato)

    atualizarTabela()
    

}

//storage-------------------------------------

function getStorage(){
    return JSON.parse(localStorage.getItem('db_contato')) || []
}

function setStorage(contato){
    localStorage.setItem('db_contato', JSON.stringify(contato))

}

//update lista iD----------------------------------------------------------

function atualizar(index, formulario){
    contato = getStorage()
    contato[index] = formulario
    setStorage(contato)

    atualizarTabela()
}

//deletar---------------------------------------------------

function deletar(index){
    let msg = confirm("deseja excluir o contato")
    if(msg){
        let contato = getStorage()
        contato.splice(index, 1)
        setStorage(contato)

        atualizarTabela()

    }
}

//preencher campos
function preencherForm(formulario){
    document.getElementById("nome").value = formulario.nome
    document.getElementById("email").value = formulario.email
    document.getElementById("telefone").value = formulario.telefone
    document.getElementById("data").value = formulario.data
    document.getElementById("nome").dataset.index = formulario.index

    document.getElementById("nome").disabled = true
    document.getElementById("data").disabled = true



}

//editar-------------------------------------------------------

function editar(index){
    let formulario = getStorage()[index]
    formulario.index = index
    preencherForm(formulario)



}

//atualiza tabela---------------------------------------------

function atualizarTabela(){
    let contato = getStorage()
    limparTabela()
    contato.forEach(tabelaLinha)
}

//adicionar tabela---------------------------------

function tabelaLinha(contato,index){
    let linha = document.createElement('tr')
    linha.innerHTML = `
        <td>${index}</td>
        <td>${contato.nome}</td>
        <td>${contato.email}</td>
        <td>${contato.telefone}</td>
        <td>${contato.data}</td>
        <td><button class = "bteditar" onclick = 'editar(${index})'>Editar</button></td>
        <td><button onclick = 'deletar(${index})'>Remover</button></td>
    `

    document.querySelector('#contatoTabela> tbody').appendChild(linha)
}

//limpar tabela duplicada--------------------------------------------------------

function limparTabela(){
    let linha = document.querySelector('#contatoTabela>tbody')
    linha.innerHTML= ""

}

//eventos-----------------------------------------------------------
let btEnviar = document.getElementById("btEnviar")
btEnviar.addEventListener("click",validacao)