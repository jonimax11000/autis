
document.addEventListener('DOMContentLoaded',async() =>{
    try {
        const tocken = localStorage.getItem('token');
        if (tocken) {
            console.log(tocken);
            const response = await fetch('/tocken', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ "tocken":token })
            });

            if (!response.status) {
                throw new Error(response.statusText);
            }

            const data = await response.json();
            console.log("Data received:", data);
        } else {
            console.warn("No token found in local storage.");
        }
    } catch (error) {
        console.error("Error fetching data:", error);
    }
})


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