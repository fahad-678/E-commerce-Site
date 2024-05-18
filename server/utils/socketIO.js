const socketIo = require("socket.io");
const createError = require("http-errors");
require("dotenv").config();

let io;

module.exports = {
    init: (httpServer) => {
        io = socketIo(httpServer, {
            cors: {
                origin: process.env.CLIENT_URL,
                methods: ["GET", "POST"],
                credentials: true,
            },
        });
        return io;
    },
    getIo: () => {
        if (!io) return next(createError.BadRequest());
        return io;
    },
};
