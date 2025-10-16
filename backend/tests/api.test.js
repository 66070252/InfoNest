import request from 'supertest';
import express from 'express';
import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';
import router from '../routes/router.js';
import dotenv from 'dotenv'; // 1. Import dotenv เข้ามา

dotenv.config(); // 2. สั่งให้ dotenv ทำงาน

// --- Setup ---
let mongoServer;
const app = express();
app.use(express.json());
app.use('/api', router);

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  const mongoUri = mongoServer.getUri();
  await mongoose.connect(mongoUri);
});

afterAll(async () => {
  await mongoose.disconnect();
  await mongoServer.stop();
});

// --- ตัวแปรสำหรับเก็บข้อมูลระหว่างเทส ---
let token;
let createdUserId;
let createdPostId;

// --- เริ่มเขียน Test Cases ---
describe('Backend API Tests', () => {

  test('1. POST /api/user - Should register a new user', async () => {
    const res = await request(app)
      .post('/api/user')
      .send({
        username: 'testuser',
        email: 'test@example.com',
        password: 'password123',
      });
    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty('_id');
    createdUserId = res.body._id;
  });

  test('2. POST /api/login - Should log in and return a token', async () => {
    // ต้องสร้าง user ก่อน ถึงจะ login ได้
    await request(app).post('/api/user').send({ username: 'testuser', email: 'test@example.com', password: 'password123' });
    
    const res = await request(app)
      .post('/api/login')
      .send({
        emailOrUsername: 'test@example.com',
        password: 'password123',
      });
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('token');
    token = res.body.token;
  });

  test('3. POST /api/info - Should create a new post when authenticated', async () => {
    const res = await request(app)
      .post('/api/info')
      .set('Authorization', `Bearer ${token}`)
      .send({
        title: 'My First Test Post',
        info: 'This is the content of the test post.',
        imageUrl: null // เพิ่ม imageUrl เข้าไป
      });
    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty('title', 'My First Test Post');
    expect(res.body).toHaveProperty('author', createdUserId);
    createdPostId = res.body._id;
  });

  test('4. POST /api/info - Should FAIL to create post without auth', async () => {
    const res = await request(app)
      .post('/api/info')
      .send({
        title: 'Unauthorized Post',
        info: 'This should not be created.',
      });
    expect(res.statusCode).toEqual(401);
  });

  test('5. GET /api/info - Should retrieve all posts', async () => {
    const res = await request(app).get('/api/info');
    expect(res.statusCode).toEqual(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body.length).toBeGreaterThan(0); // << ตอนนี้จะเจอโพสต์แล้ว
  });

  test('6. GET /api/info/:id - Should retrieve a single post by ID', async () => {
    const res = await request(app).get(`/api/info/${createdPostId}`);
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('_id', createdPostId);
  });
  
  test('7. GET /api/info/search - Should find posts by query', async () => {
    const res = await request(app).get('/api/info/search?q=First Test');
    expect(res.statusCode).toEqual(200);
    expect(res.body.length).toBe(1);
    expect(res.body[0].title).toBe('My First Test Post');
  });

});