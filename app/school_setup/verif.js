import { initializeApp } from "https://www.gstatic.com/firebasejs/9.10.0/firebase-app.js";
import { getAuth, signOut, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/9.10.0/firebase-auth.js";
import { getDatabase, ref, get } from "https://www.gstatic.com/firebasejs/9.10.0/firebase-database.js";

// Configuration Firebase
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

// Initialisation Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const database = getDatabase(app);

// Fonction pour vérifier les données de l'utilisateur
function checkSchoolAndAccountStats(user) {
    const userId = user.uid;
    const userRef = ref(database, `users/${userId}`);

    get(userRef).then(snapshot => {
        const progressDialog = document.getElementById('progressDialog');
        progressDialog.style.display = 'none'; // Cacher le dialog de progression

        if (snapshot.exists()) {
            const data = snapshot.val();
            const isSchoolEmpty = !data.school || data.school === '';
            const isAccountStatsEmpty = !data.accountStats || data.accountStats === '';

            if (isSchoolEmpty && isAccountStatsEmpty) {
                // Afficher le dialogue pour compte non activé
                showAccountNotActivatedDialog();
            } else {
                // Rediriger vers la page principale
                window.location.href = '../main/mainpage.html';
            }
        } else {
            alert('Erreur : Données utilisateur non trouvées.');
            showErrorNotActivatedDialog();
        }
    }).catch(error => {
        progressDialog.style.display = 'none'; // Cacher le dialog de progression
        alert('Erreur lors de la récupération des données.');
        signOut(auth).then(() => {
            window.location.href = '../signin.html';
        }).catch(error => {
            console.error('Erreur lors de la déconnexion :', error);
        });
    });
}

// Écouter les changements de l'état de connexion
onAuthStateChanged(auth, user => {
    if (user) {
        checkSchoolAndAccountStats(user);
    } else {
        alert('Utilisateur non connecté.');
        window.location.href = '../signin.html';
    }
});

// Fonctions pour afficher les dialogues
function showAccountNotActivatedDialog() {
    // Code pour afficher le dialogue de compte non activé
    alert('Compte non activé.');
}

function showErrorNotActivatedDialog() {
    // Code pour afficher le dialogue d'erreur
    alert('Erreur : Activation non réussie.');
}
