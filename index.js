document.addEventListener('DOMContentLoaded', function() {
  const loadingScreen = document.getElementById('loading-screen');
  const gameContainer = document.getElementById('game-container');

  // Simulate loading (2 seconds)
  setTimeout(function() {
    loadingScreen.style.display = 'none';
    gameContainer.style.display = 'block';
  }, 2000); // Adjust this timing as needed
});
