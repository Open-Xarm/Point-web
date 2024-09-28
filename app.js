import { initializeApp } from "https://www.gstatic.com/firebasejs/9.10.0/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/9.10.0/firebase-auth.js";
import { getDatabase, ref, set, get } from "https://www.gstatic.com/firebasejs/9.10.0/firebase-database.js";

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

// Initialisation de l'application Firebase
const app = initializeApp(firebaseConfig);

// Initialisation des services Firebase
const auth = getAuth(app);
const database = getDatabase(app);

export { auth, database, app };
