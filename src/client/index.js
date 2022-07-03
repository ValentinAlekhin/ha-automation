require("dotenv").config();

const mqtt = require("mqtt");

const { MQTT_URL, MQTT_USERNAME, MQTT_PASSWORD } = process.env;

console.log(MQTT_URL);

const client = mqtt.connect(MQTT_URL, {
  username: MQTT_USERNAME,
  password: MQTT_PASSWORD,
});

module.exports = { client };
