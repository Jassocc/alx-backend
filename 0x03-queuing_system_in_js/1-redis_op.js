// function for client 
import { createClient, print } from 'redis';

const create = createClient();

create.on('error', (err) => {
  console.log('Redis client not connected to the server:', err.toString());
});
create.on('connect', () => {
  console.log('Redis client connected to the server');
});
function setNewSchool(schoolName, value) {
  create.set(schoolName, value, print);
}
function displaySchoolValue(schoolName) {
  create.get(schoolName, (_err, rep) => {
    console.log(rep);
  });
}
displaySchoolValue('Holberton');
setNewSchool('HolbertonSanFrancisco', '100');
displaySchoolValue('HolbertonSanFrancisco');
