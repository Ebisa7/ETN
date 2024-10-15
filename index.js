document.addEventListener('DOMContentLoaded', function() {
  const loadingScreen = document.getElementById('loading-screen');
  const gameContainer = document.getElementById('game-container');
  const tab1Button = document.getElementById('tab1');
  let tapCount = 0;
  let lastTapTime = 0;

  // Simulate loading (2 seconds)
  setTimeout(function() {
    loadingScreen.style.display = 'none';
    gameContainer.style.display = 'block';
  }, 2000); // Adjust this timing as needed

  // Hidden tap feature for Tab 1 button
  tab1Button.addEventListener('click', function() {
    const currentTime = new Date().getTime();
    if (currentTime - lastTapTime < 500) {
      tapCount++;
    } else {
      tapCount = 1; // Reset if taps aren't fast enough
    }
    lastTapTime = currentTime;

    if (tapCount === 3) {
      tapCount = 0; // Reset tap count after 3 taps
      window.location.href = 'welcome.html';
    }
  });
});
