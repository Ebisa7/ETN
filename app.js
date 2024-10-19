document.addEventListener('DOMContentLoaded', function() {
  const loadingScreen = document.getElementById('loading-screen');
  const tutorialContainer = document.getElementById('tutorial-container');
  const gameContainer = document.getElementById('game-container');
  const continueButtons = document.querySelectorAll('.continue-button');
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

  // Triple tap on Home tab to show welcome page
  const homeTab = document.getElementById('home-tab');
  homeTab.addEventListener('click', function() {
    const currentTime = new Date().getTime();
    if (currentTime - lastTapTime < 300) {
      tapCount++;
      if (tapCount === 3) {
        tapCount = 0;
        loadingScreen.style.display = 'flex';
        tutorialContainer.style.display = 'block';
        gameContainer.style.display = 'none';
      }
    } else {
      tapCount = 1;
    }
    lastTapTime = currentTime;
    highlightActiveTab(homeTab);
  });

  // Highlight active tab
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
