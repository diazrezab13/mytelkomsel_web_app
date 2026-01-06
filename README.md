# Technical Documentation for MyTelkomsel Web App

## Project Overview

MyTelkomsel Web App is a React-based web application that simulates a mobile operator service platform. Users can log in, view their account balance, purchase data packages, view transaction history, and manage their account. The application uses a microservices architecture with separate backend services for authentication, user management, and transactions.

## Screenshots

### Login Page
![Login Page](screenshots/login.png)
*The login page where users enter their phone number to authenticate.*

### Dashboard
![Dashboard](screenshots/dashboard.png)
*The main dashboard showing available data packages and user information.*

### Checkout Page
![Checkout Page](screenshots/checkout.png)
*The checkout page for confirming package purchases.*

### Transaction History
![History Page](screenshots/history.png)
*The page displaying user's transaction history.*

*Note: Screenshots are captured from the development environment. To add actual screenshots:*
1. Run `npm run dev` to start the application
2. Open `http://localhost:5173` in your browser
3. Navigate through the pages and take screenshots
4. Save them in a `screenshots/` folder in the project root
5. Update the image paths in this documentation

## Technology Stack

### Frontend
- **React 19.2.0**: JavaScript library for building user interfaces
- **Vite 7.2.4**: Build tool and development server
- **React Router DOM 7.11.0**: Routing library for React
- **Tailwind CSS 4.1.18**: Utility-first CSS framework
- **Framer Motion 12.23.26**: Animation library for React
- **Lucide React 0.562.0**: Icon library

### Development Tools
- **ESLint 9.39.1**: Linting utility
- **PostCSS 8.5.6**: CSS processing tool
- **Autoprefixer 10.4.23**: CSS vendor prefixing

## Architecture

### Frontend Architecture
The application follows a component-based architecture with the following structure:

```
src/
├── components/          # Reusable UI components
├── contexts/           # React Context providers for state management
├── hooks/             # Custom React hooks
├── pages/             # Page components (routes)
├── services/          # API service functions
├── utils/             # Utility functions
└── constants/         # Application constants
```

### State Management
The application uses React Context API for global state management:
- **AuthContext**: Manages user authentication and session
- **UserContext**: Manages user profile data (balance, quota, points)
- **ModalContext**: Manages modal dialogs
- **TransactionContext**: Manages transaction-related state

### Routing
Protected routes are implemented using a `ProtectedRoute` component that checks for user authentication before allowing access to certain pages.

## Backend Services

The application communicates with three backend microservices:

1. **Auth Service** (localhost:8081)
   - User authentication and OTP verification

2. **User Service** (localhost:8082)
   - User profile management and balance operations

3. **Transaction Service** (localhost:8083)
   - Package purchases and transaction history

## API Endpoints

### Auth Service (Port 8081)
- `POST /api/auth/login` - Initiate login with phone number
- `POST /api/auth/verify-otp` - Verify OTP code

### User Service (Port 8082)
- `GET /api/user/profile/{phone}` - Get user profile
- `POST /api/user/topup` - Top up user balance

### Transaction Service (Port 8083)
- `POST /api/transaction/buy` - Purchase a data package
- `GET /api/transaction/history/{phone}` - Get transaction history

## Components Overview

### Pages
- **LoginPage**: User authentication with phone number
- **OtpPage**: OTP verification
- **Dashboard**: Main dashboard showing packages and user info
- **CheckoutPage**: Package purchase confirmation
- **HistoryPage**: Transaction history
- **AccountPage**: Account management
- **NotificationsPage**: User notifications

### Key Components
- **ProtectedRoute**: Route guard for authenticated users
- **MessageModal**: Modal for displaying messages

## Data Packages

The application offers three predefined data packages:

1. Internet Sakti 10GB - 25,000 IDR (30 days)
2. Combo Sakti 25GB - 60,000 IDR (30 days)
3. GigaMAX 6GB - 15,000 IDR (30 days)

## Setup Instructions

### Prerequisites
- Node.js (version 16 or higher)
- npm or yarn package manager
- Backend services running on ports 8081, 8082, and 8083

### Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd mytelkomsel_web_app
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Open your browser and navigate to `http://localhost:5173`

### Build for Production

```bash
npm run build
```

### Preview Production Build

```bash
npm run preview
```

### Linting

```bash
npm run lint
```

## Configuration

### Environment Variables
The application uses hardcoded API URLs. For production deployment, consider using environment variables:

```javascript
// In services files, replace hardcoded URLs with:
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8081';
```

### Vite Configuration
The `vite.config.js` file contains basic React plugin configuration. Additional plugins can be added as needed.

### Tailwind CSS
Tailwind is configured in `tailwind.config.js`. Custom styles can be added in `src/index.css`.

## Deployment

### Docker
A `Dockerfile` is provided for containerized deployment:

```dockerfile
# Build stage
FROM node:18-alpine as build
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

# Production stage
FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

### Build and Run with Docker

```bash
docker build -t mytelkomsel-app .
docker run -p 80:80 mytelkomsel-app
```

## Security Considerations

- User sessions are stored in localStorage
- API calls should be secured with proper authentication tokens in production
- Input validation should be implemented on both frontend and backend
- HTTPS should be used for all API communications

## Performance Optimizations

- Vite provides fast development builds with HMR
- React 19 includes performance improvements
- Tailwind CSS generates minimal CSS bundles
- Code splitting can be implemented for larger applications

## Testing

Currently, no testing framework is configured. Consider adding:
- Jest for unit testing
- React Testing Library for component testing
- Cypress for end-to-end testing

## Future Enhancements

- Add TypeScript support
- Implement proper error boundaries
- Add loading states and skeletons
- Implement push notifications
- Add internationalization (i18n)
- Implement offline support with service workers

## Contributing

1. Follow the existing code style
2. Use ESLint for code quality
3. Test changes thoroughly
4. Update documentation as needed

## License

This project is private and proprietary.</content>
<parameter name="filePath">/Users/pesonnaoptimajasa/Documents/Belajar/mytelkomselapp/mytelkomsel_web_app/TECHNICAL_DOCUMENTATION.md