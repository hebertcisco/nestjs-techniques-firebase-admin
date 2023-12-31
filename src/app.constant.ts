import { configService } from 'nest-shared';

export const FIREBASE_ADMIN_PROJECT_ID = configService.getValue<string>(
  'FIREBASE_ADMIN_PROJECT_ID',
);
export const FIREBASE_ADMIN_CLIENT_EMAIL = configService.getValue<string>(
  'FIREBASE_ADMIN_CLIENT_EMAIL',
);
export const FIREBASE_ADMIN_PRIVATE_KEY = configService.getValue<string>(
  'FIREBASE_ADMIN_PRIVATE_KEY',
);
