import "dotenv/config";
import Redis from "ioredis";

const redis = new Redis({
    host: process.env.REDIS_HOST,
    port: Number(process.env.REDIS_PORT),
    maxRetriesPerRequest: 3,
});

redis.on("connect", () => {
    console.log("Connected to Redis successfully!");
});

redis.on("error", (err) => {
    console.error("Redis connection error:", err.message);
});

export default redis;