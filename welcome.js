document.addEventListener('DOMContentLoaded', function() {
  const loadingScreen = document.getElementById('loading-screen');
  const tutorialContainer = document.getElementById('tutorial-container');
  const continueButtons = document.querySelectorAll('.continue-button');
  let currentPage = 1;

  // Simulate loading
  setTimeout(function() {
    loadingScreen.style.display = 'none';
    tutorialContainer.style.display = 'block';
  }, 2000); // 2 seconds loading

  // Tutorial swipe/continue functionality
  continueButtons.forEach(button => {
    button.addEventListener('click', () => {
      if (currentPage === 3) {
        // After tutorial, redirect to index.html
        window.location.href = 'index.html';
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

  // Start with page 1 visible
  showPage(1);
});
