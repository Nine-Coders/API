import http from 'k6/http';
import { sleep, check } from 'k6';

const url = 'http://localhost:5000/rooms/';

export const options = {
  vus: 10,
  duration: '30s',
};

export default function () {
  let endpoint = url + (Math.floor(Math.random() * 10) + 1) + '/users'

  const res = http.get(endpoint);
  check(res, {
    'is status 200': r => r.status === 200,
    'transation time < 10ms': r => r.timings.duration < 10,
    'transation time < 20ms': r => r.timings.duration < 20,
    'transation time < 50ms': r => r.timings.duration < 50,
    'transation time < 100ms': r => r.timings.duration < 100,
    'transation time < 200ms': r => r.timings.duration < 200,
  });
  sleep(0.1);
};