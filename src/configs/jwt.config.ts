import { ConfigService } from '@nestjs/config';
import { JwtModuleOptions } from '@nestjs/jwt';
export const getJwtConfig = (
  configService: ConfigService,
): JwtModuleOptions => {
  return {
    secret: configService.get('JWT_SECRET'),
  };
};
