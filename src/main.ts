import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
 
const packageJSON = require('../package.json');



async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('nestjs-firebase-admin')
    .setDescription('Firebase Admin SDK for Nestjs 🔥')
    .setVersion(packageJSON.dependencies['nestjs-firebase-admin'])
    .addTag('firebase')
    .build();
  
  const documentFactory = () => SwaggerModule.createDocument(app, config);
  
  SwaggerModule.setup('docs', app, documentFactory);

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
