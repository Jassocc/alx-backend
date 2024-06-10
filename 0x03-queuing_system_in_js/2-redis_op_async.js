// function for client 
import { createClient, print } from 'redis';
import { promisify } from 'util';

const create = createClient();

create.on('error', (err) => {
  console.log('Redis client not connected to the server:', err.toString());
});
create.on('connect', async () =>{
  console.log('Redis client connected to the server');
  await main();
});
function setNewSchool(schoolName, value) {
  create.set(schoolName, value, print);
}
const displaySchoolValue = async (schoolName) => {
  console.log(await promisify(create.get).bind(create)(schoolName));
}
async function main() {
  await displaySchoolValue('Holberton');
  setNewSchool('HolbertonSanFrancisco', '100');
  await displaySchoolValue('HolbertonSanFrancisco');
}
