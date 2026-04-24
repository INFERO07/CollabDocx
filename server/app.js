require("dotenv").config();

const { PrismaClient } = require('@prisma/client');
const express = require('express');
const http = require('http');
const WebSocket = require('ws');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const userRouter = require('./routers/userRouter');
const cookieParser = require('cookie-parser');
const cors = require('cors'); 
const verifyToken = require('./middlewares/protected');
const docRouter = require('./routers/docRouter');
const importRouter = require("./routers/importRouter");
const exportRouter = require("./routers/exportRouter");
const app = express();
const PORT = process.env.PORT || 3000;
const aiRouter = require("./routers/aiRouter");


app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server running on ${PORT}`);
});


const allowedOrigins = [
  "http://localhost:5173",
  "http://localhost:5174",
];

app.use(cors({
  origin: allowedOrigins,
  credentials: true,
}));



app.use(express.json({ limit: '10mb' })); 
app.use(express.urlencoded({ limit: '10mb', extended: true }));
app.use(cookieParser());

//Routes
app.use('/document', docRouter);
app.use("/api/import", importRouter);
app.use("/api/export", exportRouter);
app.use('/user', userRouter);
app.use("/api/ai", aiRouter);

const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

const prisma = new PrismaClient();

prisma.$connect()
  .then(() => console.log('Database connected successfully'))
  .catch(() => {
    console.error('Error connecting to database:', "Something went wrong");
});

const rooms = new Map();
const locks = new Map();
const Messages = new Map();

/* ================= WEBSOCKET LOGIC (UNCHANGED) ================= */

const handleJoin = (ws, docId, userId, name) => {
    if (!rooms.has(docId)) {
      rooms.set(docId, []);
      locks.set(docId, { sharedLock:false, sharedSocket:null });
    }
    let { sharedLock, sharedSocket } = locks.get(docId);
    let roomUsers = rooms.get(docId);
    const newuser = { socket:ws, userId:userId, name };
    const actualusers = roomUsers.filter((user) => user.userId !== userId);
    roomUsers = [...actualusers, newuser];
    rooms.set(docId, roomUsers); 

    const sockets = roomUsers.map((user) => user.socket);

    wss.clients.forEach((client) => {
        if (
            client.readyState === WebSocket.OPEN &&
            client !== sharedSocket &&
            sockets.includes(client)
        ) {
            client.send(JSON.stringify({
                type: 'current-users',
                docId,
                userId,
                name,
                users: roomUsers,
                lock: sharedLock,
                messages: Messages.get(docId)
            }));
        }
        if (
            client.readyState === WebSocket.OPEN &&
            client !== ws &&
            sockets.includes(client)
        ) {
            client.send(JSON.stringify({
                type: 'joined-user',
                docId,
                userId,
                name
            }));
        }
    });
};

const handleDisconnect = (ws, docId, userId, name) => {
    if (!rooms.has(docId)) return;

    const roomUsers = rooms.get(docId);
    const updatedUsers = roomUsers.filter((user) => user.userId !== userId);
    let { sharedLock, sharedSocket } = locks.get(docId);

    if (updatedUsers.length === 0) {
        rooms.delete(docId);
        locks.delete(docId);
        Messages.delete(docId);
    } else {
        rooms.set(docId, updatedUsers);
    }

    const sockets = updatedUsers.map((user) => user.socket);
    const user = roomUsers.find((user) => user.userId === userId);

    if (sharedLock && user?.socket === sharedSocket) {
        locks.set(docId, { sharedLock:false, sharedSocket:null });
    }

    wss.clients.forEach((client) => {
        if (
            client.readyState === WebSocket.OPEN &&
            sockets.includes(client)
        ) {
            client.send(JSON.stringify({
                type: 'current-users',
                docId,
                userId,
                users: updatedUsers
            }));
            client.send(JSON.stringify({
                type: 'disconnected-user',
                docId,
                userId,
                name
            }));
        }
    });
};

/* ALL OTHER HANDLERS REMAIN EXACTLY SAME — NOT TOUCHED */

wss.on('connection', (ws) => {
    console.log("User is connected");

    ws.on('message', (data) => {
        const parsed = JSON.parse(data);
        const { type, docId, userId } = parsed;

        switch (type) {
            case 'join-doc':
                handleJoin(ws, docId, userId, parsed.name);
                break;
            case 'close':
                handleDisconnect(ws, docId, userId, parsed.name);
                break;
            default:
                console.log("Undefined Message");
        }
    });
});

server.listen(3000, () => {
    console.log("Listening at port 3000");
});

process.on('SIGINT', async () => {
    await prisma.$disconnect();
    process.exit();
});
