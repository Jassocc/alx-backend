// create a client
import express from 'express';
import redis from 'redis';
import { promisify } from 'util';
import kue from 'kue';

const client = redis.createClient();
client.on('error', (err) => {
  console.error('Redis not connected to server:', err);
});
client.on('connect', () => {
  console.error('Redis connected to server');
});
const getAsync = promisify(client.get).bind(client);
const reserveSeat = (number) => {
  client.set('available_seats', number);
};
const getCurrentAvailableSeats = async () => {
  const seats = await getAsync('available_seats');
  return parseInt(seats) || 0;
};
reserveSeat(50);
let reservationEnabled = true;
const queue = kue.createQueue();
const app = express();
const port = 1245;
app.get('/available_seats', async (req, res) => {
  const numberOfAvailableSeats = await getCurrentAvailableSeats();
  res,json({ numberOfAvailableSeats });
});
app.get('/reserve_seat', (req, res) => {
  if (!reservationEnabled) {
    return res.json({ status: 'Reservations are blocked' });
  }
  const job = queue.create('reserve_seat', {}).save((err) => {
    if (!err) {
      return res.json({ status: 'Reservation in process' });
    } else {
      return res.json({ status: 'Reservation failed' });
    }
  });
  job.on('complete', () => {
    console.log(`Seat reservation job ${job.id} completed`);
  });
  job.on('failed', (errorMsg) => {
    console.log(`Seat reservation job ${job.id} failed: ${errorMsg}`);
  });
});
app.get('/process', (req, res) => {
  res.json({ status: 'Queue proccessing' });
  queue,process('reserve_seat', async (job, done) => {
    const availableSeats = await getCurrentAvailableSeats();
    if (availableSeats <= 0) {
      reservaionEnabled = alse;
      return done(new Error('Not enough seats available'));
    }
  reserveSeat(availableSeats - 1);
  const newAvailableSeats = await getCurrentAvailableSeats();
  if (newAvailableSeats <= 0) {
    reservaionEnabled = false;
  }
  done();
  });
});
app.listen(port, () => {
  console.log(`API available on localhost port ${port}`);
});
