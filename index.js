// Setup basic express server
let express = require('express');
let app = express();
let path = require('path');
let server = require('http').createServer(app);
let io = require('socket.io')(server);
let port = process.env.PORT || 3000;

server.listen(port, () => {
  console.log('Server listening at port %d', port);
});

// Routing
app.use(express.static(path.join(__dirname, 'public')));

// Chatroom

let numUsers = 0;
let client_ip_address;
let usernamee;

io.on('connection', (socket, username) => {
  let addedUser = false;

  client_ip_address = socket.request.connection.remoteAddress;



  // when the client emits 'new message', this listens and executes
  socket.on('new message', (data) => {
    // we tell the client to execute 'new message'
    socket.broadcast.emit('new message', {
      username: socket.username,
      message: data
    });
  });

  // when the client emits 'add user', this listens and executes
  socket.on('add user', (username) => {
    if (addedUser) return;

    numUsers++;
    // we store the username in the socket session for this client
    socket.username = username;
    addedUser = true;
    socket.emit('login', {
      numUsers: numUsers
    });

    usernamee = socket.username;

    // echo globally (all clients) that a person has connected
    socket.broadcast.emit('user joined', {
      username: socket.username,
      numUsers: numUsers
    });

    socket.on('hello', (username, lastmsg) => {
      socket.username = username;
    })
  });

  socket.on('close', () => {
    socket.disconnect();
  });


  // when the client emits 'typing', we broadcast it to others
  socket.on('typing', () => {
    socket.broadcast.emit('typing', {
      username: socket.username
    });
  });

  // when the client emits 'stop typing', we broadcast it to others
  socket.on('stop typing', () => {
    socket.broadcast.emit('stop typing', {
      username: socket.username
    });
  });

  setTimeout(function () {
    if(usernamee) {
     console.log("user " + usernamee + " joined the server from: " + client_ip_address);
    } else {
      console.log("a non-logged in user joined!")
    }
  }, 2000);
  // when the user disconnects.. perform this
  socket.on('disconnect', () => {
    if (addedUser) {
      --numUsers;

      console.log("user " + usernamee + " left the server from " + client_ip_address);

      // echo globally that this client has left
      socket.broadcast.emit('user left', {
        username: socket.username,
        numUsers: numUsers
      });
    }
  });
});