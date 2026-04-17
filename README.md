# NestJS Techniques: Firebase Admin

<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

Example project demonstrating how to integrate [nestjs-firebase-admin](https://www.npmjs.com/package/nestjs-firebase-admin) with NestJS, including Realtime Database CRUD, FCM push notifications, and MQTT-based event-driven messaging.

## Stack

| Layer | Technology |
|---|---|
| Framework | NestJS 11 |
| Firebase | `nestjs-firebase-admin` (Admin SDK wrapper) |
| Messaging | MQTT via `@nestjs/microservices` |
| Push Notifications | Firebase Cloud Messaging (FCM) |
| Docs | Swagger (`@nestjs/swagger`) |
| Validation | `class-validator` + `class-transformer` |
| Deploy | Docker, Docker Compose, Fly.io |

## Project Structure

```
src/
  app.module.ts             # Root module (Firebase Admin + MQTT setup)
  app.controller.ts         # REST endpoints (CRUD)
  app.service.ts            # Business logic (DatabaseService usage)
  main.ts                   # Bootstrap (HTTP + MQTT microservice + Swagger)
  dtos/
    SetDataDto.ts           # Create DTO with validation
    UpdateDataDto.ts        # Partial update DTO
  notification/
    notification.controller.ts  # MQTT event listener (@EventPattern)
    notification.service.ts     # FCM + MQTT publish logic
```

## Prerequisites

- Node.js >= 20
- Firebase project with Admin SDK credentials
- MQTT broker (e.g., Mosquitto)

## Setup

```bash
npm install
cp .env.example .env
```

Fill in `.env`:

```env
FIREBASE_PROJECT_ID=your-project-id
FIREBASE_CLIENT_EMAIL=your-client-email
FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n"
FIREBASE_DATABASE_URL=https://your-project.firebaseio.com
FIREBASE_STORAGE_BUCKET=your-project.appspot.com
MQTT_URL=mqtt://localhost:1883
PORT=5672
```

## Running

```bash
# Development (watch mode)
npm run start:dev

# Production
npm run build && npm run start:prod
```

The app starts both an HTTP server and an MQTT microservice. Swagger docs are available at `/docs`.

## API Endpoints

| Method | Path | Description |
|---|---|---|
| `GET` | `/` | List all data |
| `POST` | `/` | Create data (triggers MQTT event + delayed FCM notification) |
| `PUT` | `/update/:id` | Update data by ID |
| `DELETE` | `/delete/:id` | Delete data by ID |

## How It Works

1. **Create** (`POST /`) - Saves data to Firebase Realtime Database, then publishes a `data-created` event via MQTT
2. **MQTT Listener** - `NotificationController` subscribes to `data-created` events using `@EventPattern`
3. **FCM Push** - `NotificationService` sends a welcome push notification via FCM after a 10s delay
4. **CRUD** - All database operations use `DatabaseService` from `nestjs-firebase-admin`

## Docker

```bash
# Build and run
docker build -t nestjs-techniques-firebase-admin .
docker run --env-file .env -p 5672:5672 nestjs-techniques-firebase-admin

# Or with Docker Compose
docker-compose up --build
```

## Deploy to Fly.io

```bash
fly launch
fly deploy
```

The `fly.toml` is pre-configured for the `gru` region on port 5672.

## Testing

```bash
npm run test          # Unit tests
npm run test:e2e      # E2E tests
npm run test:cov      # Coverage
```

## License

[UNLICENSED](LICENSE)
