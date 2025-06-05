const apiUrl = 'http://127.0.0.1:5000/items'; // Modifica con il tuo endpoint API

// Funzione per ottenere e visualizzare gli utenti
function fetchUtenti() {
    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            const userList = document.getElementById('userList');
            userList.innerHTML = '';
            data.forEach(user => {
                console.log(user);
                const li = document.createElement('li');
                li.textContent = `ID: ${user.id}, Nome: ${user.name}, Età: ${user.eta}`;
                userList.appendChild(li);
            });
        })
        .catch(error => console.error('Errore:', error));
}

// Funzione per aggiungere un utente
function addUtente() {
    const name = document.getElementById('name').value;
    const eta = document.getElementById('eta').value;

    fetch(apiUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name, eta })
    })
    .then(response => response.json())
    .then(data => {
        alert(data.message);
        fetchUtenti(); // Ricarica la lista utenti
    })
    .catch(error => console.error('Errore:', error));
}

// Funzione per aggiornare un utente
function updateUtente() {
    const id = document.getElementById('updateId').value;
    const name = document.getElementById('updateName').value;
    const eta = document.getElementById('updateEta').value;

    fetch(`${apiUrl}/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name, eta })
    })
    .then(response => response.json())
    .then(data => {
        alert(data.message);
        fetchUtenti(); // Ricarica la lista utenti
    })
    .catch(error => console.error('Errore:', error));
}

// Funzione per eliminare un utente
function deleteUtente() {
    const id = document.getElementById('deleteId').value;

    fetch(`${apiUrl}/${id}`, {
        method: 'DELETE'
    })
    .then(response => response.json())
    .then(data => {
        alert(data.message);
        fetchUtenti(); // Ricarica la lista utenti
    })
    .catch(error => console.error('Errore:', error));
}

// Carica gli utenti all'avvio della pagina
document.addEventListener('DOMContentLoaded', fetchUtenti);
