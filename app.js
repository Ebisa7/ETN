document.addEventListener('DOMContentLoaded', function() {
  const loadingScreen = document.getElementById('loading-screen');
  const tutorialContainer = document.getElementById('tutorial-container');
  const gameContainer = document.getElementById('game-container');
  const continueButtons = document.querySelectorAll('.continue-button');
  const coinBalanceDisplay = document.getElementById('coinBalance');
  const playGameImage = document.getElementById('playGame');

  let currentPage = 1;
  let tapCount = 0;
  let lastTapTime = 0;

  // Simulate loading
  setTimeout(function() {
    loadingScreen.style.display = 'none';
    tutorialContainer.style.display = 'block';
  }, 5000); // 5 seconds loading

  // Tutorial swipe/continue functionality
  continueButtons.forEach(button => {
    button.addEventListener('click', () => {
      if (currentPage === 3) {
        tutorialContainer.style.display = 'none';
        gameContainer.style.display = 'block';
      } else {
        currentPage++;
        showPage(currentPage);
      }
    });
  });

  function showPage(pageNumber) {
    document.querySelectorAll('.page').forEach(page => {
      page.style.display = 'none';
    });
    document.getElementById('page' + pageNumber).style.display = 'flex';
  }

  // Retrieve and display coin balance from local storage
  let coinBalance = parseFloat(localStorage.getItem('coinBalance')) || 0;
  coinBalanceDisplay.textContent = `${coinBalance.toFixed(1)} ETN`;

  // Play game image click (navigates to game.html)
  playGameImage.addEventListener('click', function() {
    window.location.href = 'game.html';
  });

  // Check if new coin balance exists from game.html (using sessionStorage for this session's score)
  let newCoinsEarned = parseFloat(sessionStorage.getItem('newCoins')) || 0;

  if (newCoinsEarned > 0) {
    // Update the total coin balance
    coinBalance += newCoinsEarned;
    // Save the new total balance in localStorage
    localStorage.setItem('coinBalance', coinBalance);
    // Update the displayed balance
    coinBalanceDisplay.textContent = `${coinBalance.toFixed(1)} ETN`;
    // Clear the session data
    sessionStorage.removeItem('newCoins');
  }

  // Tabs functionality
  const homeTab = document.getElementById('home-tab');
  const tasksTab = document.getElementById('tasks-tab');
  const inviteTab = document.getElementById('invite-tab');
  const airdropTab = document.getElementById('airdrop-tab');

  homeTab.addEventListener('click', function() {
    window.location.href = 'index.html';
  });

  tasksTab.addEventListener('click', function() {
    window.location.href = 'tasks.html';
  });

  inviteTab.addEventListener('click', function() {
    window.location.href = 'invite.html';
  });

  airdropTab.addEventListener('click', function() {
    window.location.href = 'airdrop.html';
  });

  // Highlight active tab (for future functionality)
  function highlightActiveTab(activeTab) {
    const tabs = document.querySelectorAll('.tab');
    tabs.forEach(tab => {
      tab.classList.remove('active');
    });
    activeTab.classList.add('active');
  }

  // Start with page 1 visible
  showPage(1);
});
