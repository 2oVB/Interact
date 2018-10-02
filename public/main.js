$(function() {
  let FADE_TIME = 150; // ms
  let TYPING_TIMER_LENGTH = 400; // ms
  let COLORS = [
    '#e21400', '#91580f', '#f8a700', '#f78b00',
    '#58dc00', '#287b00', '#a8f07a', '#4ae8c4',
    '#3b88eb', '#3824aa', '#a700ff', '#d300e7'
  ];

  function getCookie(name) {
    let v = document.cookie.match('(^|;) ?' + name + '=([^;]*)(;|$)');
    return v ? v[2] : null;
 }

  let image = document.createElement("img");
  image.src = 'favicon.ico';

  // Initialize letiables
  let $window = $(window);
  let $usernameInput = $('.usernameInput'); // Input for username let $usernameInput = $('.usernameInput'); // Input for username
  let $messages = $('.messages'); // Messages area
  let $inputMessage = $('.inputMessage'); // Input message input box

  let $passInput = $('.passinput'); // Password input

  let $loginPage = $('.login.page'); // The login page
  let $chatPage = $('.chat.page'); // The chatroom page

  // Prompt for setting a username
  let username;
  let cookieUsername = getCookie('username');
  let message = '';
  let mod = false;
  let owner = false;
  let connected = false;
  let typing = false;
  let lastTypingTime;

  let socket = io.connect("https://interactnew.herokuapp.com")

  let password;
  let brackets;
   
  //runs when the window loads
  window.onload = function() {
    
    if (Notification.permission !== "granted")
    Notification.requestPermission();
  else {
    let notification = new Notification('Welcome!', {
      icon: 'favicon.ico',
      body: "Hey there! Want to check out some off my other stuff?",
    });

    notification.onclick = function () {
      window.open("https://vbcoding.tk");      
    };

  }

    let bool2 = true;
    let bool3 = true;
    
    //checks the messages every frame
    const check = () => {
      password = cleanInput($passInput.val().trim());

      let fuckH = message.includes('fuck');
      let gayH = message.includes('gay');
      let dmH = message.includes('din mamma');
      let niggerH = message.includes('nigger');
      
      if(bool2 == true) {
        if(fuckH == true || gayH == true || dmH == true || niggerH == true) {

          message = "[" + username + " HAS BEEN BANNED FROM THE SERVER" + "]";
          //username = "[BAN HAMMER]";
          cookieUsername = "[BAN HAMMER]";

          addChatMessage({
            username:"[BAN HAMMER]",
            message: username + " has been banned from the server"
          });

          document.cookie = "username=; expires=Thu, 01 Jan 1200 00:00:00 UTC; path=/;";
          this.window.location.reload();
          console.log("you have been banned from the server!")
          socket.emit('new message', message);
          bool2 = false;
        }
      }

      if(bool3 == true) {
        if(cookieUsername) {
          $loginPage.fadeOut();
          $chatPage.show();
          $loginPage.off('click');
          $currentInput = $inputMessage.focus();

          username = cookieUsername;
            
          // Tell the server your username
          socket.emit('add user', cookieUsername);      
          bool3 = false;   
        }
      }
      }
     
    setInterval(check, 1);
  
    }

  const addParticipantsMessage = (data) => {
    let msgL

    if (data.numUsers === 1) {
      msgL = " You are the only one on the server";
    } else {
      msgL = " There are " + data.numUsers + " participants on the server!";
    }
    log(msgL);
  }

  // Sets the client's username
  const setUsername = () => {
      username = cleanInput($usernameInput.val().trim());

      brackets = username.includes('[');

        // If the password is right add mod
        if(username) {
          if (password == 'Vill123') {
            mod = true;

            $loginPage.fadeOut();
            $chatPage.show();
            $loginPage.off('click');
            $currentInput = $inputMessage.focus();
              
            // Tell the server your username
            username = '[MOD] ' + username;
            socket.emit('add user', username);

            document.cookie = "username" + "=" + username + ";" + "expires=Thu, 18 Dec 2100 12:00:00 UTC;"
        } else if(password == 'OwnerVill123') {
          mod = true;

          $loginPage.fadeOut();
          $chatPage.show();
          $loginPage.off('click');
          $currentInput = $inputMessage.focus();
            
          // Tell the server your username
          username = '[OWNER] ' + username;
          socket.emit('add user', username);

          document.cookie = "username" + "=" + username + ";" + "expires=Thu, 18 Dec 2100 12:00:00 UTC;"    
        } else if(password == 'test') {

        } else if(brackets == true) {
            window.location.reload();
            //else just send the message
        } else {
          $loginPage.fadeOut();
          $chatPage.show();
          $loginPage.off('click');
          $currentInput = $inputMessage.focus();

          //cookie thing test
          document.cookie = "username" + "=" + username + ";" + "expires=Thu, 18 Dec 2100 12:00:00 UTC;"
        // Tell the server your username
        socket.emit('add user', username);   
        }
      }
}
let cansend = true;
let lastmsg = 'the sky is blue';
  // Sends a chat message
  const sendMessage = () => {
    message = $inputMessage.val();

    // Prevent markup from being injected into the message
    message = cleanInput(message);
    if(message.length >= 100) {
      log("You cant send a message longer than 100 letters!");
    } else {
      if (message && connected) {
          if(lastmsg && lastmsg !== message) {
          if(cansend == true) {
            if(!cookieUsername) {
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
              username: cookieUsername,
              message: message
            });
            // tell server to execute 'new message' and send along one parameter
            socket.emit('new message', message);            
          }
  } else if(lastmsg == message) {
        cansend = false;
  } else {
    log("Wait 3 seconds before sending!")
  }
}
    }
  }

function canSendRST() {
  setTimeout(function() {
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
    let $messageBodyDiv = $('<span class="messageBody">')
      .text(data.message);

    let typingClass = data.typing ? 'typing' : '';
    let $messageDiv = $('<li class="message"/>')
      .data('username', data.username)
      .addClass(typingClass)
      .append($usernameDiv, $messageBodyDiv);

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
    // Compute hash code
    let hash = 7;
    for (let i = 0; i < username.length; i++) {
       hash = username.charCodeAt(i) + (hash << 5) - hash;
    }
    // Calculate color
    let index = Math.abs(hash % COLORS.length);
    return COLORS[index];
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
    document.cookie = "username=; expires=Thu, 01 Jan 1200 00:00:00 UTC; path=/;";
    window.location.reload();
  }

  document.getElementById('home').onclick = function() {
    window.location = 'http://vbcoding.tk'
  }

  document.getElementById('updates').onclick = function() {
    window.location = 'updates'
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
    log('attempt to reconnect has failed');
  });

});


