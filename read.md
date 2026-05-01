# Uber Clone Backend (Mongodb + Express + typescript)

This is the backend server for the uber clone project built Using;

- Node.js
- Express.js
- Mongoose
- mongoDB
- TypeScripts


The Backend Handles

- User creation 
- Crivers API
- Ride Booking 
- Ride History
- Payment Integration
- MongoDb Databse Connection


# Project Structure

```txt
backend/
│
├── src/
│   ├── config/
│   │   └── db.ts
│   │
│   ├── controllers/
│   │   ├── userController.ts
│   │   ├── driverController.ts
│   │   ├── rideController.ts
│   │   └── stripeController.ts
│   │
│   ├── middlewares/
│   │   └── errorMiddleware.ts
│   │
│   ├── models/
│   │   ├── User.ts
│   │   ├── Driver.ts
│   │   └── Ride.ts
│   │
│   ├── routes/
│   │   ├── userRoutes.ts
│   │   ├── driverRoutes.ts
│   │   ├── rideRoutes.ts
│   │   └── stripeRoutes.ts
│   │
│   ├── utils/
│   │   └── seedDrivers.ts
│   │
│   └── server.ts
│
├── .env
├── package.json
└── tsconfig.json
```

# Features

- MongoDB Databse
- Express REST APIs
- Ride Booking Apis
- Driver Management
- User Authentication Support
- Stripe Payment Integration
- TypeScript Support
- Scalable Folder Structure

# Tech Stack

| Technology Use |
|---|---|
| Node.js | Runtime |
| Express.js | backend framework | 
| MongoDB | Database | 
| Mongoose | MongoDB ODM | 
| TypeScript | Type Safety | 
| Stripe | Payment | 
| Cors | Frontend Connection | 
| env | Environment variable | 



---
\
# Installation

## Clone Repository

```bash
git clone YOUR_REPOSITORY_LINK
```

---

## Go To Backend Folder

```bash
cd backend
```

---

## Install Dependencies

```bash
npm install
```

---

# Environment Variables

Create a `.env` file in root:

```env
PORT=5000

MONGO_URI=your_mongodb_connection_string

STRIPE_SECRET_KEY=your_stripe_secret_key
```

---

# MongoDB Setup

1. Create account on MongoDB Atlas
2. Create free cluster
3. Add database user
4. Add IP address:
   ```
   0.0.0.0/0
   ```
5. Copy MongoDB connection string
6. Paste inside `.env`

Example:

```env
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/uber-clone
```

---

# Run Backend

## Development Mode

```bash
npm run dev
```

---

## Production Build

```bash
npm run build
```

---

## Start Production Server

```bash
npm start
```

---

# API Endpoints

---

# User APIs

## Create User

### POST

```txt
/api/users
```

### Body

```json
{
  "name": "Ujjwal",
  "email": "ujjwal@gmail.com",
  "clerkId": "clerk_123"
}
```

---

# Driver APIs

## Get Drivers

### GET

```txt
/api/drivers
```

---

# Ride APIs

## Create Ride

### POST

```txt
/api/rides/create
```

### Body

```json
{
  "origin_address": "Delhi",
  "destination_address": "Noida",
  "origin_latitude": 28.1,
  "origin_longitude": 77.1,
  "destination_latitude": 28.5,
  "destination_longitude": 77.5,
  "ride_time": 20,
  "fare_price": 450,
  "payment_status": "paid",
  "driver_id": "driver_object_id",
  "user_id": "user_object_id"
}
```

---

## Get User Ride History

### GET

```txt
/api/rides/user/:userId
```

Example:

```txt
/api/rides/user/clerk_123
```

---

# Models

---

# User Model

```ts
{
  name: string;
  email: string;
  clerkId: string;
}
```

---

# Driver Model

```ts
{
  first_name: string;
  last_name: string;
  profile_image_url: string;
  car_image_url: string;
  car_seats: number;
  rating: number;
}
```

---

# Ride Model

```ts
{
  origin_address: string;
  destination_address: string;

  origin_latitude: number;
  origin_longitude: number;

  destination_latitude: number;
  destination_longitude: number;

  ride_time: number;
  fare_price: number;

  payment_status: string;

  driver_id: ObjectId;
  user_id: ObjectId;
}
```

---

# Folder Explanation

| Folder | Purpose |
|---|---|
| config | Database connection |
| controllers | Business logic |
| models | MongoDB schemas |
| routes | API routes |
| utils | Helper functions |
| middlewares | Error handling |
| server.ts | Main entry point |

---

# Backend Flow

```txt
Frontend
   ↓
Express Routes
   ↓
Controllers
   ↓
MongoDB Models
   ↓
MongoDB Database
```

---

# Frontend Integration

Replace current local API routes:

OLD:

```ts
fetchAPI("/(api)/driver")
```

NEW:

```ts
fetch(`${API_URL}/api/drivers`)
```

---

# Recommended Frontend Structure

```txt
frontend/
├── app/
├── components/
├── constants/
├── store/
├── lib/
└── types/
```

---

# Recommended Backend Structure

```txt
backend/
├── src/
├── package.json
├── tsconfig.json
└── .env
```

---

# Deployment Suggestions

| Service | Use |
|---|---|
| Render | Backend Hosting |
| Railway | Backend Hosting |
| MongoDB Atlas | Database |
| Expo | Mobile Frontend |

---

# Future Improvements

- JWT Authentication
- Admin Panel
- Driver Live Location
- Real-time Ride Tracking
- Socket.IO Integration
- Notifications
- Ride Cancellation
- OTP Verification

---

# Author

Ujjwal Bharti

GitHub:
https://github.com/UjjwalBharti13


