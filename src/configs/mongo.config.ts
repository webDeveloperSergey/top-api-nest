import { ConfigService } from '@nestjs/config';

export const getMongoConfig = (configService: ConfigService) => {
  const host = configService.get<string>('MONGO_HOST', 'localhost');
  const port = configService.get<string>('MONGO_PORT', '27017');
  const username = configService.get<string>('MONGO_USERNAME', 'admin');
  const password = configService.get<string>('MONGO_PASSWORD', 'admin');
  const database = configService.get<string>('MONGO_DATABASE', 'top-api');

  // mongodb://username:password@localhost:27017/database_name?authSource=admin
  return {
    uri: `mongodb://${username}:${password}@${host}:${port}/${database}?authSource=admin`,
  };
};
