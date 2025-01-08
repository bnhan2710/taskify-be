import { createClient } from "redis"
import { env } from "./env.config";

const instance = createClient({
    url: env.REDIS_URL
})

export const ConnectRedis = async (): Promise<void> => {
    try {
        await instance.connect();
        console.log('Redis connected');
    } catch (error) {
        console.error('Error connecting to the redis:', error);
    }
}
                         
export default instance
