# Taskify Backend

![Node.js](https://img.shields.io/badge/Node.js-18+-green)
![TypeScript](https://img.shields.io/badge/TypeScript-5.6+-blue)
![Express](https://img.shields.io/badge/Express-4.21+-lightgrey)
![TypeORM](https://img.shields.io/badge/TypeORM-0.3+-orange)
![MySQL](https://img.shields.io/badge/MySQL-5.7+-blue)
![Redis](https://img.shields.io/badge/Redis-6.2+-red)

Taskify is a comprehensive **Trello-inspired project management application** built with modern technologies. This backend API provides robust project management capabilities including board creation, task management, team collaboration, and real-time activity tracking.

## 🚀 Features

### Core Functionality
- 🎯 **Project Management**: Create boards, lists, and cards for task organization
- 👥 **Team Collaboration**: Multi-user boards with role-based permissions
- 🔐 **Authentication & Authorization**: JWT-based auth with Google OAuth integration
- 📱 **Real-time Activity Logging**: Track all board activities and changes
- 📎 **File Management**: Upload attachments and board backgrounds via Cloudinary
- ✅ **Task Management**: Checklists, comments, and due dates
- 🔔 **Notifications**: Real-time notifications for board activities

### Technical Features
- 🏗️ **Modular Architecture**: Modular design
- 🔒 **RBAC**: Role-Based Access Control (Owner, Member, Guest)
- 📊 **Caching**: Redis-based caching for improved performance
- 🐳 **Docker Support**: Containerized deployment with Docker Compose
- 📚 **Database Migrations**: TypeORM migrations for schema management
- 📝 **API Documentation**: RESTful API with comprehensive error handling

## 🏗️ Architecture

```
src/
├── core/                    # Core infrastructure
│   ├── configs/            # Database, Redis, Cloudinary configs
│   ├── middleware/         # Authentication, authorization, validation
│   └── handler/           # Error handling and response formatting
├── database/               # Data layer
│   ├── entities/          # TypeORM entities
│   ├── migrations/        # Database migrations
│   └── seeders/          # Database seeders
├── modules/               # Feature modules
│   ├── auth/             # Authentication & authorization
│   ├── user/             # User management
│   ├── workspace/        # Workspace management
│   ├── board/            # Board management
│   ├── list/             # List management
│   ├── card/             # Card management
│   ├── comment/          # Comment system
│   ├── checklist/        # Checklist functionality
│   ├── upload/           # File upload handling
│   ├── activity/         # Activity logging
│   └── notification/     # Notification system
├── shared/               # Shared utilities
│   ├── services/         # Shared services (cache, email)
│   ├── utils/           # Utility functions
│   ├── types/           # TypeScript type definitions
│   └── common/          # Constants and enums
└── apis/                # API route definitions
```

## 🛠️ Technology Stack

- **Runtime**: Node.js 18+
- **Language**: TypeScript 5.6+
- **Framework**: Express.js 4.21+
- **Database**: MySQL 5.7+ with TypeORM 0.3+
- **Caching**: Redis 6.2+
- **Authentication**: JWT + Google OAuth 2.0
- **File Storage**: Cloudinary
- **Testing**: Jest
- **Code Quality**: ESLint + Prettier
- **Containerization**: Docker + Docker Compose

## 📋 Prerequisites

- Node.js 18+
- yarn or npm
- MySQL 5.7+
- Redis 6.2+
- Docker & Docker Compose (for containerized deployment)

## 🚀 Installation & Setup

### 1. Clone the Repository
```bash
git clone https://github.com/bnhan2710/taskify-be.git
cd taskify-be
```

### 2. Install Dependencies
```bash
yarn install
# or
npm install
```

### 3. Environment Configuration
Create a `.env` file in the root directory with the following variables:

```env
# Application
BUILD_MODE=development
PORT=8000
SESSION_SECRET=your_session_secret

# Database Configuration
DB_HOST=localhost
DB_USER=your_db_user
DB_PASS=your_db_password
DB_NAME=taskify
DB_PORT=3306
DB_DIALECT=mysql

# Redis Configuration
REDIS_URL=redis://localhost:6379

# JWT Configuration
SECRET_KEY=your_jwt_secret_key
REFRESH_TOKEN_EXPIRE=86400000
ACCESS_TOKEN_EXPIRE=60000
CACHE_EXPIRE=360000

# Cloudinary Configuration (for file uploads)
CLOUDINARY_CLOUD_NAME=your_cloudinary_name
CLOUDINARY_API_KEY=your_cloudinary_key
CLOUDINARY_API_SECRET=your_cloudinary_secret

# Google OAuth (optional)
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
```

### 4. Database Setup
```bash
# Run database migrations
yarn migration:run

# Seed RBAC data (roles and permissions)
yarn seed-rbac
```

### 5. Start the Application

**Development Mode:**
```bash
yarn dev
```

**Production Mode:**
```bash
yarn build
yarn start
```

The server will be running at `http://localhost:8000`

## 🐳 Docker Deployment

### Using Docker Compose (Recommended)
```bash
# Start all services (MySQL, Redis, Backend)
docker-compose up -d

# View logs
docker-compose logs -f

# Stop services
docker-compose down
```

The Docker setup includes:
- **MySQL 5.7** on port 3307
- **Redis 6.2** on port 6378  
- **Taskify Backend** on port 8000

### Manual Docker Build
```bash
# Build the image
docker build -t taskify-backend .

# Run the container
docker run -p 8000:8000 --env-file .env taskify-backend
```
## 🧪 Development

### Available Scripts

```bash
# Development
yarn dev                    # Start development server with hot reload

# Building
yarn build                  # Compile TypeScript to JavaScript

# Database
yarn migration:generate     # Generate new migration
yarn migration:run          # Run pending migrations
yarn migration:revert       # Revert last migration
yarn seed-rbac             # Seed roles and permissions

# Code Quality
yarn lint                   # Run ESLint
yarn lint:fix              # Fix ESLint issues
yarn format                # Format code with Prettier

# Testing
yarn test                   # Run tests
```

### Project Structure Conventions

- **Controllers**: Handle HTTP requests and responses
- **Services**: Contain business logic
- **Repositories**: Handle database operations
- **DTOs**: Data Transfer Objects for validation
- **Entities**: TypeORM database entities
- **Middleware**: Request processing and validation
- **Validators**: Input validation schemas

## 🔒 Security Features

- **JWT Authentication**: Secure token-based authentication
- **Password Hashing**: bcrypt for password security
- **CORS Protection**: Configurable CORS policy
- **Helmet**: Security headers
- **Input Validation**: Joi-based request validation
- **Role-Based Access Control**: Fine-grained permissions
- **Rate Limiting**: Protection against abuse

## 🔄 RBAC System

### Roles
- **Owner**: Full board control
- **Member**: Can edit and create content
- **Guest**: Read-only access

### Permissions
- `CAN_VIEW_BOARD`
- `CAN_UPDATE_BOARD`
- `CAN_DELETE_BOARD`
- `CAN_INVITE_MEMBER`
- `CAN_REMOVE_MEMBER`
- `CAN_CREATE_LIST`
- `CAN_UPDATE_LIST`
- `CAN_DELETE_LIST`
- `CAN_CREATE_CARD`
- `CAN_UPDATE_CARD`
- `CAN_DELETE_CARD`

## 📊 Database Schema

The application uses MySQL with TypeORM. Key entities include:

- **Users**: User accounts and profiles
- **Workspaces**: Project containers
- **Boards**: Kanban boards
- **Lists**: Board columns
- **Cards**: Individual tasks
- **Comments**: Card discussions
- **Checklists**: Task checklists
- **Activity_Logs**: Audit trail
- **Notifications**: User notifications

## 🚀 Deployment

### Production Checklist

1. **Environment Variables**: Set all production environment variables
2. **Database**: Ensure MySQL is configured and accessible
3. **Redis**: Set up Redis for caching
4. **Cloudinary**: Configure for file uploads
5. **SSL**: Enable HTTPS in production
6. **Monitoring**: Set up logging and monitoring
7. **Backup**: Configure database backups

### Environment-Specific Configurations

- **Development**: Hot reload, detailed logging
- **Production**: Optimized builds, error tracking, security headers

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit changes: `git commit -m 'Add amazing feature'`
4. Push to branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

### Code Style

- Follow TypeScript best practices
- Use ESLint and Prettier configurations
- Write descriptive commit messages
- Add tests for new features

## 📄 License

This project is licensed under the ISC License.

## 👨‍💻 Author

**bnhan2710**
- GitHub: [@bnhan2710](https://github.com/bnhan2710)

## 🆘 Support

For support and questions:
- Create an issue on GitHub
- Check the documentation
- Review the API examples

---

⭐ **Star this repository if it helped you!**
