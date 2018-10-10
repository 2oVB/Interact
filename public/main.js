//main function
$(function() {
  let FADE_TIME = 150; // ms
  let TYPING_TIMER_LENGTH = 400; // ms

  //username colors
  let COLORS = [
    '#91580f', '#f8a700', '#f78b00', 'A458EC',
    '#58dc00', '#287b00', '#a8f07a', 'A8BFB9',
    '#3b88eb', '#3824aa', '#a700ff', '#d300e7',
    'C68AFF', 'DB1DB8', '855151', '07D8ED', '86A9AD'
  ];

  // Initialize variables
  let $window = $(window);
  let $usernameInput = $('.usernameInput'); // Input for username let $usernameInput = $('.usernameInput'); // Input for username
  let $messages = $('.messages'); // Messages area
  let $inputMessage = $('.inputMessage'); // Input message input box

  let $passInput = $('.passinput'); // Password input

  let $loginPage = $('.login.page'); // The login page
  let $chatPage = $('.chat.page'); // The chatroom page
  let socket = io();
  
  //messaging variables
  let username;
  let message = '';

  //rank variables
  let mod = false;
  let owner = false;
  let password;

  let connected = false;
  let typing = false;
  let lastTypingTime;

  //includes variables
  let brackets;

  //run 1 time variables
  let bool1 = true;
  let bool2 = true;
  let bool3 = true;
  let bool4 = true;

  //future UI javascript
  // document.getElementById('op').onclick = function() {
  //   window.location = 'http://vbcoding.tk';
  // }
   
  // document.getElementById('ch').onclick = function() {
  //   document.getElementById('landingpage').style.display = 'none';
  //   document.getElementById('loginpage').style.display = 'inline';
  // }

  //when the window loads
  window.onload = function() {

    //disconnect if banned
    // if(localStorage.banned == "true") {
    //   log("You are banned for 1h")
    //   socket.disconnect(true);
    // }

  //alert welcome message if not banned
  this.setTimeout( function() {
    if(bool1 == true) {
      if(!localStorage.banned || localStorage.banned == false) {
        alert('Hello and welcome to interact, if u want to see some off my other stuff go to vbcoding.tk. happy chatting!')
        bool1 = false;
      }// } else {
      //   //else alert that you are banned
      //   alert("You are been banned for 1 hour!")
      // }
    }
  }, 500);

  //after an hour unban banned person
  // setTimeout(() => {
  //    localStorage.banned = "false";
  //    log("you have been unbanned");
     
  //     setTimeout(() =>  {
  //       window.location.reload();
  //     }, 500);
  // }, 3600000);
    
    //runs every frame
    const check = () => {
      
  let includes = message.includes('fuck');
  let includes2 = message.includes('Fuck');
  let includes3 = message.includes('kuk');
  let includes4 = message.includes('Kuk');
  let includes5 = message.includes('din mamma');
  let includes6 = message.includes('Din mamma');
  let includes7 = message.includes('nigger');
  let includes8 = message.includes('Nigger');
      
      //sets the password
      password = cleanInput($passInput.val().trim());

      //checks the message
      if(bool2 == true) {
        if(includes == true || includes2 == true || includes3 == true || includes4 == true || includes5 == true || includes6 == true || includes7 == true || includes8 == true) {

          //ban the player if the message is not allowed
        //  this.alert("You have been banned for 2 hours!");

          message = "[" + username + " HAS BEEN BANNED FROM THE SERVER" + "]";

          addChatMessage({
            username:"[BAN HAMMER]",
            message: username + " has been banned from the server"
          });


          //sets the banned state to true and the username to nothing
          this.localStorage.banned = "true";
          this.localStorage.username = "";
          // this.window.location.reload();
          document.write("You have been kicked out off the interact server. reason:bad language. message:" + lastmsg);
          console.log("you have been banned from the server!")
          socket.emit('new message', message);

          setTimeout(() => {
            window.location = "https://google.com";
          }, 1200);
          bool2 = false;
        }
      }

      if(bool4 == true) {
        if(mod == true) {
            if(message == "!disconnect") {
              log("you are being disconnected");
              socket.disconnect(true);
              bool4 = false;
          }
      } else if(owner == true) {
        if(message == "!disconnect") {
          log("you are being disconnected");
          socket.disconnect(true);
          bool4 = false;
      }
    }
  } 

      //if u are already logged in fade the chat page in automaticly
      if(bool3 == true) {
        if(localStorage.username) {
          $loginPage.fadeOut();
          $chatPage.show();
          $loginPage.off('click');
          $currentInput = $inputMessage.focus();

          username = this.localStorage.username;
            
          // Tell the server your username
          socket.emit('add user', username);      
          bool3 = false;   
        }
      }
      }
     
      //run the check function every frame
    setInterval(check, 1);
  
    }

  //function to log joined message 
  const addParticipantsMessage = (data) => {
    let msgL

    if (data.numUsers === 1) {
      msgL = " You are the only one on the server";
    } else {
      msgL = " There are " + data.numUsers + " participants on the server!";
    }
    log(msgL);
  }
let userid = Math.floor(Math.random() * 10000);

  //set the username
  const setUsername = () => {

    //sets the varible username
      username = cleanInput($usernameInput.val().trim());

      brackets = username.includes('[');

        //if the password is 'Vill123' add mod
        if(username) {
          if (password == 'Vill123') {
            mod = true;
            
            //fade the chat page in
            $loginPage.fadeOut();
            $chatPage.show();
            $loginPage.off('click');
            $currentInput = $inputMessage.focus();
              
            // Tell the server your username
            username = '[MOD] ' + username;
            socket.emit('add user', username);

            localStorage.username = username;
        } else if(password == 'OwnerVill123') {
          //else if the password is 'OwnerVill123' add owner rank
          owner = true;

          //fade the chat page in
          $loginPage.fadeOut();
          $chatPage.show();
          $loginPage.off('click');
          $currentInput = $inputMessage.focus();
            
          // Tell the server your username
          username = '[OWNER] ' + username;
          socket.emit('add user', username);

          localStorage.username = username;
        } else if(password == 'test') {

        } else if(brackets == true) {
          //if the message includes [ do not login the player
            window.location.reload();
            //else just send the message
        } else {
          //else just log in the player normaly

          $loginPage.fadeOut();
          $chatPage.show();
          $loginPage.off('click');
          $currentInput = $inputMessage.focus();

          localStorage.username = username;
        // Tell the server your username
        socket.emit('add user', username);   
        }
      }
}
//option variables when sending a message
let cansend = true;
let lastmsg = 'the sky is blue';
  //send a chat message
  const sendMessage = () => {
    message = $inputMessage.val();

    // Prevent markup from being injected into the message
    message = cleanInput(message);
    if(message.length >= 100) {
      log("You cant send a message longer than 100 letters!");
    } else {
      //if the client is connected
      if (message && connected) {
        //if the messgae is not the same as the newest message
        if(lastmsg && lastmsg !== message) {
          //if the delay of 3 seconds has run out
          if(cansend == true) {
            if(!username) {
              cansend = false;
              canSendRST();
              lastmsg = message;
              $inputMessage.val('');
              addChatMessage({
                username: username,
                message: message
              });
              console.log("test")
              // tell server to execute 'new message' and send along one parameter
              socket.emit('new message', message);      
          }  else {
            cansend = false;
            canSendRST();
            lastmsg = message;
            $inputMessage.val('');
            addChatMessage({
              username: username,
              message: message
            });
            // tell server to execute 'new message' and send along one parameter
            socket.emit('new message', message);            
          }
  } else if(lastmsg == message) {
        cansend = false;
  } else {
    //if the timer of 3 seconds havent ran out log that you have to wait 3 seconds
    log("Wait 3 seconds before sending!")
  }
}
    }
  }

//function to set cansend = true
function canSendRST() {
  setTimeout(() => {
    cansend = true;
  }, 3000);
}
}


  // Log a message
    const log = (message, options) => {
      let $el = $('<li>').addClass('log').attr('id', 'log').text(message);
      addMessageElement($el, options);
  }

  // Adds the visual chat message to the message list
  const addChatMessage = (data, options) => {
    // Don't fade the message in if there is an 'X was typing'
    let $typingMessages = getTypingMessages(data);
    options = options || {};
    if ($typingMessages.length !== 0) {
      options.fade = false;
      $typingMessages.remove();
    }

    let $usernameDiv = $('<span class="username"/>')
      .text(data.username)
      .css('color', getUsernameColor(data.username));

  let $classDiv = $('<span class="class"/>')
    .text(localStorage.class)
    .css('color', "#FFFFF");
    let $messageBodyDiv = $('<span class="messageBody">')
      .text(data.message);

    let typingClass = data.typing ? 'typing' : '';
    let $messageDiv = $('<li class="message"/>')
      .data('username', data.username)
      .addClass(typingClass)
      .append($usernameDiv, $messageBodyDiv);

    addMessageElement($classDiv, options);
    addMessageElement($messageDiv, options);
  }

  // Adds the visual chat typing message
  const addChatTyping = (data) => {
    data.typing = true;
    data.message = 'is typing';
    addChatMessage(data);
  }

  // Removes the visual chat typing message
  const removeChatTyping = (data) => {
    getTypingMessages(data).fadeOut(function () {
      $(this).remove();
    });
  }

  // Adds a message element to the messages and scrolls to the bottom
  // el - The element to add as a message
  // options.fade - If the element should fade-in (default = true)
  // options.prepend - If the element should prepend
  //   all other messages (default = false)
  const addMessageElement = (el, options) => {
    let $el = $(el);

    // Setup default options
    if (!options) {
      options = {};
    }
    if (typeof options.fade === 'undefined') {
      options.fade = true;
    }
    if (typeof options.prepend === 'undefined') {
      options.prepend = false;
    }

    // Apply options
    if (options.fade) {
      $el.hide().fadeIn(FADE_TIME);
    }
    if (options.prepend) {
      $messages.prepend($el);
    } else {
      $messages.append($el);
    }
    $messages[0].scrollTop = $messages[0].scrollHeight;
  }

  // Prevents input from having injected markup
  const cleanInput = (input) => {
    return $('<div/>').text(input).html();
  }

  // Updates the typing event
  const updateTyping = () => {
    if (connected) {
      if (!typing) {
        typing = true;
        socket.emit('typing');
      }
      lastTypingTime = (new Date()).getTime();

      setTimeout(() => {
        let typingTimer = (new Date()).getTime();
        let timeDiff = typingTimer - lastTypingTime;
        if (timeDiff >= TYPING_TIMER_LENGTH && typing) {
          socket.emit('stop typing');
          typing = false;
        }
      }, TYPING_TIMER_LENGTH);
    }
  }

  // Gets the 'X is typing' messages of a user
  const getTypingMessages = (data) => {
    return $('.typing.message').filter(function (i) {
      return $(this).data('username') === data.username;
    });
  }

  // Gets the color of a username through our hash function
  const getUsernameColor = (username) => {
    if(username.includes('[OWNER') == true)  {
      return '#D82600';
    } else  if(username.includes('[MOD') == true) {
      return '#00C8D8'
    } else {
        // Compute hash code
        let hash = 7;
        for (let i = 0; i < username.length; i++) {
          hash = username.charCodeAt(i) + (hash << 5) - hash;
        }
        // Calculate color
        let index = Math.abs(hash % COLORS.length);
        return COLORS[index];
  }
}

  // Keyboard events

  $window.keydown(event => {
    // Auto-focus the current input when a key is typed
    // When the client hits ENTER on their keyboard
    if (event.which === 13) {
      if (username) {
        sendMessage();
        socket.emit('stop typing');
        typing = false;
      } else {
        setUsername();
      }
    }
  });

  $inputMessage.on('input', () => {
    updateTyping();
  });

  

  // Click events

  document.getElementById('logout').onclick = function() {
    localStorage.username = "";
    window.location.reload();
  }

  document.getElementById('home').onclick = function() {
    window.location = 'http://vbcoding.tk';
  }

  document.getElementById('updates').onclick = function() {
    window.location.replace('/updates');
  }

  document.getElementById('about-me').onclick = function() {
    window.location.replace('/About-me');
  }

  // Focus input when clicking on the message input's border
  $inputMessage.click(() => {
    $inputMessage.focus();
  });

  // Socket events

  // Whenever the server emits 'login', log the login message
  socket.on('login', (data) => {
    connected = true;
    // Display the welcome message
    let message = "Welcome to interact! – " + username;
    log(message, {
      prepend: true
    });
    addParticipantsMessage(data);
  });

  // Whenever the server emits 'new message', update the chat body
  socket.on('new message', (data) => {
    addChatMessage(data);
  });

  // Whenever the server emits 'user joined', log it in the chat body
  socket.on('user joined', (data) => {
    log(data.username + ' joined');
    addParticipantsMessage(data);
  });

  // Whenever the server emits 'user left', log it in the chat body
  socket.on('user left', (data) => {
    log(data.username + ' left');
    addParticipantsMessage(data);
    removeChatTyping(data);
  });

  // Whenever the server emits 'typing', show the typing message
  socket.on('typing', (data) => {
    addChatTyping(">" + data);
});

  // Whenever the server emits 'stop typing', kill the typing message
  socket.on('stop typing', (data) => {
    removeChatTyping(data);
  });

  socket.on('disconnect', () => {
    log('you have been disconnected');
  });

  socket.on('reconnect', () => {
    log('you have been reconnected');
    if (username) {
      socket.emit('add user', username);
    }
  });

  socket.on('reconnect_error', () => {
    log('attempt to reconnect has failed, the server might be down try reloading the page');
  });

});


