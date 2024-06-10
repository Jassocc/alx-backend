// create a client for subs
import { createClient } from 'redis';

const sub = createClient();

sub.on('error', (err) => {
  console.log('Redis client not connected to the server:', err.toString());
});
sub.on('connect', () => {
  console.log('Redis client connected to the server');
  sub.subscribe('holberton school channel');
});
sub.on('message', (channel, message) => {
  console.log(message);
  if (message === 'KILL_SERVER') {
    sub.unsubscribe();
    sub.quit();
  }
});
