let services = require('./usersServices');
let auth = require('../auth/auth');

module.exports = class UsersController {
    static async getUsers(req, res, next) {
        try {
            await auth();
            let users = await services.getUsers();
            res.json({users});
        } catch (e) {
            next(e);
        }
    }

    static async getUser(req, res, next) {
        try {
            await auth();
            let user = await services.getUser(req.params.userid);
            res.json({message: `Loaded from ${user.src} in ${user.respTime}ms`, user});
        } catch (e) {
            next(e);
        }
    }

    static async clearCachedUsers(req, res, next) {
        try {
            await auth();
            let success = await services.clearCachedUsers(req.params.userid);
            res.json({success});
        } catch (e) {
            next(e);
        }
    }
};