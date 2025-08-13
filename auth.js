// Authentication JavaScript
class AuthManager {
    constructor() {
        this.users = JSON.parse(localStorage.getItem('users')) || [];
        this.currentUser = JSON.parse(localStorage.getItem('currentUser')) || null;
        
        // Create demo user if no users exist
        if (this.users.length === 0) {
            this.createDemoUser();
        }
        
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.checkAuthStatus();
        this.setupPasswordStrength();
    }

    setupEventListeners() {
        // Login form
        const loginForm = document.getElementById('loginForm');
        if (loginForm) {
            loginForm.addEventListener('submit', (e) => this.handleLogin(e));
        }

        // Signup form
        const signupForm = document.getElementById('signupForm');
        if (signupForm) {
            signupForm.addEventListener('submit', (e) => this.handleSignup(e));
        }



        // Password visibility toggles
        document.addEventListener('click', (e) => {
            if (e.target.closest('.password-toggle')) {
                const inputId = e.target.closest('.password-toggle').getAttribute('onclick').match(/'([^']+)'/)[1];
                this.togglePasswordVisibility(inputId);
            }
        });
    }

    setupPasswordStrength() {
        const passwordInput = document.getElementById('password');
        if (passwordInput) {
            passwordInput.addEventListener('input', (e) => this.checkPasswordStrength(e.target.value));
        }
    }

    checkPasswordStrength(password) {
        const strengthDiv = document.getElementById('passwordStrength');
        if (!strengthDiv) return;

        let strength = 0;
        let feedback = [];

        // Length check
        if (password.length >= 8) {
            strength += 1;
        } else {
            feedback.push('At least 8 characters');
        }

        // Uppercase check
        if (/[A-Z]/.test(password)) {
            strength += 1;
        } else {
            feedback.push('One uppercase letter');
        }

        // Lowercase check
        if (/[a-z]/.test(password)) {
            strength += 1;
        } else {
            feedback.push('One lowercase letter');
        }

        // Number check
        if (/\d/.test(password)) {
            strength += 1;
        } else {
            feedback.push('One number');
        }

        // Special character check
        if (/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
            strength += 1;
        } else {
            feedback.push('One special character');
        }

        // Update UI
        strengthDiv.className = 'password-strength';
        if (password.length === 0) {
            strengthDiv.textContent = '';
        } else if (strength <= 2) {
            strengthDiv.textContent = 'Weak password';
            strengthDiv.classList.add('weak');
        } else if (strength <= 4) {
            strengthDiv.textContent = 'Medium strength';
            strengthDiv.classList.add('medium');
        } else {
            strengthDiv.textContent = 'Strong password';
            strengthDiv.classList.add('strong');
        }
    }

    togglePasswordVisibility(inputId) {
        const input = document.getElementById(inputId);
        const toggle = input.nextElementSibling;
        
        if (input.type === 'password') {
            input.type = 'text';
            toggle.innerHTML = `
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 7c2.76 0 5 2.24 5 5 0 .65-.13 1.26-.36 1.83l2.92 2.92c1.51-1.26 2.7-2.89 3.43-4.75-1.73-4.39-6-7.5-11-7.5-1.4 0-2.74.25-3.98.7l2.16 2.16C10.74 7.13 11.35 7 12 7zM2 4.27l2.28 2.28.46.46C3.08 8.3 1.78 10.02 1 12c1.73 4.39 6 7.5 11 7.5 1.55 0 3.03-.3 4.38-.84l.42.42L19.73 22 21 20.73 3.27 3 2 4.27zM7.53 9.8l1.55 1.55c-.05.21-.08.43-.08.65 0 1.66 1.34 3 3 3 .22 0 .44-.03.65-.08l1.55 1.55c-.67.33-1.41.53-2.2.53-2.76 0-5-2.24-5-5 0-.79.2-1.53.53-2.2zm4.31-.78l3.15 3.15.02-.16c0-1.66-1.34-3-3-3l-.17.01z"/>
                </svg>
            `;
        } else {
            input.type = 'password';
            toggle.innerHTML = `
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z"/>
                </svg>
            `;
        }
    }

    async handleLogin(e) {
        e.preventDefault();
        
        const form = e.target;
        const email = form.email.value.trim();
        const password = form.password.value;
        const remember = form.remember?.checked || false;

        // Show loading state
        this.setLoadingState(form, true);

        try {
            // Simulate API call delay
            await new Promise(resolve => setTimeout(resolve, 1000));

            const user = this.authenticateUser(email, password);
            
            if (user) {
                this.loginUser(user, remember);
                this.showMessage('Login successful! Redirecting...', 'success');
                
                // Redirect to main page after a short delay
                setTimeout(() => {
                    window.location.href = 'index.html';
                }, 1500);
            } else {
                this.showMessage('Invalid email or password', 'error');
            }
        } catch (error) {
            this.showMessage('An error occurred. Please try again.', 'error');
        } finally {
            this.setLoadingState(form, false);
        }
    }

    async handleSignup(e) {
        e.preventDefault();
        
        const form = e.target;
        const firstName = form.firstName.value.trim();
        const lastName = form.lastName.value.trim();
        const email = form.email.value.trim();
        const password = form.password.value;
        const confirmPassword = form.confirmPassword.value;
        const terms = form.terms.checked;

        // Validation
        if (!this.validateSignupData(firstName, lastName, email, password, confirmPassword, terms)) {
            return;
        }

        // Show loading state
        this.setLoadingState(form, true);

        try {
            // Simulate API call delay
            await new Promise(resolve => setTimeout(resolve, 1000));

            if (this.userExists(email)) {
                this.showMessage('User with this email already exists', 'error');
                return;
            }

            const user = this.createUser(firstName, lastName, email, password);
            this.loginUser(user, false);
            
            this.showMessage('Account created successfully! Redirecting...', 'success');
            
            // Redirect to main page after a short delay
            setTimeout(() => {
                window.location.href = 'index.html';
            }, 1500);
        } catch (error) {
            this.showMessage('An error occurred. Please try again.', 'error');
        } finally {
            this.setLoadingState(form, false);
        }
    }

    validateSignupData(firstName, lastName, email, password, confirmPassword, terms) {
        if (!firstName || !lastName) {
            this.showMessage('Please enter your full name', 'error');
            return false;
        }

        if (!this.isValidEmail(email)) {
            this.showMessage('Please enter a valid email address', 'error');
            return false;
        }

        if (password.length < 8) {
            this.showMessage('Password must be at least 8 characters long', 'error');
            return false;
        }

        if (password !== confirmPassword) {
            this.showMessage('Passwords do not match', 'error');
            return false;
        }

        if (!terms) {
            this.showMessage('Please accept the terms and conditions', 'error');
            return false;
        }

        return true;
    }

    isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    userExists(email) {
        return this.users.some(user => user.email.toLowerCase() === email.toLowerCase());
    }

    authenticateUser(email, password) {
        const user = this.users.find(u => 
            u.email.toLowerCase() === email.toLowerCase() && 
            u.password === password
        );
        return user;
    }

    createUser(firstName, lastName, email, password) {
        const user = {
            id: Date.now().toString(),
            firstName,
            lastName,
            email: email.toLowerCase(),
            password,
            createdAt: new Date().toISOString(),
            playlists: []
        };

        this.users.push(user);
        this.saveUsers();
        return user;
    }

    loginUser(user, remember) {
        this.currentUser = user;
        localStorage.setItem('currentUser', JSON.stringify(user));
        
        if (remember) {
            localStorage.setItem('rememberMe', 'true');
        }
    }

    logoutUser() {
        this.currentUser = null;
        localStorage.removeItem('currentUser');
        localStorage.removeItem('rememberMe');
        window.location.href = 'login.html';
    }

    checkAuthStatus() {
        // If user is already logged in and trying to access auth pages, redirect to main page
        if (this.currentUser && (window.location.pathname.includes('login.html') || window.location.pathname.includes('signup.html'))) {
            window.location.href = 'index.html';
        }
        
        // If user is not logged in and trying to access main page, redirect to login
        if (!this.currentUser && window.location.pathname.includes('index.html')) {
            window.location.href = 'login.html';
        }
    }



    setLoadingState(form, isLoading) {
        const button = form.querySelector('.auth-button');
        const formElements = form.querySelectorAll('input, button');
        
        if (isLoading) {
            button.classList.add('loading');
            formElements.forEach(el => el.disabled = true);
        } else {
            button.classList.remove('loading');
            formElements.forEach(el => el.disabled = false);
        }
    }

    showMessage(message, type) {
        // Remove existing messages
        const existingMessage = document.querySelector('.message');
        if (existingMessage) {
            existingMessage.remove();
        }

        // Create new message
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${type}`;
        messageDiv.textContent = message;

        // Insert at the top of the form
        const form = document.querySelector('.auth-form');
        form.insertBefore(messageDiv, form.firstChild);

        // Auto-remove after 5 seconds
        setTimeout(() => {
            if (messageDiv.parentNode) {
                messageDiv.remove();
            }
        }, 5000);
    }

    saveUsers() {
        localStorage.setItem('users', JSON.stringify(this.users));
    }

    getCurrentUser() {
        return this.currentUser;
    }

    isAuthenticated() {
        return this.currentUser !== null;
    }

    createDemoUser() {
        const demoUser = {
            id: 'demo-user',
            firstName: 'Demo',
            lastName: 'User',
            email: 'demo@example.com',
            password: 'demo123',
            createdAt: new Date().toISOString(),
            playlists: []
        };
        
        this.users.push(demoUser);
        this.saveUsers();
    }
}

// Global functions for HTML onclick handlers
function togglePassword(inputId) {
    // This function is called from HTML onclick attributes
    // The actual implementation is in the AuthManager class
}

// Initialize authentication when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.authManager = new AuthManager();
});

// Export for use in other scripts
if (typeof module !== 'undefined' && module.exports) {
    module.exports = AuthManager;
}
