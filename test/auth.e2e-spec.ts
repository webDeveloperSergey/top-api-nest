import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { Server } from 'http';
import { AuthDto } from 'src/auth/dto/auth.dto';
import request from 'supertest';
import { AppModule } from '../src/app.module';

const loginDto: AuthDto = {
  login: 'a3@g.ru',
  password: '1',
};

interface AuthResponse {
  body: {
    access_token: string;
  };
}

describe('AppController (e2e)', () => {
  let app: INestApplication;
  let httpServer: Server;
  let token: string;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
    httpServer = app.getHttpServer() as Server;

    const authResponse: AuthResponse = await request(httpServer)
      .post('/auth/login')
      .send(loginDto);

    token = authResponse.body.access_token;
  });

  it('/auth/login - success (POST)', async () => {
    const response = await request(httpServer)
      .post('/auth/login')
      .send(loginDto)
      .expect(200);

    const loginBody = response.body as AuthResponse['body'];
    expect(loginBody.access_token).toBeDefined();
  });

  it('/auth/login - fail login (POST)', async () => {
    return request(httpServer)
      .post('/auth/login')
      .send({ ...loginDto, login: 'a3333@g.ru' })
      .expect(401, {
        statusCode: 401,
        message: 'User not found',
        error: 'Unauthorized',
      });
  });

  it('/auth/login - fail password (POST)', async () => {
    return request(httpServer)
      .post('/auth/login')
      .send({ ...loginDto, password: '2' })
      .expect(401, {
        statusCode: 401,
        message: 'Wrong password',
        error: 'Unauthorized',
      });
  });

  afterAll(async () => {
    await app.close();
  });
});
