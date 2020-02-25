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
            res.json({user});
        } catch (e) {
            next(e);
        }
    }
};