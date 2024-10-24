//Importing the express framework
const express=require('express');
//creating the server through express named app
const app=express();

//creating the http server using express server named app
const http=require('http');
const server=http.createServer(app);

//Initialising the socket io
const {Server}=require('socket.io');
const io=new Server(server);

//Body parser
app.use(express.json());

//listening the server at port no 3000
server.listen(3000,()=>{
    console.log("server started at port no 3000");
})

app.use(express.static('public'));
//creating the default route
app.get("/", (req, res) => {
    res.sendFile(__dirname + '/public/index.html'); // Serve index.html file
});
//Importing the handleChatMessage controller
const {handleChatMessage}=require('./controllers/chat')
//listening the io
io.on('connection',(socket)=>{
    console.log("A user connected");

    socket.on('chat message',(message)=>{
        handleChatMessage(socket,message,io);
    })

    socket.on('disconnected',()=>{
        console.log("user disconnected");
    })
})

//Importing the dbConnect function to establish connection with database
const dbConnect=require('./config/database');
dbConnect();

//Importing the routes file
const chatRoutes=require('./routes/chatRoutes');
app.use('/api/v1',chatRoutes);


