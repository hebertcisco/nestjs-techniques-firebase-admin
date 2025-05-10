# NestJS Firebase Admin Integration

<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">

## Description

This project demonstrates the integration of NestJS with Firebase Admin SDK, showcasing various techniques for building robust backend applications. It includes features like data management, authentication, and real-time database operations.

## Features

- 🔐 Firebase Admin SDK Integration
- 📝 RESTful API with Swagger Documentation
- ✅ Input Validation using class-validator
- 📚 TypeScript Support
- 🔄 Real-time Database Operations
- 🛡️ Security Best Practices

## Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- Firebase Project with Admin SDK credentials

## Installation

```bash
# Clone the repository
$ git clone [your-repository-url]

# Install dependencies
$ npm install
```

## Configuration

1. Create a Firebase project in the [Firebase Console](https://console.firebase.google.com/)
2. Generate a new private key for your service account
3. Create a `.env` file in the root directory with the following variables:

```env
FIREBASE_PROJECT_ID=your-project-id
FIREBASE_PRIVATE_KEY=your-private-key
FIREBASE_CLIENT_EMAIL=your-client-email
```

## Running the Application

```bash
# Development
$ npm run start

# Watch mode
$ npm run start:dev

# Production mode
$ npm run start:prod
```

## API Documentation

Once the application is running, you can access the Swagger documentation at:

```
http://localhost:3000/docs
```

## Testing

```bash
# Unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# Test coverage
$ npm run test:cov
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Support

For support, please open an issue in the GitHub repository or contact the maintainers.
