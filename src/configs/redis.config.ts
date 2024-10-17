import { createClient } from "redis"

const instance = createClient({
    url: process.env.REDIS_URL
})


const ConnectRedis = async (): Promise<void> => {
    try {
        await instance.connect();
        console.log('Redis connected');
    } catch (error) {
        console.error('Error connecting to the redis:', error);
    }
}



ConnectRedis();



export default instance
