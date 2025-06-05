// Funzione per cambiare tab
function openTab(evt, tabName) {
    const tabContents = document.getElementsByClassName("tab-content");
    for (let i = 0; i < tabContents.length; i++) {
        tabContents[i].classList.remove("active");
    }

    const tabButtons = document.getElementsByClassName("tab-button");
    for (let i = 0; i < tabButtons.length; i++) {
        tabButtons[i].classList.remove("active");
    }

    document.getElementById(tabName).classList.add("active");
    evt.currentTarget.classList.add("active");
}

// Funzione per mostrare la risposta
function showResponse(elementId, data, isError = false) {
    const responseElement = document.getElementById(elementId);
    responseElement.textContent = JSON.stringify(data, null, 2);
    responseElement.className = isError ? "response error" : "response success";
}

// Funzione per gestire gli errori
function handleError(error, elementId) {
    console.error('Error:', error);
    showResponse(elementId, { error: error.message }, true);
}

// API Functions
async function getAllUsers() {
    try {
        const response = await fetch('items');
        const data = await response.json();
        showResponse('all-users-response', data);
    } catch (error) {
        handleError(error, 'all-users-response');
    }
}

async function getUserById() {
    const userId = document.getElementById('get-user-id').value;
    if (!userId) {
        alert('Inserisci un ID utente');
        return;
    }

    try {
        const response = await fetch(`items/${userId}`);
        const data = await response.json();
        showResponse('user-by-id-response', data);
    } catch (error) {
        handleError(error, 'user-by-id-response');
    }
}

async function createUser() {
    const name = document.getElementById('post-name').value;
    const eta = document.getElementById('post-eta').value;

    if (!name || !eta) {
        alert('Inserisci sia nome che età');
        return;
    }

    try {
        const response = await fetch('items', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name, eta: parseInt(eta) })
        });
        const data = await response.json();
        showResponse('create-user-response', data);
    } catch (error) {
        handleError(error, 'create-user-response');
    }
}

async function updateUser() {
    const id = document.getElementById('put-id').value;
    const name = document.getElementById('put-name').value;
    const eta = document.getElementById('put-eta').value;

    if (!id || !name || !eta) {
        alert('Inserisci tutti i campi');
        return;
    }

    try {
        const response = await fetch(`items/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name, eta: parseInt(eta) })
        });
        const data = await response.json();
        showResponse('update-user-response', data);
    } catch (error) {
        handleError(error, 'update-user-response');
    }
}

async function deleteUser() {
    const id = document.getElementById('delete-id').value;
    if (!id) {
        alert('Inserisci un ID utente');
        return;
    }

    try {
        const response = await fetch(`items/${id}`, {
            method: 'DELETE'
        });
        const data = await response.json();
        showResponse('delete-user-response', data);
    } catch (error) {
        handleError(error, 'delete-user-response');
    }
}