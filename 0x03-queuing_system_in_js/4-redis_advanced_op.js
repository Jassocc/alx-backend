// store a hash value
import { createClient, print } from 'redis';

const create = createClient();

create.on('error', (err) => {
  console.log('Redis client not connected to the server:', err.toString());
});
create.on('connect', () => {
  console.log('Redis client connected to the server');
  setHolbertonSchools();
});
function setHolbertonSchools() {
  create.hset('HolbertonSchools', 'Portland', 50, print);
  create.hset('HolbertonSchools', 'Seattle', 80, print);
  create.hset('HolbertonSchools', 'New York', 20, print);
  create.hset('HolbertonSchools', 'Bogota', 20, print);
  create.hset('HolbertonSchools', 'Cali', 40, print);
  create.hset('HolbertonSchools', 'Paris', 2, print);
  displayHolberton();
}
function displayHolberton() {
  create.hgetall('HolbertonSchools', (err, obj) => {
    if (err) {
      console.error('Error', err);
    } else {
      console.log(obj);
    }
    create.quit();
  });
}
