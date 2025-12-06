# CareStack Clinic - Healthcare Management System

## Project Overview

CareStack Clinic is a comprehensive full-stack web application designed to streamline healthcare management operations through digital transformation. This MERN-based system provides an intuitive platform for healthcare administrators and medical practitioners to efficiently manage patient records, track medical histories, coordinate treatment plans, and maintain medication schedules. The application implements role-based access control to ensure data security and operational efficiency across different user hierarchies within a clinical environment.

The system addresses critical challenges in modern healthcare administration by providing centralized patient data management, secure authentication mechanisms, and real-time collaboration capabilities between administrative staff and healthcare providers. Through its cloud-based architecture, CareStack Clinic ensures accessibility, scalability, and reliable data persistence, making it an ideal solution for small to medium-sized healthcare facilities seeking to modernize their patient management workflows.

---

## Key Features

### Role-Based Access Control
- **Administrator Access**: Full system privileges including patient management across all doctors, doctor account management, patient assignment to specific practitioners, and comprehensive oversight of all clinical operations
- **Doctor Access**: Personalized dashboard with access limited to assigned patients, ability to create and manage patient records, update treatment plans, and track medication schedules for their designated patient roster

### Patient Management
- Complete CRUD (Create, Read, Update, Delete) operations for patient records
- Comprehensive patient profiles including demographics, medical history, diagnosis information, and treatment notes
- Advanced search and filtering capabilities for efficient patient lookup
- Image upload functionality with default fallback for patient identification
- Custom patient ID system for streamlined record management

### Medication Tracking
- Integrated medication library with predefined pharmaceutical options
- Medication assignment with customizable dosage and administration timing
- Multi-medication support per patient with embedded medication arrays
- Real-time medication updates and modification capabilities
- Comprehensive medication history tracking per patient

### Doctor Management (Admin Only)
- Centralized doctor profile management interface
- Doctor account creation with unique identification numbers (100-999)
- Patient-to-doctor assignment and reassignment capabilities
- Doctor account deletion with patient record preservation
- Visual doctor roster with detailed information cards

### Security & Authentication
- JWT (JSON Web Token) based authentication system with 7-day token expiration
- Bcrypt password hashing for enhanced security
- Protected API routes with middleware authentication checks
- Role-based authorization middleware for administrative functions
- Secure session management with automatic token refresh

### User Experience
- Responsive design optimized for desktop, tablet, and mobile devices
- Intuitive navigation with role-specific dashboard layouts
- Professional UI with consistent color schemes and typography
- Form validation with user-friendly error messaging
- Loading states and confirmation dialogs for critical operations

---

## Technology Stack

### Frontend
- **React 19.2.0**: Modern JavaScript library for building component-based user interfaces
- **React Router DOM 7.9.6**: Declarative routing for single-page application navigation
- **Axios 1.13.2**: Promise-based HTTP client for API communication
- **Vite 7.2.4**: Next-generation frontend build tool for optimized development experience
- **CSS3**: Custom stylesheets with responsive media queries and modern layout techniques

### Backend
- **Node.js**: JavaScript runtime environment for server-side execution
- **Express.js 5.1.0**: Minimal and flexible web application framework
- **MongoDB**: NoSQL document database for flexible data modeling
- **Mongoose 8.20.1**: Elegant MongoDB object modeling for Node.js
- **JWT (jsonwebtoken 9.0.2)**: Secure token-based authentication implementation
- **Bcrypt.js 3.0.3**: Password hashing library for enhanced security
- **Multer 2.0.2**: Middleware for handling multipart/form-data for file uploads
- **CORS 2.8.5**: Cross-Origin Resource Sharing middleware for API access
- **Dotenv 17.2.3**: Environment variable management for configuration

### Database
- **MongoDB Atlas**: Cloud-hosted NoSQL database solution
- **Database Name**: carestack-clinic
- **Collections**: Users, Patients (with embedded medications)

### Development Tools
- **Nodemon 3.1.11**: Automatic server restart during development
- **ESLint 9.39.1**: Code quality and consistency enforcement
- **Git**: Version control system
- **GitHub**: Remote repository hosting and collaboration

---

## Prerequisites

Before installation, ensure your development environment has the following:

- **Node.js**: Version 18.x or higher ([Download](https://nodejs.org/))
- **npm**: Version 9.x or higher (comes with Node.js)
- **MongoDB Atlas Account**: Free tier available ([Sign Up](https://www.mongodb.com/cloud/atlas))
- **Git**: Version control system ([Download](https://git-scm.com/))
- **Web Browser**: Modern browser (Chrome, Firefox, Safari, or Edge)
- **Code Editor**: VS Code, Sublime Text, or similar (recommended)

---

## Installation & Setup

### 1. Clone the Repository

```bash
git clone https://github.com/TroyRod/carestack-clinic.git
cd carestack-clinic
```

### 2. Backend Setup

```bash
# Navigate to project root (if not already there)
cd carestack-clinic

# Install backend dependencies
npm install
```

### 3. Frontend Setup

```bash
# Navigate to client folder
cd client

# Install frontend dependencies
npm install

# Return to project root
cd ..
```

### 4. Environment Configuration

Create a `.env` file in the project root directory:

```env
# MongoDB Configuration
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/carestack-clinic?retryWrites=true&w=majority

# JWT Configuration
JWT_SECRET=your_super_secret_jwt_key_here_minimum_32_characters

# Server Configuration
NODE_ENV=development
PORT=3000
```

**Important Notes:**
- Replace `username` and `password` with your MongoDB Atlas credentials
- Replace `cluster` with your actual cluster name
- Generate a strong, unique JWT_SECRET (use a password generator)
- Never commit the `.env` file to version control (already in .gitignore)

### 5. MongoDB Atlas Setup

1. Log in to [MongoDB Atlas](https://cloud.mongodb.com/)
2. Create a new cluster (free tier available)
3. Create a database user with read/write permissions
4. Whitelist your IP address (or use 0.0.0.0/0 for development)
5. Get your connection string and update the `.env` file

---

## Running the Application

### Development Mode

**Terminal 1 - Backend Server:**
```bash
# From project root
npm run dev
```
Backend runs on: `http://localhost:3000`

**Terminal 2 - Frontend Development Server:**
```bash
# From client folder
cd client
npm run dev
```
Frontend runs on: `http://localhost:5173`

### Production Mode

```bash
# Build frontend
cd client
npm run build
cd ..

# Start production server
npm start
```

---

## Project Structure

```
carestack-clinic/
├── carestack-clinic/
│   ├── index.js                    # Server entry point
│   ├── package.json                # Backend dependencies
│   ├── .env                        # Environment variables (not in repo)
│   ├── .gitignore                  # Git ignore rules
│   │
│   ├── config/
│   │   └── config.js               # Configuration management
│   │
│   ├── server/
│   │   ├── express.js              # Express app setup
│   │   │
│   │   ├── controllers/            # Business logic
│   │   │   ├── userController.js
│   │   │   ├── patientController.js
│   │   │   └── medicationController.js
│   │   │
│   │   ├── models/                 # Database schemas
│   │   │   ├── user.js
│   │   │   ├── Patient.js
│   │   │   └── Medication.js
│   │   │
│   │   ├── routes/                 # API endpoints
│   │   │   ├── userRoutes.js
│   │   │   ├── patientRoutes.js
│   │   │   ├── medicationRoutes.js
│   │   │   └── uploadRoutes.js
│   │   │
│   │   ├── helpers/                # Utility functions
│   │   │   └── authMiddleware.js
│   │   │
│   │   ├── middleware/             # Custom middleware
│   │   │   └── upload.js
│   │   │
│   │   ├── data/                   # Static data
│   │   │   └── medications.js
│   │   │
│   │   └── uploads/                # Uploaded files
│   │
│   └── client/                     # Frontend application
│       ├── package.json            # Frontend dependencies
│       ├── vite.config.js          # Vite configuration
│       ├── index.html              # HTML entry point
│       │
│       └── src/
│           ├── main.jsx            # React entry point
│           ├── App.jsx             # Main app component
│           ├── App.css             # Global styles
│           ├── index.css           # Base styles
│           │
│           ├── api/
│           │   └── api.js          # Axios configuration
│           │
│           ├── components/         # Reusable components
│           │   ├── Navbar.jsx
│           │   ├── ProtectedRoute.jsx
│           │   ├── PatientCard.jsx
│           │   └── MedicationCard.jsx
│           │
│           ├── pages/              # Page components
│           │   ├── Home.jsx
│           │   ├── Login.jsx
│           │   ├── Signup.jsx
│           │   ├── SignupDoctor.jsx
│           │   ├── Dashboard.jsx
│           │   ├── Patients.jsx
│           │   ├── CreatePatient.jsx
│           │   ├── EditPatient.jsx
│           │   ├── Medications.jsx
│           │   └── ManageDoctors.jsx
│           │
│           └── assets/             # Static assets
│               └── anonymous.webp
```

---

## User Roles & Permissions

### Administrator
**Capabilities:**
- Create, read, update, and delete all patient records
- View and manage all doctors in the system
- Assign patients to specific doctors
- Create new doctor and admin accounts
- Delete doctor accounts (patients remain in system)
- Access all patients regardless of assigned doctor
- Full system oversight and configuration

**Dashboard Features:**
- Manage Patients (view/edit all)
- Add Patient (with doctor assignment)
- Manage Doctors (view/delete)
- Create User (doctor/admin signup)

### Doctor
**Capabilities:**
- Create new patient records (auto-assigned to self)
- View only patients assigned to them
- Update patient information and diagnoses
- Add/remove medications for their patients
- Upload patient images
- Manage treatment plans for assigned patients

**Dashboard Features:**
- My Patients (view personal roster)
- Add Patient (auto-assigned to self)

---

## API Endpoints

### Authentication
```
POST   /api/users/signup          Create new user (admin/doctor)
POST   /api/users/login           Authenticate user
```

### User Management
```
GET    /api/users                 Get all users (admin only)
GET    /api/users/doctors         Get all doctors (admin only)
DELETE /api/users/:id             Delete user (admin only)
```

### Patient Management
```
POST   /api/patients              Create patient
GET    /api/patients              Get all patients (admin only)
GET    /api/patients/mine         Get doctor's patients
GET    /api/patients/:id          Get patient by ID
PUT    /api/patients/:id          Update patient
DELETE /api/patients/:id          Delete patient
```

### Medications
```
GET    /api/medications           Get medication library
```

### File Upload
```
POST   /api/upload                Upload patient image
```

---

## Database Schema

### User Schema
```javascript
{
  name: String (required),
  email: String (required, unique, lowercase),
  password: String (required, hashed),
  role: String (enum: ["admin", "doctor"]),
  customId: Number (100-999, required for doctors),
  timestamps: true
}
```

### Patient Schema
```javascript
{
  patientId: Number (required),
  doctorId: Number (optional),
  name: String (required),
  age: Number (required),
  diagnosis: String (required),
  symptoms: String,
  image: String,
  doctor: ObjectId (ref: "User"),
  medications: [
    {
      medId: Number,
      name: String,
      dosage: String,
      time: String
    }
  ],
  timestamps: true
}
```

---

## Authentication Flow

1. **Registration**: User provides credentials → Password hashed with bcrypt → Stored in MongoDB
2. **Login**: User submits credentials → Server validates → JWT token generated (7-day expiration) → Token sent to client
3. **Protected Routes**: Client includes JWT in Authorization header → Server verifies token → Access granted/denied
4. **Token Storage**: JWT stored in localStorage → Auto-included in API requests via Axios interceptor

---

## Security Features

- **Password Hashing**: Bcrypt with salt rounds for secure password storage
- **JWT Authentication**: Stateless token-based authentication
- **Protected Routes**: Middleware validation on all sensitive endpoints
- **Role-Based Authorization**: Admin-only endpoints protected with adminOnly middleware
- **CORS Configuration**: Controlled cross-origin resource sharing
- **Environment Variables**: Sensitive data isolated in .env file
- **Input Validation**: Server-side validation for all user inputs
- **MongoDB Injection Prevention**: Mongoose schema validation

---

## Deployment

### Live Application
- **Frontend URL**: [Your deployment URL here]
- **Backend API**: [Your API URL here]
- **Database**: MongoDB Atlas (Cloud-hosted)

### Deployment Platform
This application is deployed on [Render/Firebase/Railway] with the following configuration:
- **Frontend**: Static site hosting
- **Backend**: Node.js server
- **Database**: MongoDB Atlas
- **Environment**: Production

### Deployment Steps
1. Push code to GitHub repository
2. Connect repository to hosting platform
3. Configure environment variables
4. Build and deploy frontend
5. Deploy backend API
6. Verify MongoDB Atlas network access
7. Test all endpoints and features

---

## Testing Guide

### Creating Test Accounts

**Admin Account:**
1. Navigate to `/signup-admin`
2. Enter name, email (must contain @ and end with .com)
3. Enter password (minimum 10 characters)
4. Submit form

**Doctor Account:**
1. Navigate to `/signup-doctor`
2. Enter name, email, password
3. Enter 3-digit custom ID (100-999)
4. Submit form

### Testing Patient Management
1. Login as admin or doctor
2. Navigate to "Add Patient"
3. Fill in patient information
4. Add medications from dropdown
5. Upload patient image (optional)
6. Submit form
7. Verify patient appears in patient list

### Testing Doctor Management (Admin Only)
1. Login as admin
2. Navigate to "Manage Doctors"
3. View list of all doctors
4. Test delete functionality (with confirmation)
5. Create new doctor via "Add Doctor" button

---

## Known Issues & Future Enhancements

### Current Limitations
- Image uploads stored locally (not cloud storage)
- No password reset functionality
- No email verification system
- Limited to single medication time per entry

### Planned Features
- Cloud-based image storage (AWS S3 or Cloudinary)
- Email notification system for appointments
- Advanced analytics dashboard
- Appointment scheduling system
- Patient portal for self-service
- Multi-language support
- Export patient records to PDF
- Integration with pharmacy systems

---

## Troubleshooting

### Common Issues

**MongoDB Connection Error:**
- Verify MONGO_URI in .env file
- Check MongoDB Atlas network access settings
- Ensure database user has correct permissions

**Frontend Cannot Connect to Backend:**
- Verify backend is running on port 3000
- Check CORS configuration in express.js
- Ensure API base URL is correct in client/src/api/api.js

**Authentication Issues:**
- Clear browser localStorage
- Verify JWT_SECRET is set in .env
- Check token expiration (7 days)

**Image Upload Not Working:**
- Verify uploads folder exists in server directory
- Check file permissions on uploads folder
- Ensure Multer middleware is properly configured

---

## Contributing

This project was developed as part of academic coursework. For contribution guidelines:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## License

This project is licensed for educational purposes as part of COMP229-002 coursework.

---

## Author

**Rochelle**  
Centennial College - Software Engineering Technology  
Course: COMP229-002 Web Application Development  
Fall 2025

---

## Acknowledgments

- Centennial College for project requirements and guidance
- MongoDB Atlas for cloud database hosting
- React and Express.js communities for excellent documentation
- Open-source contributors for libraries and tools used

---

## Contact

For questions, issues, or collaboration opportunities:
- **GitHub**: [TroyRod](https://github.com/TroyRod)
- **Repository**: [carestack-clinic](https://github.com/TroyRod/carestack-clinic)

---

**© 2025 CareStack Clinic. All rights reserved.**
