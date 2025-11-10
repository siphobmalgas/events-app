# Event Manager App

A personal event management application built with React, Vite, Bootstrap, Formik, and React Router. This app helps users organize and manage personal or professional events with a clean, responsive interface.
There conference places that are enrolled as locations that users can choose from and or add their custom location.

## Features

### 🔐 User Authentication
- **Registration**: Create account with name, email, username, and password
- **Login**: Secure login with email and password
- **Input Validation**: Comprehensive form validation using Formik and Yup
- **Local Storage**: User data persisted in browser's local storage

### 📅 Event Management
- **Create Events**: Add new events with name, date, time, location, and description
- **View Events**: Organized dashboard displaying events in different views
- **Edit Events**: Update existing event details
- **Delete Events**: Remove events with confirmation prompt
- **Event Categories**: Automatic categorization into upcoming and past events

### 🎨 User Interface
- **Responsive Design**: Built with Bootstrap for mobile and desktop compatibility
- **Fixed Navigation**: Always-visible header with navigation menu
- **Interactive Dashboard**: Tabbed interface showing upcoming, past, and all events
- **Event Cards**: Clean card layout with event details and action buttons
- **Status Badges**: Visual indicators for upcoming vs past events

### 🧭 Navigation & Routing
- **Protected Routes**: Secure access to dashboard and event management features
- **Public Routes**: Login and registration accessible with authentication but this current app, 
                    the login accepts any password more than 6 characters.
- **Automatic Redirects**: Smart routing based on authentication status
- **Breadcrumb Navigation**: Clear navigation structure

### 📊 State Management
- **Context API**: Centralized state management for authentication and events
- **Local State**: Component-level state for form handling and UI interactions
- **Data Persistence**: Events and user data stored in localStorage

### 📋 Form Validation
- **Real-time Validation**: Immediate feedback on form inputs
- **Schema Validation**: Yup schemas for robust data validation
- **Error Handling**: Clear error messages and user feedback
- **Required Fields**: Proper validation for mandatory form fields

### 🆘 Help System
- **Comprehensive Guide**: Detailed help section with instructions
- **FAQ Format**: Accordion-style frequently asked questions
- **Getting Started**: Step-by-step onboarding guidance
- **Best Practices**: Tips for effective event organization

## Technology Stack

- **React 19.1.1**: Modern React with hooks and function components
- **Vite**: Fast build tool and development server
- **React Bootstrap**: UI component library for responsive design
- **React Router DOM**: Client-side routing and navigation
- **Formik**: Advanced form handling and validation
- **Yup**: Schema validation for forms
- **Bootstrap 5.3**: CSS framework for styling and layout

## Installation & Setup

1. **Install dependencies**
   ```bash
   npm install
   ```

2. **Start the development server**
   ```bash
   npm run dev
   ```

3. **Open your browser**
   - Navigate to `http://localhost:5173`
   - The app will automatically reload if you make changes

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint for code quality

## Project Structure

```
event-manager-app/
├── public/                 # Static assets
├── src/
│   ├── components/         # Reusable React components
│   │   ├── Navigation.jsx  # Fixed header navigation
│   │   ├── ProtectedRoute.jsx # Route protection
│   │   └── EventCard.jsx   # Event display component
│   ├── contexts/          # React Context providers
│   │   ├── AuthContext.jsx # Authentication state
│   │   └── EventContext.jsx # Event management state
│   ├── pages/             # Route components
│   │   ├── Login.jsx      # User login page
│   │   ├── Register.jsx   # User registration page
│   │   ├── Dashboard.jsx  # Main dashboard
│   │   ├── AddEvent.jsx   # Create new event
│   │   ├── EditEvent.jsx  # Edit existing event
│   │   └── Help.jsx       # Help and documentation
│   ├── App.jsx           # Main application component
│   ├── main.jsx          # Application entry point
│   ├── App.css           # Application styles
│   └── index.css         # Global styles
├── package.json          # Project dependencies
├── vite.config.js       # Vite configuration
└── README.md            # Project documentation
```

## Usage Guide

### Getting Started
1. **Register**: Create a new account with your details
2. **Login**: Access your personal dashboard
3. **Create Events**: Add your first event using the "Add Event" button
4. **Manage Events**: View, edit, or delete events from your dashboard

### Event Creation
- Fill in all required fields: name, date, time, and location
- Add optional descriptions for additional context
- Events are automatically categorized as upcoming or past
- All events are saved to your personal account

### Dashboard Features
- **Upcoming Events**: View events scheduled for the future
- **Past Events**: Review completed events
- **All Events**: See your complete event history
- **Quick Stats**: Overview of your event statistics

## Data Storage

This application uses browser localStorage for data persistence:
- **User Accounts**: Stored locally for demo purposes
- **Events**: Personal events saved to browser storage
- **Session Management**: Login state maintained across browser sessions

> **Note**: In a production environment, data would be stored securely on servers with proper authentication and authorization.

## Browser Compatibility

- Chrome (recommended)
- Firefox
- Safari
- Edge

## Contributing

This is a demo application built for educational purposes. The codebase follows:
- Google's JavaScript Style Guide
- React best practices
- Component-based architecture
- Modern ES6+ syntax
