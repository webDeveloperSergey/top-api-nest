import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { Server } from 'http';
import { Types } from 'mongoose';
import { AuthDto } from 'src/auth/dto/auth.dto';
import request from 'supertest';
import { AppModule } from '../src/app.module';
import { REVIEW_NOT_FOUND } from '../src/reviews/reviews.constants';
import { ReviewsDocument } from '../src/reviews/reviews.model';

const productId = new Types.ObjectId().toHexString();

const testReview = {
  name: 'Test review',
  title: 'This is test review',
  description: 'Hello now i am testing my review',
  rating: 5,
  productId,
};

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
  let createdReviewId: string;
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

  it('/reviews/create - success (POST)', async () => {
    const response = await request(httpServer)
      .post('/reviews/create')
      .send(testReview)
      .expect(201);

    const reviewBody = response.body as ReviewsDocument;

    createdReviewId = reviewBody._id.toString();

    expect(reviewBody._id).toBeDefined();
  });

  it('/reviews/byProduct/:productId - success (GET)', async () => {
    const response = await request(httpServer)
      .get(`/reviews/byProduct/${productId}`)
      .set('Authorization', `Bearer ${token}`)
      .expect(200);

    const reviewBody = response.body as ReviewsDocument[];
    expect(reviewBody.length).toBe(1);
  });

  it('/reviews/byProduct/:productId - fail (GET)', async () => {
    const response = await request(httpServer)
      .get(`/reviews/byProduct/${new Types.ObjectId().toHexString()}`)
      .set('Authorization', `Bearer ${token}`)
      .expect(200);

    const reviewBody = response.body as ReviewsDocument[];
    expect(reviewBody.length).toBe(0);
  });

  it('/reviews/:id success (DELETE)', async () => {
    await request(httpServer)
      .delete(`/reviews/${createdReviewId}`)
      .set('Authorization', `Bearer ${token}`)
      .expect(200);
  });

  it('/reviews/:id - fail (DELETE)', async () => {
    await request(httpServer)
      .delete(`/reviews/${new Types.ObjectId().toHexString()}`)
      .set('Authorization', `Bearer ${token}`)
      .expect(404, {
        statusCode: 404,
        message: REVIEW_NOT_FOUND,
      });
  });

  afterAll(async () => {
    await app.close();
  });
});
