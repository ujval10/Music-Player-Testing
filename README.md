# Music Player with Authentication System

A fully functional music player website with a complete login/signup authentication system.

## Features

### 🎵 Music Player Features
- Modern Spotify-like interface
- Multiple playlist categories
- Audio controls (play, pause, next, previous)
- Volume control
- Seek bar functionality
- Mobile-responsive design
- Touch gestures for mobile sidebar

### 🔐 Authentication Features
- **User Registration**: Create new accounts with email validation
- **User Login**: Secure login with email and password
- **Password Strength**: Real-time password strength indicator
- **Session Management**: Persistent login sessions
- **Logout Functionality**: Secure logout with session cleanup
- **Form Validation**: Comprehensive client-side validation
- **Password Visibility Toggle**: Show/hide password fields
- **Remember Me**: Option to stay logged in
- **Responsive Design**: Works on all device sizes

## Demo Account

For testing purposes, a demo account is automatically created:

- **Email**: `demo@example.com`
- **Password**: `demo123`

## File Structure

```
Music Player Testing/
├── index.html          # Main music player page
├── login.html          # Login page
├── signup.html         # Signup page
├── auth-style.css      # Authentication page styles
├── auth.js            # Authentication logic
├── style.css          # Main music player styles
├── utility.css        # Utility styles
├── script.js          # Music player functionality
├── songs/             # Music files directory
├── Playlist-Img/      # Playlist cover images
└── README.md          # This file
```

## How to Use

### 1. First Time Setup
1. Open `login.html` in your browser
2. Use the demo account or create a new account
3. You'll be automatically redirected to the music player

### 2. Creating a New Account
1. Click "Sign up" on the login page
2. Fill in your details:
   - First Name
   - Last Name
   - Email (must be valid format)
   - Password (minimum 8 characters)
   - Confirm Password
3. Accept the terms and conditions
4. Click "Create Account"

### 3. Logging In
1. Enter your email and password
2. Optionally check "Remember me"
3. Click "Sign In"

### 4. Using the Music Player
1. Browse playlists by clicking on the cards
2. Select songs from the playlist
3. Use the audio controls to play, pause, skip
4. Adjust volume using the slider
5. Use the seek bar to jump to different parts of the song

### 5. Logging Out
1. Click the "Logout" button in the top-right corner
2. You'll be redirected to the login page

## Technical Details

### Authentication System
- **Storage**: Uses localStorage for user data persistence
- **Security**: Client-side validation and session management
- **Validation**: Email format, password strength, form completeness
- **Session**: Automatic redirect based on authentication status

### Password Requirements
- Minimum 8 characters
- At least one uppercase letter
- At least one lowercase letter
- At least one number
- At least one special character

### Browser Compatibility
- Chrome (recommended)
- Firefox
- Safari
- Edge

## Security Notes

⚠️ **Important**: This is a frontend-only implementation for demonstration purposes. In a production environment, you would need:

- Backend server with proper authentication
- HTTPS encryption
- Password hashing (bcrypt, Argon2)
- JWT or session-based authentication
- CSRF protection
- Rate limiting
- Input sanitization
- Database storage instead of localStorage

## Customization

### Adding More Songs
1. Place MP3 files in the `songs/` directory
2. The system will automatically detect and organize them into playlists

### Styling Changes
- Modify `auth-style.css` for authentication pages
- Modify `style.css` for the main music player
- Colors and themes can be easily customized

### Authentication Features
- Edit `auth.js` to modify validation rules
- Add additional social login providers
- Implement password reset functionality
- Add email verification

## Troubleshooting

### Common Issues

1. **Songs not loading**: Make sure you're running the site through a web server (not just opening HTML files)
2. **Authentication not working**: Clear browser localStorage and try again
3. **Styling issues**: Check that all CSS files are properly linked

### Running Locally
For the best experience, run the site using a local web server:

```bash
# Using Python 3
python -m http.server 8000

# Using Node.js (if you have http-server installed)
npx http-server

# Using PHP
php -S localhost:8000
```

Then visit `http://localhost:8000` in your browser.

## License

This project is for educational and demonstration purposes.

## Support

If you encounter any issues or have questions, please check the troubleshooting section above or create an issue in the project repository.
