import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { Transport } from '@nestjs/microservices';
import { AppModule } from './app.module';

const packageJSON = require('../package.json');

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const microservice = app.connectMicroservice({
    transport: Transport.MQTT,
    options: {
      url: process.env.MQTT_URL,
    },
  });

  const config = new DocumentBuilder()
    .setTitle('nestjs-firebase-admin')
    .setDescription('Firebase Admin SDK for Nestjs 🔥')
    .setVersion(packageJSON.dependencies['nestjs-firebase-admin'])
    .addTag('firebase')
    .build();

  const documentFactory = () => SwaggerModule.createDocument(app, config);

  SwaggerModule.setup('docs', app, documentFactory);

  await Promise.all([
    microservice.listen(),
    app.listen(process.env.HTTP_PORT || 3000),
  ]);
  console.log(`🚀 Microservices is running`);
  console.log(
    `🚀 HTTP API is listening on port ${process.env.HTTP_PORT || 3000}`,
  );
}
bootstrap();
