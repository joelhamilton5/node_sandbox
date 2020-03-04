// let DB = require('../../db/db.js');
const fs = require('fs');
const path = require('path');
// const redis = require('async-redis').createClient({
//     host: process.env.APP_REDIS_HOST,
//     port: process.env.APP_REDIS_PORT
// });

module.exports = class UsersServices {
    static async getUsers() {
        return UsersServices.getAll();

        let db = DB.getDb();
        let cursor = db.collection('users').find({});
        let users = [];

        while (await cursor.hasNext()) {
            let user = await cursor.next();
            // user.redisCached = await redis.exists(user._id.toString());
            users.push(user);
        }

        return users;
    }

    static async getUser(id) {
        let timer = UsersServices.getNow();

        let user = false;
        // let user = await redis.hgetall(id);
        if (user) {
            user.src = "redis";
            user.respTime = UsersServices.getNow() - timer;
        } else {
            // let db = DB.getDb();
            // let ObjectID = require('mongodb').ObjectID;

            timer = UsersServices.getNow();
            user = UsersServices.getAll().filter(user => user._id === id)[0];

            // user = await db.collection('users').findOne({_id: new ObjectID(id)});
            user.src = "file";
            user.respTime = UsersServices.getNow() - timer;
            // await redis.hmset(id, user);
        }

        return user;
    }

    static async clearCachedUsers(userId) {
        return true;

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

    static getAll() {
        return JSON.parse(fs.readFileSync(path.join(__dirname, "users.json"), 'utf-8'));
    }
};