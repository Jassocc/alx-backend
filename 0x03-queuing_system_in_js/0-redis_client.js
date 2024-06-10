// function for client 
import { createClient } from 'redis';

const create = createClient();

create.on('error', (err) => {
  console.log('Redis client not connected to the server:', err.toString());
});
create.on('connect', () => {
  console.log('Redis client connected to the server');
});
