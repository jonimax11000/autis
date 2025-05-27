import './components/empleatsCard.js';

document.addEventListener('DOMContentLoaded',async() =>{
    const userMenu = document.getElementById('menu-empleados');
    const menuItems = document.querySelectorAll('.menu-item');
    
    

    


    userMenu.addEventListener('click',handleUsers);

})


async function handleUsers(e) {
    
    
    e.preventDefault();

    const contentDiv = document.getElementById('content');
    contentDiv.innerHTML = '';

    try {
        const response = await fetch('/usuarios', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
        
        });

        if (!response.ok) {
            throw new Error(response.statusText);
        }

        const data = await response.json();
        data.forEach(item => {
            const empleat = document.createElement('empleat-card');
            console.log(empleat);
            empleat.setAttribute('empleats-id', item.id);
            empleat.setAttribute('empleats-nom', `${item.firstname} ${item.lastname}`); // Muestra nombre y apellido
            contentDiv.appendChild(empleat);
        });
        console.log(contentDiv);

    } catch (error) {
        console.error("Error fetching user data:", error);
    }
}
