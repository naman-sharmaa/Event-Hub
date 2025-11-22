# Environment Variables for Render Deployment

## Backend Environment Variables (eventhub-backend service)

### Required Variables:
```
NODE_ENV=production
PORT=5050

# MongoDB Connection
MONGODB_URI=mongodb+srv://YOUR_USERNAME:YOUR_PASSWORD@YOUR_CLUSTER.mongodb.net/YOUR_DATABASE?retryWrites=true&w=majority

# JWT Configuration
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
JWT_EXPIRE=7d

# Email Configuration (Gmail)
EMAIL_USER=your-email@gmail.com
EMAIL_PASSWORD=your-app-password

# Razorpay Configuration
RAZORPAY_KEY_ID=rzp_test_XXXXXXXXXXXX
RAZORPAY_KEY_SECRET=XXXXXXXXXXXXXXXXX

# Firebase Admin SDK
FIREBASE_PROJECT_ID=your-project-id
FIREBASE_CLIENT_EMAIL=firebase-adminsdk-xxxxx@your-project.iam.gserviceaccount.com
FIREBASE_PRIVATE_KEY=-----BEGIN PRIVATE KEY-----\nYOUR_PRIVATE_KEY_HERE\n-----END PRIVATE KEY-----\n

# CORS - Frontend URL (will be your Render frontend URL)
FRONTEND_URL=https://eventhub-frontend.onrender.com
```

## Frontend Environment Variables (eventhub-frontend service)

### Required Variables:
```
# Backend API URL (will be your Render backend URL)
VITE_API_URL=https://eventhub-backend.onrender.com/api

# Razorpay
VITE_RAZORPAY_KEY_ID=rzp_test_XXXXXXXXXXXX

# Firebase Configuration
VITE_FIREBASE_API_KEY=your-api-key
VITE_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your-project-id
VITE_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=123456789
VITE_FIREBASE_APP_ID=1:123456789:web:abcdef
```

## How to Get These Values:

### MongoDB URI:
- From your MongoDB Atlas dashboard
- Format: `mongodb+srv://USERNAME:PASSWORD@CLUSTER.mongodb.net/DATABASE`

### Email (Gmail):
- EMAIL_USER: Your Gmail address
- EMAIL_PASSWORD: Generate an App Password from Google Account settings

### Razorpay:
- Get from Razorpay Dashboard > Settings > API Keys

### Firebase:
- Get from Firebase Console > Project Settings > General (for frontend vars)
- Get from Firebase Console > Project Settings > Service Accounts (for backend FIREBASE_PRIVATE_KEY)

### JWT_SECRET:
- Generate a random secure string (minimum 32 characters)
- You can use: `openssl rand -base64 32`

## Important Notes:

1. **FRONTEND_URL**: After deploying backend, update this to your actual Render backend URL
2. **VITE_API_URL**: After deploying frontend, update backend's FRONTEND_URL to match
3. **FIREBASE_PRIVATE_KEY**: Must include the `\n` characters (keep as shown)
4. Never commit `.env` files to git - they're in .gitignore
