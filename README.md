


          
# GoGoGlo Backend

## Overview
GoGoGlo Backend is a Node.js-based API server for a travel booking platform. This backend provides the necessary infrastructure to support the GoGoGlo travel application, handling user authentication, booking management, and payment processing.

## Features
- User authentication and authorization
- Tour and destination management
- Booking and reservation system
- Payment processing integration
- Admin dashboard for content management
- Email notifications

## Tech Stack
- Node.js
- Express.js
- MongoDB
- JWT for authentication
- Payment gateway integration
- Cloud storage for media files

## Prerequisites
- Node.js (v14 or higher)
- MongoDB
- npm or yarn

## Installation

1. Clone the repository
```bash
git clone https://github.com/yourusername/gogoglo-backend.git
cd gogoglo-backend
```

2. Install dependencies
```bash
npm install
```

3. Create a `.env` file in the root directory with the following variables:
```
PORT=5000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
PAYMENT_API_KEY=your_payment_gateway_key
EMAIL_SERVICE=your_email_service
EMAIL_USER=your_email
EMAIL_PASS=your_email_password
```

## Running the Application

### Development
```bash
npm run dev
```

### Production
```bash
npm start
```

## API Documentation

### Authentication Endpoints
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - User login
- `POST /api/auth/forgot-password` - Request password reset
- `POST /api/auth/reset-password` - Reset password

### Tour Endpoints
- `GET /api/tours` - Get all tours
- `GET /api/tours/:id` - Get tour by ID
- `POST /api/tours` - Create a new tour (admin only)
- `PUT /api/tours/:id` - Update a tour (admin only)
- `DELETE /api/tours/:id` - Delete a tour (admin only)

### Booking Endpoints
- `POST /api/bookings` - Create a new booking
- `GET /api/bookings` - Get all bookings (admin only)
- `GET /api/bookings/user` - Get user's bookings
- `GET /api/bookings/:id` - Get booking by ID
- `PUT /api/bookings/:id` - Update booking status

### Payment Endpoints
- `POST /api/payments/create-checkout` - Create payment checkout session
- `POST /api/payments/webhook` - Payment webhook handler

## Project Structure
```
gogoglo-backend/
├── config/             # Configuration files
├── controllers/        # Request handlers
├── middleware/         # Custom middleware
├── models/             # Database models
├── routes/             # API routes
├── services/           # Business logic
├── utils/              # Utility functions
├── .env                # Environment variables (not in repo)
├── .gitignore          # Git ignore file
├── package.json        # Project dependencies
├── README.md           # Project documentation
└── server.js           # Entry point
```

## Contributing
1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License
This project is licensed under the MIT License.
