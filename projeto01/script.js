function inserirContato(){
    const contact = {
        name: document.getElementById('name').value,
        fone: document.getElementById('fone').value,
        
    }

    let bd_contacts = []

    bd_contacts = getLocalStorage()
    console.log(bd_contacts)
    
    bd_contacts.push(contact)

    setLocalStorage(bd_contacts)

    updateTable()

}

// __________________STORAGE______________________________

function getLocalStorage(){
    return JSON.parse(localStorage.getItem('bd_contacts')) || []
}

// --------------------------------------------------------

function setLocalStorage(bd_contacts){

    localStorage.setItem('bd_contacts', JSON.stringify(bd_contacts))
}


// _________________________TABLE__________________________

function updateTable(){
    const bd_contacts = getLocalStorage();
    const tableBody = document.querySelector('#tbContacts>tbody');
    tableBody.innerHTML = ''

    bd_contacts.forEach((contact, index) => {
        newRow(contact, index)
    });
}


// ___________________________________________________

function newRow(contact, index){
    const line = document.createElement('tr')
    line.dataset.index = index

    line.innerHTML = `
        <td>${index}</td>
        <td>${contact.name}</td>
        <td>${contact.fone}</td>
        <td><button onclick="removerContato(${index})">Remover</button></td>
    `
    document.querySelector('#tbContacts>tbody').appendChild(line)
}


//_________________________Remover___________________________________

function removerContato(index) {
    const bd_contacts = getLocalStorage()
    bd_contacts.pop(index, 1)
    setLocalStorage(bd_contacts)
    
    const tableBody = document.querySelector('#tbContacts>tbody')
    const rowToRemove = tableBody.children[index] 
    tableBody.removeChild(rowToRemove)
}


//_______________________________Carregamento_____________________

window.onload = function() {
    updateTable()
};

