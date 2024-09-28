import { initializeApp } from "https://www.gstatic.com/firebasejs/9.1.3/firebase-app.js";
import { getDatabase, ref, onValue } from "https://www.gstatic.com/firebasejs/9.1.3/firebase-database.js";

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

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
const dbRef = ref(database, 'schools');

// Assurer que le DOM est complètement chargé avant d'exécuter le code
document.addEventListener("DOMContentLoaded", () => {
    const schoolList = document.getElementById('school-list');
    const searchBar = document.getElementById('search-bar');

    // Vérifier que les éléments existent dans le DOM
    if (!schoolList || !searchBar) {
        console.error('schoolList ou searchBar non trouvé dans le DOM.');
        return;
    }

    // Fonction pour récupérer les écoles depuis Firebase
    function fetchSchools(query = "") {
        schoolList.innerHTML = ''; // Vider la liste avant de la remplir

        onValue(dbRef, (snapshot) => {
            if (snapshot.exists()) {
                // Parcourir chaque école dans la base de données
                snapshot.forEach((childSnapshot) => {
                    const schoolKey = childSnapshot.key; // ex: point:lbac:edu
                    const schoolData = childSnapshot.val().infos;

                    if (schoolData) {
                        const schoolName = schoolData.nom || 'Nom non disponible';
                        const logoUrl = schoolData.logoimg || 'default-logo.png'; // Image par défaut si logo absent
                        const phone = schoolData.phone || 'Numéro de téléphone non disponible';

                        // Filtrer en fonction de la requête
                        if (schoolName.toLowerCase().includes(query.toLowerCase())) {
                            const schoolItem = document.createElement('div');
                            schoolItem.classList.add('school-item');
                            schoolItem.innerHTML = `
                                <img class="school-logo" src="${logoUrl}" alt="Logo de l'école">
                                <div>
                                    <h3>${schoolName}</h3>
                                    <p style="font-size: 14px;"><strong>Téléphone :</strong> ${phone}</p>
                                    <p style="font-size: 14px;"><strong>eduLink :</strong> ${schoolKey}</p>
                                </div>
                            `;
                            schoolList.appendChild(schoolItem);
                        }
                    } else {
                        console.error("Les données de l'école sont manquantes dans Firebase.");
                    }
                });
            } else {
                console.error("Aucune école trouvée dans Firebase.");
                schoolList.innerHTML = '<p>Aucune école trouvée.</p>';
            }
        }, (error) => {
            console.error("Erreur lors de la récupération des données :", error);
        });
    }

    // Écouteur d'événements pour la barre de recherche
    searchBar.addEventListener('input', (e) => {
        const query = e.target.value;
        fetchSchools(query); // Filtrer les écoles selon la recherche
    });

    // Charger toutes les écoles au démarrage
    fetchSchools();
});
