import { DynamicModule, Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { configService } from 'nest-shared';
import { AdminModule, DatabaseService } from 'nestjs-firebase-admin';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { NotificationController } from './notification/notification.controller';
import { NotificationService } from './notification/notification.service';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'MQTT_SERVICE',
        transport: Transport.MQTT,
        options: {
          url: configService.getValue<string>('MQTT_URL'),
          clientId: 'nestjs-notification-client',
        },
      },
    ]),
    AdminModule.registerAsync({
      useFactory: async () => ({
        credential: {
          projectId: process.env.FIREBASE_PROJECT_ID,
          clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
          privateKey: process.env.FIREBASE_PRIVATE_KEY!.replace(/\\n/g, '\n'),
        },
        databaseURL: process.env.FIREBASE_DATABASE_URL,
        storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
      }),
    }) as DynamicModule,
  ],
  controllers: [AppController, NotificationController],
  providers: [AppService, NotificationService],
  exports: [AppService, NotificationService],
})
export class AppModule {}
