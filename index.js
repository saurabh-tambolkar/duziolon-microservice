let express = require("express");
let app = express();

const cors = require("cors");

app.use(express.json());
let bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const { startConsumer } = require("./lib/kafka/consumer");

const { ConnectDb } = require("./utils/ConnectDb");
// ConnectDb()

let corsArr = [
  "http://localhost:3001",
  "http://localhost:3000",
];

const corsOptions = {
  origin: corsArr, // Replace with your frontend origin
  methods: "GET,POST,PUT,DELETE",
  credentials: true, // Allows cookies to be sent from frontend
};
app.use(cors(corsOptions));

// Socket server creation

const http = require("http");
const socketIO = require("socket.io");
const server = http.createServer(app);

// async function start(){
//     try{
//         await startConsumer();
//     }catch(err){
//         console.error("Error starting consumer:", err);
//     }
// }

// // start();

require("dotenv").config();
let port = process.env.PORT || 5000;

app.get("/", (req, res) => {
  res.send("Welcome to the microservices for Duziolon.");
});

const messageRouter = require("./routes/MessageRoute");
app.use("/api", messageRouter);

const io = socketIO(server, {
  cors: {
    origin: corsArr,
    credentials: true,
  },
});

global.onlineUsers = {};
global.io = io;

io.on("connection", (socket) => {
  console.log("User connected", socket.id);

  socket.on("addUser", (userId) => {
    global.onlineUsers[userId] = socket.id;
    console.log("✅ User added:", userId);
    console.log(
      "🧍 Total Online Users:",
      Object.keys(global.onlineUsers).length,
    );
    console.log("🧍 Online Users:", global.onlineUsers);
  });

  // socket.on("sendMessage",({sender,receiver,message})=>{
  //   const receiverId = global.onlineUsers[receiver]
  //   console.log(`Message from ${sender} to ${receiver}--> ${message}`)
  //   if(receiverId){
  //     global.io.to(receiverId).emit("receiveMessage",{
  //       sender,message
  //     })
  //   }
  //   else{
  //     console.log("receiver not online")
  //   }
  // })

    socket.on("disconnect", () => {
    for (let [uid, sid] of Object.entries(global.onlineUsers)) {
      if (sid === socket.id) {
        delete global.onlineUsers[uid];
        break;
      }
    }
    console.log("🔴 User disconnected:", socket.id);
    console.log(
      "🧍 Total Online Users:",
      Object.keys(global.onlineUsers).length,
    );
  });
});

async function start() {
  try {
    await ConnectDb();

    server.listen(port, "0.0.0.0", () => {
      console.log(`Server is running on port ${port}`);
    });

    startConsumer().catch((err) => {
      console.error("Kafka consumer error:", err);
    });
  } catch (err) {
    console.error("Failed to start server:", err);
    process.exit(1);
  }
}

start();

module.exports = { io };
