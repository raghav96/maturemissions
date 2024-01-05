/**
 * File: SignOut.js
 * Description: This function clears local storage and redirects the user to the login page.
**/ 

function SignOut() {
    // Clear local storage to log out the user
    localStorage.clear();
    // Clear browser history and redirect to the login page
    window.history.pushState(null, null, '/login');
    window.location.replace('/login');
}

export default SignOut;
