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