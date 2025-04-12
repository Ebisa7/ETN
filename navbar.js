// Firebase Auth Initialization
function initFirebaseAuth() {
    // Fetch Firebase configuration from fire.json
    fetch('fire.json')
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to load Firebase configuration');
        }
        return response.json();
      })
      .then(firebaseConfig => {
        // Initialize Firebase
        firebase.initializeApp(firebaseConfig);
        const auth = firebase.auth();
  
        // Auth state listener
        auth.onAuthStateChanged((user) => {
          const loggedOutView = document.getElementById('logged-out-view');
          const loggedInView = document.getElementById('logged-in-view');
          const navbarAvatar = document.getElementById('navbar-avatar');
          const navbarUsername = document.getElementById('navbar-username');
  
          if (user) {
            if (loggedOutView) loggedOutView.classList.add('d-none');
            if (loggedInView) loggedInView.classList.remove('d-none');
  
            // Update user info
            const displayName = user.displayName || user.email.split('@')[0];
            if (navbarUsername) navbarUsername.textContent = displayName;
  
            if (user.photoURL && navbarAvatar) {
              navbarAvatar.src = user.photoURL;
            } else if (navbarAvatar) {
              // Generate initials avatar
              const initials = displayName.split(' ').map(n => n[0]).join('').toUpperCase();
              navbarAvatar.src = `https://ui-avatars.com/api/?name=${initials}&background=f39c12&color=fff`;
            }
          } else {
            if (loggedOutView) loggedOutView.classList.remove('d-none');
            if (loggedInView) loggedInView.classList.add('d-none');
          }
        });
  
        // Make auth functions global
        window.login = () => {
          window.location.href = '/login?redirect=' + encodeURIComponent(window.location.pathname);
        };
  
        window.handleSignOut = () => {
          auth.signOut().then(() => {
            console.log("User signed out");
          }).catch((error) => {
            console.error('Sign out error:', error);
          });
        };
      })
      .catch(error => {
        console.error('Error initializing Firebase:', error);
      });
  }
  
  // Load navbar and initialize everything
  document.addEventListener("DOMContentLoaded", function() {
    // Load navbar
    fetch("navbar.html") // Or the correct path.
      .then(response => response.text())
      .then(data => {
        document.getElementById("navbar-placeholder").innerHTML = data;
        // Initialize Firebase after navbar is loaded
        initFirebaseAuth();
      })
      .catch(error => console.error("Error loading navbar:", error));
  });
