const form = document.querySelector("#login-form");
const urlLogin = "http://localhost:5678/api/users/login"

form.addEventListener("submit", async (event) => {
    event.preventDefault();

    // Récupération des champs du formulaire nécessaire pour l requête API
    let adminInfo = {
        email : form.elements.email.value,
        password: form.elements.password.value
    };

    // Requête POST asynchrone à l'API swagger avec les informations nécessaires pour l'identification
    const reponse = await fetch(urlLogin, {
        method: 'POST',
        headers: {
        'content-type': 'application/json'
        },
        body : JSON.stringify(adminInfo)
    });

    // Ce qu'il se passe si le statue de la requete API est du statut 200: d'abord récuperer les données recues sur l'api au format JSON
    if (reponse.ok) {
        const data = await reponse.json();


        // enregistrement du Token dans le local storage afin de pouvoir s'en servir pour la suite du Projet
        sessionStorage.setItem('token', data.token);


        // Rediriger l'utilisateur sur la page d'accueil
        window.location.href = "index.html"
    } else { // Si requête négatif (statut autre que 200), envoyer un message d'alerte sur l'écran
        alert("Identifiant ou mot de passe incorecte");
    }
})