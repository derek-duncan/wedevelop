import Koa from 'koa';
import io from 'socket.io-client';

const app = new Koa();
const socket = io('http://localhost:3000');

socket.on('connect', function() {
  console.log('connected to io server');
});
socket.on('news', data => {
  console.log(data);
});

app.listen(3001);
console.log(`listening on port 3001`);

export default app;
