import Koa from 'koa';
import mqtt from 'mqtt';
import config from '../../config.js';

const app = new Koa();

const client = mqtt.connect(config.mqtt.url);
client.on('connect', function () {
  client.publish('presence', 'Hello mqtt');

  client.subscribe('posts');
});

client.on('message', function(topic, message) {
  console.log(topic, message.toString());
});

app.listen(3001);
console.log(`listening on port 3001`);

export default app;
