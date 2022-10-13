const redis = require("redis");

/* const client = redis.createClient({
  port: 6379,
  host: "127.0.0.1",
}); */

let client;
if (process.env.REDISCLOUD_URL) {
  let REDISGO_URL = process.env.REDISCLOUD_URL;
  client = redis.createClient(REDISGO_URL);
} else {
  client = redis.createClient();
}

client.connect();

client.on("connect", () => {
  console.log("Client connected to redis");
});

client.on("ready", () => {
  console.log("Client connected to redis and ready to use");
});

client.on("error", (err) => {
  console.log(err);
});

client.on("end", () => {
  console.log("Client disconnected from redis");
});

process.on("SIGINT", () => {
  client.quit();
});

module.exports = client;
