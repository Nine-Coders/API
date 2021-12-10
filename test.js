const app = require('./server/testingServer.js');
const supertest = require('supertest');

test('GET /topics will retrieve all topics', async () => {
  await supertest(app).get('/topics')
  .expect(200)
  .then((res) => {
    expect(res.body.length).toBe(10)
    expect(res.body[0].name).toBe('math')
    expect(res.body[0].url).toBe('https://via.placeholder.com/200x200')
  });
});

test('GET /:topic_id/rooms will retrieve all rooms for that topic', async () => {
  await supertest(app).get('/1/rooms')
  .expect(200)
  .then((res) => {
    expect(res.body.length).toBe(1)
    expect(res.body[0].name).toBe('the danger zone')
    expect(res.body[0].thumbnail).toBe('https://via.placeholder.com/200x200')
  });
});

test('GET /rooms/:room_id/messages will retrieve all messages for that room', async () => {
  await supertest(app).get('/rooms/1/messages')
  .expect(200)
  .then((res) => {
    expect(res.body.length).toBe(3)
    expect(res.body[0].body).toBe('testing')
    expect(res.body[0].user_id).toBe(1)
  });
});

test('GET /rooms/:room_id/goals will retrieve all goals for that room', async () => {
  await supertest(app).get('/rooms/1/goals')
  .expect(200)
  .then((res) => {
    expect(res.body.length).toBe(3)
    expect(res.body[0].name).toBe('goal1')
    expect(res.body[0].description).toBe('description1')
  });
});

test('GET /rooms/:room_id/events will retrieve all events for that room', async () => {
  await supertest(app).get('/rooms/1/events')
  .expect(200)
  .then((res) => {
    expect(res.body.length).toBe(10)
    expect(res.body[0].name).toBe('study session')
  });
});

test('GET /rooms/:room_id/files will retrieve all users for that room', async () => {
  await supertest(app).get('/rooms/1/files')
  .expect(200)
  .then((res) => {
    expect(res.body.length).toBe(1)
    expect(res.body[0].url).toBe('https://via.placeholder.com/50x50')
    expect(res.body[0].name).toBe('placeholder10')
  });
});