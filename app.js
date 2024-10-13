// Telegram Web App API integration
Telegram.WebApp.ready();

document.getElementById("username").textContent = Telegram.WebApp.initDataUnsafe.user.username || "@guest";

// Coin balance from Firebase or predefined
let coinBalance = 200;
document.getElementById("coin-balance").textContent = coinBalance;

// Play Game event
document.getElementById("play-game").addEventListener("click", () => {
    alert("Game starting... Drop coins!");
    // Your drop game logic
});
