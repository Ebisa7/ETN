import { initializeApp } from "firebase/app";
import { getFirestore, doc, setDoc, getDoc } from "firebase/firestore";

// Firebase Config
const firebaseConfig = {
    apiKey: "YOUR_API_KEY",
    authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
    projectId: "YOUR_PROJECT_ID",
    storageBucket: "YOUR_PROJECT_ID.appspot.com",
    messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
    appId: "YOUR_APP_ID"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Telegram Web App API Integration
Telegram.WebApp.ready();
const userId = Telegram.WebApp.initDataUnsafe.user.id;
const username = Telegram.WebApp.initDataUnsafe.user.username || "@guest";
document.getElementById("username").textContent = `@${username}`;

// Function to update and fetch user's coin balance
async function getUserCoins() {
    const userDoc = await getDoc(doc(db, "users", userId));
    if (userDoc.exists()) {
        const userData = userDoc.data();
        document.getElementById("coin-balance").textContent = userData.coins || 0;
    } else {
        await setDoc(doc(db, "users", userId), { coins: 0 });
        document.getElementById("coin-balance").textContent = 0;
    }
}

// Call the function to set the user's coin balance on page load
getUserCoins();

// Add event listener to the game play button (placeholder)
document.getElementById("play-game").addEventListener("click", () => {
    alert("Game starting...");
    // Add logic for your drop game
});

// Navigation
document.getElementById("home-tab").addEventListener("click", () => {
    alert("You are on the Home Page!");
});

document.getElementById("tasks-tab").addEventListener("click", () => {
    alert("Switching to Tasks Page...");
    // Logic to switch pages will go here
});
