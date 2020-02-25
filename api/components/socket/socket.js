
function makeSocket(server) {
    var io = require('socket.io')(server);

    io.on('connection', function (socket) {
        console.log('user connected');
        let message = '';
        socket.on('message', function (data) {
            message = data.message;
            io.emit('message', data);
        });

        socket.on('mousemove', e => {
            io.emit('mousemove', e);
        });

        socket.on('clear', function () {
            message = '';
            io.emit('message');
        });

        socket.on('leave', function (username) {
            io.emit('leave', username);
        });
    });

    return io;
}

module.exports = makeSocket;