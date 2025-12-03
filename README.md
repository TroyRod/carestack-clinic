# CareStack Clinic

A modern, secure healthcare management platform designed for doctors, caregivers, and administrators to manage patient records, medications, and care all in one place.

![CareStack Clinic](https://img.shields.io/badge/Version-1.0.0-blue.svg)
![License](https://img.shields.io/badge/License-MIT-green.svg)
![Node](https://img.shields.io/badge/Node-18+-brightgreen.svg)

## 🌟 Features

- **User Management**: Support for Admin, Doctor, and Caregiver roles
- **Patient Records**: Create, view, edit, and manage patient information
- **Medication Management**: Track medications and prescriptions for patients
- **Image Uploads**: Upload and manage patient photos
- **Secure Authentication**: JWT-based authentication system
- **Role-Based Access Control**: Different permissions for different user roles
- **Modern UI**: Responsive, visually appealing interface

## 🛠️ Tech Stack

### Frontend
- **React 19** - UI library
- **React Router** - Client-side routing
- **Vite** - Build tool and dev server
- **Axios** - HTTP client
- **Vitest** - Unit testing framework
- **Cypress** - E2E testing framework

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB object modeling
- **JWT** - Authentication tokens
- **Multer** - File upload handling
- **bcryptjs** - Password hashing

## 📋 Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v18 or higher)
- **npm** or **yarn**
- **MongoDB Atlas** account (or local MongoDB instance)
- **Git**

## 🚀 Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/TroyRod/carestack-clinic.git
cd carestack-clinic
```

### 2. Install Dependencies

#### Install Server Dependencies
```bash
npm install
```

#### Install Client Dependencies
```bash
cd client
npm install
cd ..
```

### 3. Environment Configuration

#### Server Environment Variables

Create a `.env` file in the root directory:

```env
NODE_ENV=development
PORT=3000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_super_secret_jwt_key
CLIENT_URL=http://localhost:5173
```

#### Client Environment Variables

Create a `.env` file in the `client` directory:

```env
VITE_API_BASE_URL=http://localhost:3000/api
```

### 4. Database Setup

1. Create a [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) account
2. Create a new cluster (free tier available)
3. Create a database user
4. Whitelist your IP address (or use `0.0.0.0/0` for development)
5. Get your connection string and add it to `.env`

### 5. Run the Application

#### Development Mode

**Terminal 1 - Start the server:**
```bash
npm run dev
```

**Terminal 2 - Start the client:**
```bash
cd client
npm run dev
```

The application will be available at:
- **Frontend**: http://localhost:5173
- **Backend API**: http://localhost:3000

## 📁 Project Structure

```
carestack-clinic/
├── client/                 # React frontend application
│   ├── src/
│   │   ├── api/           # API configuration
│   │   ├── assets/        # Images and static files
│   │   ├── components/    # Reusable React components
│   │   ├── pages/         # Page components
│   │   ├── test/          # Test setup files
│   │   └── ...
│   ├── cypress/           # E2E tests
│   └── package.json
├── server/                 # Express backend
│   ├── controllers/       # Route controllers
│   ├── models/           # Database models
│   ├── routes/           # API routes
│   ├── helpers/          # Helper functions
│   ├── middleware/       # Express middleware
│   └── uploads/          # Uploaded files
├── config/               # Configuration files
├── index.js              # Server entry point
└── package.json
```

## 🧪 Testing

### Unit Tests

Run unit tests:
```bash
cd client
npm run test
```

Run tests with coverage:
```bash
npm run test:coverage
```

Run tests in UI mode:
```bash
npm run test:ui
```

### E2E Tests

Open Cypress Test Runner:
```bash
cd client
npm run cypress:open
```

Run Cypress tests headlessly:
```bash
npm run cypress:run
```

## 🏗️ Building for Production

### Build Client
```bash
cd client
npm run build
```

The built files will be in `client/dist/`

### Build Server
The server doesn't need building. Just ensure:
- Environment variables are set
- Dependencies are installed
- Database is configured

## 🚢 Deployment

See [DEPLOYMENT.md](./DEPLOYMENT.md) for detailed deployment instructions.

### Quick Deploy Options

- **Frontend**: Deploy to [Vercel](https://vercel.com) or [Netlify](https://netlify.com)
- **Backend**: Deploy to [Render](https://render.com), [Railway](https://railway.app), or [Heroku](https://heroku.com)
- **Database**: Use [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)

## 📝 API Endpoints

### Authentication
- `POST /api/auth/signin` - User login
- `POST /api/auth/signup` - User registration

### Users
- `GET /api/users` - Get all users (Admin only)
- `POST /api/users` - Create new user (Admin only)

### Patients
- `GET /api/patients` - Get all patients (Admin)
- `GET /api/patients/mine` - Get doctor's patients
- `POST /api/patients` - Create patient
- `GET /api/patients/:id` - Get patient by ID
- `PUT /api/patients/:id` - Update patient
- `DELETE /api/patients/:id` - Delete patient

### Medications
- `GET /api/medications/:patientId` - Get patient medications
- `POST /api/medications` - Add medication
- `PUT /api/medications/:id` - Update medication
- `DELETE /api/medications/:id` - Delete medication

### Uploads
- `POST /api/upload` - Upload image file

## 👥 User Roles

### Admin
- Manage all patients
- Create and manage users
- View all medications
- Full system access

### Doctor
- View assigned patients
- Create new patients
- Manage patient medications
- Edit patient records

### Caregiver
- View assigned patients (future implementation)
- Limited access (future implementation)

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License.

## 👨‍💻 Team Members

- **Troy Rodrigues** - @TroyRod
- **Jenzen Dela Paz** - @jenzendelapaz
- **Kaylie Moskal** - @KayMSolutions

## 📞 Support

For support, please open an issue in the [GitHub repository](https://github.com/TroyRod/carestack-clinic).

## 🔗 Links

- [GitHub Repository](https://github.com/TroyRod/carestack-clinic)
- [Deployed Application](#) - _Update after deployment_

## 🎯 Future Enhancements

- [ ] Real-time notifications
- [ ] Appointment scheduling
- [ ] Email notifications
- [ ] Patient history tracking
- [ ] Advanced search and filtering
- [ ] Export functionality (PDF, CSV)
- [ ] Mobile app version

## 🙏 Acknowledgments

- MongoDB Atlas for database hosting
- React team for the amazing framework
- All contributors and testers

---

**Note**: This is a project for educational purposes. Ensure proper security measures are in place before using in production environments.

