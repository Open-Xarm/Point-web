import { auth } from './app.js';
import { createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.10.0/firebase-auth.js";


const signupForm = document.getElementById('signup-form');
const confirmationSection = document.getElementById('confirmation');

document.getElementById('signup-form').addEventListener('submit', (event) => {
  event.preventDefault();

  validateSignupForm(event);
});

function validateSignupForm(event) {
    event.preventDefault();
    console.log('Validating signup form');

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirm-password').value;

    if (password !== confirmPassword) {
        alert("Les mots de passe ne correspondent pas.");
        return false;
    }

    if (!validateEmail(email) || !validatePassword(password)) {
        alert("Veuillez entrer un email valide et un mot de passe sécurisé.");
        return false;
    }

    createFirebaseAccount(email, password);
}

function createFirebaseAccount(email, password) {
    console.log('Creating Firebase account');
    createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            const user = userCredential.user;
            alert("Compte créé avec succès.");
            generatePDF(email, password);
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            alert(`Erreur: ${errorMessage}`);
        });
}

function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

function validatePassword(password) {
    const re = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d).{8,}$/;
    return re.test(password);
}

function generatePDF(email, password) {
    console.log('Generating PDF');
    const docDefinition = {
        content: [
            { text: 'Point - Informations de Connexion', style: 'header' },
            { text: 'Votre compte a été créé avec succès.', margin: [0, 20] },
            { text: `Email : ${email}`, margin: [0, 10] },
            { text: `Mot de passe : ${password}`, margin: [0, 10] },
            { text: 'Détails sur l\'application Point et PointGS:', style: 'subheader', margin: [0, 20] },
        ],
        styles: {
            header: {
                fontSize: 22,
                bold: true
            },
            subheader: {
                fontSize: 16,
                bold: true
            }
        }
    };

    pdfMake.createPdf(docDefinition).download('Point_Connexion.pdf');

    signupForm.classList.add('hidden');
    confirmationSection.classList.remove('hidden');
}
