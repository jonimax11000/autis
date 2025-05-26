
document.addEventListener('DOMContentLoaded',async() =>{
    const userMenu = document.getElementById('menu-empleados');

    console.log(userMenu);

    userMenu.addEventListener('click',handleUsers);

})


async function handleUsers(e) {
    
    e.preventDefault();
    console.log("hello");

    const contentDiv = document.getElementById('content');
    contentDiv.innerHTML = '';

    try {
        const response = await fetch('/users', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ test: "hello" })
        });

        if (!response.ok) {
            throw new Error(response.statusText);
        }

        const data = await response.json();
        data.forEach(item => {
            const paragraph = document.createElement('p');
            paragraph.textContent = item; // Adjust this based on the structure of your data
            contentDiv.appendChild(paragraph);
        });

    } catch (error) {
        console.error("Error fetching user data:", error);
    }
}



const form = document.getElementById('openproject');

form.addEventListener('submit', async (e) => {
    // Inhibim l'enviament automàtic del formulari
    e.preventDefault();

    
    const formData = new FormData(form);


    try {
        const response = await fetch('/enviar-matricula', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ prueba: "hola" })
        });

        console.log("Response:", response);

        if (!response.ok) {
            throw new Error(response.statusText);
        }
        

        return;

    } catch (error) {
        console.error(error);
        throw error;
    }

});