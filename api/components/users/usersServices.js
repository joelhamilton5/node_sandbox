let DB = require('../../db/db.js');
const redis = require('async-redis').createClient({
    host: process.env.APP_REDIS_HOST,
    port: process.env.APP_REDIS_PORT
});

module.exports = class UsersServices {
    static async getUsers() {
        let db = DB.getDb();
        let cursor = db.collection('users').find({});
        let users = [];

        while (await cursor.hasNext()) {
            let user = await cursor.next();
            user.redisCached = await redis.exists(user._id.toString());
            users.push(user);
        }

        return users;
    }

    static async getUser(id) {
        let timer = UsersServices.getNow();

        let user = await redis.hgetall(id);
        if (user) {
            user.src = "redis";
            user.respTime = UsersServices.getNow() - timer;
        } else {
            let db = DB.getDb();
            let ObjectID = require('mongodb').ObjectID;
            timer = UsersServices.getNow();
            user = await db.collection('users').findOne({_id: new ObjectID(id)});
            user.src = "database";
            user.respTime = UsersServices.getNow() - timer;
            await redis.hmset(id, user);
        }

        return user;
    }

    static async clearCachedUsers(userId) {
        if(userId) {
            return await redis.del(userId) === 1;
        } else {
            return await redis.flushall() === 'OK';
        }
    }

    static getNow() {
        const hrTime = process.hrtime();
        return hrTime[0] * 1000 + hrTime[1] / 1000000;
    }
};