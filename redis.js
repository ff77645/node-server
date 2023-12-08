import { createClient } from 'redis';

const client = createClient();

client.on('error', err => {
    console.log('redis error', err);
    throw err
});

await client.connect();

client.hSet('rooms','001',JSON.stringify({
    roomName:'大厅',
    roomId:'001',
    roomNum:'001',
}))


export default client