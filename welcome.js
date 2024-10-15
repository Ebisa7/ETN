document.addEventListener('DOMContentLoaded', function() {
  const continueButtons = document.querySelectorAll('.continue-button');
  let currentPage = 1;

  // Check if welcome screen has been shown before
  if (localStorage.getItem('welcomeShown')) {
    // If shown, redirect to the game
    window.location.href = 'index.html';
  } else {
    // Tutorial continue functionality
    continueButtons.forEach(button => {
      button.addEventListener('click', () => {
        if (currentPage === 3) {
          localStorage.setItem('welcomeShown', 'true'); // Set item in local storage
          window.location.href = 'index.html'; // Redirect to main game page
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
  }
});
