# Online Complaint Registration System

A simple web-based complaint registration and tracking system.

## Features

- **User Features:**
  - Submit complaints online
  - Track complaint status using complaint ID

- **Admin Features:**
  - View all complaints
  - Update complaint status (Pending → In Progress → Resolved)

## Tech Stack

- **Frontend:** HTML, CSS, JavaScript
- **Backend:** PHP
- **Database:** SQLite

## Setup Instructions

1. Install XAMPP/WAMP or any PHP server
2. Clone this repository to your `htdocs` folder
3. Open `http://localhost/ONLINE COMPLAINT REGISTRATION SYSTEM/` in browser
4. Database will be created automatically on first run

## Project Structure

```
├── index.html          # User complaint form
├── track.html          # Track complaint status
├── admin.html          # Admin login page
├── admin-dashboard.html # Admin dashboard
├── css/
│   └── style.css       # Stylesheet
├── js/
│   └── script.js       # JavaScript functions
├── php/
│   ├── config.php      # Database configuration
│   ├── submit.php      # Handle complaint submission
│   ├── track.php       # Track complaint status
│   ├── admin-login.php # Admin authentication
│   ├── get-complaints.php # Fetch all complaints
│   └── update-status.php  # Update complaint status
└── README.md
```

## Default Admin Credentials

- **Username:** admin
- **Password:** admin123

## License

MIT License
