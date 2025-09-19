import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { Server } from 'http';
import { Types } from 'mongoose';
import { REVIEW_NOT_FOUND } from '../src/reviews/reviews.constants';
import { ReviewsDocument } from '../src/reviews/reviews.model';
import request from 'supertest';
import { AppModule } from '../src/app.module';

const productId = new Types.ObjectId().toHexString();

const testReview = {
  name: 'Test review',
  title: 'This is test review',
  description: 'Hello now i am testing my review',
  rating: 5,
  productId,
};

describe('AppController (e2e)', () => {
  let app: INestApplication;
  let httpServer: Server;
  let createdReviewId: string;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
    httpServer = app.getHttpServer() as Server;
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
      .expect(200);

    const reviewBody = response.body as ReviewsDocument[];
    expect(reviewBody.length).toBe(1);
  });

  it('/reviews/byProduct/:productId - fail (GET)', async () => {
    const response = await request(httpServer)
      .get(`/reviews/byProduct/${new Types.ObjectId().toHexString()}`)
      .expect(200);

    const reviewBody = response.body as ReviewsDocument[];
    expect(reviewBody.length).toBe(0);
  });

  it('/reviews/:id success (DELETE)', async () => {
    await request(httpServer).delete(`/reviews/${createdReviewId}`).expect(200);
  });

  it('/reviews/:id - fail (DELETE)', async () => {
    await request(httpServer)
      .delete(`/reviews/${new Types.ObjectId().toHexString()}`)
      .expect(404, {
        statusCode: 404,
        message: REVIEW_NOT_FOUND,
      });
  });

  afterAll(async () => {
    await app.close();
  });
});
