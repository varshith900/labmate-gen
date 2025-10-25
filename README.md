# 🔬 LabMate Gen - Automated Laboratory Record Generator



## 🎯 Overview

**LabMate Gen** is a full-stack web application designed to help students and professionals create standardized laboratory records effortlessly. Say goodbye to manual formatting and hello to automated, professional documentation.

### The Problem
Students spend hours formatting lab records, often resulting in inconsistent documentation and formatting errors. Submitting assignments becomes tedious when dealing with multiple records.

### The Solution
LabMate Gen automates the entire process - from creation to export. Fill in your experiment details once, and generate perfectly formatted Word and PDF documents instantly.

---

## ✨ Features

### 🔐 **User Management**
- Secure user registration and authentication
- JWT-based session management
- Password encryption with bcrypt
- Personal user profiles

### 📝 **Lab Record Creation**
- Intuitive form interface with all standard fields
- Auto-populate student details from profile
- Rich text editing for theory and conclusions
- Code syntax highlighting
- Real-time preview before saving

### 💾 **Data Management**
- Save unlimited lab records to cloud database
- View all records in organized dashboard
- Edit existing records anytime
- Delete records with confirmation
- Search and filter capabilities

### 📄 **Document Export**
- **Word Export** (.doc) - Editable documents
- **PDF Export** - Professional print-ready format
- **Formatted Templates** - Industry-standard layouts
- **Instant Download** - One-click export

### 🎨 **User Experience**
- Clean, modern interface with Tailwind CSS
- Fully responsive design (mobile, tablet, desktop)
- Dark mode code editor
- Loading states and error handling
- Toast notifications for actions

---


## 🚀 Installation

### 1. Clone the Repository

```bash
git clone https://github.com/varshith900/labmate-gen.git
cd labmate-gen
```

### 2. Backend Setup

```bash
# Navigate to backend directory
cd backend

# Install dependencies
npm install

# Create uploads folder for images
mkdir uploads

# Create .env file (see Configuration section)
touch .env
```

### 3. Frontend Setup

```bash
# Navigate to frontend directory
cd ../frontend

# Install dependencies
npm install

# Create .env file
touch .env
```

---

## ⚙️ Configuration

### Backend Environment Variables

Create a `.env` file in the `backend` directory:

```env
# MongoDB Connection
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/labmate?retryWrites=true&w=majority

# JWT Secret (Use a strong random string)
JWT_SECRET=your_super_secret_jwt_key_here

# Server Configuration
PORT=5000
NODE_ENV=development

# Frontend URL (for CORS)
FRONTEND_URL=http://localhost:3000
```

**Generate a secure JWT_SECRET:**
```bash
node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"
```

### Frontend Environment Variables

Create a `.env` file in the `frontend` directory:

```env
# Backend API URL
REACT_APP_API_URL=http://localhost:5000/api
```

### MongoDB Atlas Setup

1. Create account at [MongoDB Atlas](https://www.mongodb.com/cloud/atlas/register)
2. Create a new cluster (free tier M0)
3. Create a database user
4. Whitelist your IP (or 0.0.0.0/0 for development)
5. Get connection string and update `MONGODB_URI`

---

## 💻 Usage

### Development Mode

#### Start Backend Server

```bash
# From backend directory
cd backend
npm run dev
```

Server runs on `http://localhost:5000`

#### Start Frontend Application

```bash
# From frontend directory (in new terminal)
cd frontend
npm start
```

Application opens at `http://localhost:3000`

### Production Build

#### Backend
```bash
cd backend
npm start
```

#### Frontend
```bash
cd frontend
npm run build
# Serve the build folder with a static server
```

---

## 📱 Using LabMate Gen

### Getting Started

1. **Register Account**
   - Click "Register" tab
   - Fill in: Name, Email, Password, Roll Number, Department
   - Click "Register" button

2. **Login**
   - Enter your email and password
   - Click "Login"

3. **Create Lab Record**
   - Click "Create Record" tab
   - Fill in experiment details:
     - Student info (auto-filled from profile)
     - Experiment number, subject, date
     - Aim, tools, theory, code, output, conclusion
   - Click "Preview" to see formatted output

4. **Save Record**
   - Review your record in preview
   - Click "Save" to store in database
   - Record appears in "My Records" tab

5. **Export Documents**
   - Click "Word" to download .doc file
   - Click "PDF" to print/save as PDF
   - Files are named automatically

6. **Manage Records**
   - View all records in "My Records" tab
   - Click "Edit" to modify a record
   - Click "Delete" to remove (with confirmation)

---

