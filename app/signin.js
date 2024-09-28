import { auth } from '../app.js';
import { signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.10.0/firebase-auth.js";

// Obtenir les éléments du DOM
const emailInput = document.getElementById('email_input');
const passwordInput = document.getElementById('password_input');
const loginButton = document.getElementById('login_button');
const emailError = document.getElementById('email_error');
const passwordError = document.getElementById('password_error');

// Gérer la connexion
loginButton.addEventListener('click', () => {
    const email = emailInput.value;
    const password = passwordInput.value;

    // Réinitialiser les messages d'erreur
    emailError.style.display = 'none';
    passwordError.style.display = 'none';

    // Authentification Firebase
    signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // Connexion réussie
            window.location.href = './school_setup/schoolsetup.html'; // Redirection
        })
        .catch((error) => {
            // Afficher les erreurs
            if (error.code.includes('auth/invalid-email')) {
                emailError.style.display = 'block';
            } else if (error.code.includes('auth/wrong-password')) {
                passwordError.style.display = 'block';
            } else {
                console.error('Erreur d\'authentification:', error.message);
            }
        });
});
