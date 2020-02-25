module.exports = function auth() {
    if (true) {
        return Promise.resolve(1);
    } else {
        return Promise.reject('You do not have access to this page');
    }
};
