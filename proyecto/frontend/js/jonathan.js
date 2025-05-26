const form = document.getElementById('openproject');


form.addEventListener('submit', async (e) => {
    // Inhibim l'enviament automàtic del formulari
    e.preventDefault();


    
    const formData = new FormData(form);

   
    try {
        const response = await fetch('/usuarios', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ tocken: "9b8992b395a58440d18778eb4a2d19d17d91dfef4ea0f0a7c6984806c1573554" })
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