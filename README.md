# NestJS Firebase Admin Integration

<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

## Description

This project demonstrates the integration of NestJS with Firebase Admin SDK, MQTT, and async notification techniques. It includes features like data management, real-time notifications, and cloud deployment.

## Features

- 🔐 Firebase Admin SDK Integration
- 📝 RESTful API with Swagger Documentation
- ✅ Input Validation using class-validator
- 📚 TypeScript Support
- 🔄 Real-time Database Operations
- 📢 MQTT-based Notification System
- 📲 FCM Push Notifications
- 🛡️ Security Best Practices
- 🐳 Docker & Docker Compose support
- 🚀 Fly.io deployment ready

## Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- Firebase Project with Admin SDK credentials
- MQTT Broker (e.g., Mosquitto)

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
FIREBASE_DATABASE_URL=your-firebase-db-url
FIREBASE_STORAGE_BUCKET=your-firebase-bucket
MQTT_URL=mqtt://localhost:1883
```

## Running the Application

### Locally

```bash
# Development
$ npm run start

# Watch mode
$ npm run start:dev

# Production mode
$ npm run start:prod
```

### With Docker

Build and run the application using Docker:

```bash
# Build the Docker image
$ docker build -t nestjs-firebase-admin .

# Run the container
$ docker run --env-file .env -p 3000:3000 nestjs-firebase-admin
```

### With Docker Compose

You can use `docker-compose.yml` to run the app and expose the MQTT port:

```bash
docker-compose up --build
```

- The app will be available on port 5672 (as mapped in docker-compose).
- Make sure your MQTT broker is accessible at the URL specified in `MQTT_URL`.

## Deploying to Fly.io

This project is ready for deployment on [Fly.io](https://fly.io/):

1. Install the Fly CLI: <https://fly.io/docs/hands-on/install-flyctl/>
2. Authenticate: `fly auth login`
3. Launch your app:

   ```bash
   fly launch
   fly deploy
   ```

4. The `fly.toml` is preconfigured for the app and exposes port 5672.

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
