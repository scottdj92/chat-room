import express from "express";
import signale from "signale";
import socketIO from "socket.io";
import http from "http";

const app = express();
// set up an http server that has express as its request handler
const httpServer = http.createServer(app);

// attach socketIO to httpServer
const io = socketIO(httpServer);

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/index.html");
});

io.on("connection", (socket) => {
    signale.log("a client connected");
    socket.on("chat message", (msg) => {
        io.emit("chat message", msg);
    });
    socket.on("disconnect", () => {
        signale.log("a client disconnected");
    });
});

httpServer.listen(3000, () => signale.log("server started at port: 3000"));
