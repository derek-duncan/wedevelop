import mqtt from 'mqtt';
import config from '../../../config.js';

let mqttClient;

export default function() {
  if (!mqttClient) {
    mqttClient = mqtt.connect(config.mqtt.url);
  }
  return mqttClient;
}
