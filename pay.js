import { initializeApp } from "https://www.gstatic.com/firebasejs/9.1.3/firebase-app.js";
import { getDatabase, ref, push } from "https://www.gstatic.com/firebasejs/9.1.3/firebase-database.js";

// Initialisez Firebase
const firebaseConfig = {
    apiKey: "AIzaSyCG6t7s5g-WPe2hU6urxgWxkFcymNyeQY4",
    authDomain: "point-e94aa.firebaseapp.com",
    databaseURL: "https://point-e94aa-default-rtdb.firebaseio.com",
    projectId: "point-e94aa",
    storageBucket: "point-e94aa.appspot.com",
    messagingSenderId: "912986723068",
    appId: "1:912986723068:web:fef95c0654fa78f590fd79",
    measurementId: "G-BCMS4MQY7L"
};

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

// Écoute de l'événement de soumission du formulaire
document.addEventListener("DOMContentLoaded", () => {
    document.getElementById('payment-form').addEventListener('submit', function (e) {
        e.preventDefault();
        console.log("Formulaire soumis");

        // Récupération des valeurs du formulaire
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const phone = document.getElementById('phone').value;
        const amount = document.getElementById('amount').value;
        const transactionNumber = document.getElementById('transaction-number').value;

        // Création d'un objet achat
        const purchaseData = {
            name: name,
            email: email,
            phone: phone,
            amount: amount,
            transactionNumber: transactionNumber,
            timestamp: new Date().toISOString()
        };

        // Envoi des données à Firebase
        const purchasesRef = ref(database, 'Achats');
        push(purchasesRef, purchaseData)
            .then(() => {
                alert('Votre demande de licence a été soumise. Nous vérifierons votre paiement et vous enverrons la licence par e-mail.');
                document.getElementById('payment-form').reset();
            })
            .catch((error) => {
                console.error('Erreur lors de l\'ajout de l\'achat : ', error);
                alert('Une erreur s\'est produite. Veuillez réessayer plus tard.');
            });
    });
});