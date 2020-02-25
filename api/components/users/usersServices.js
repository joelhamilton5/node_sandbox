let DB = require('../../db/db.js');

module.exports = class UsersServices {
    static async getUsers() {
        let db = DB.getDb();
        let cursor = db.collection('users').find({});
        let users = [];

        while (await cursor.hasNext()) {
            users.push(await cursor.next());
        }

        return users;
    }

    static async getUser(id) {
        let db = DB.getDb();
        let ObjectID = require('mongodb').ObjectID;

        return await db.collection('users').findOne({_id: new ObjectID(id)});
    }
};