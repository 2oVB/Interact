$(function() {
  let FADE_TIME = 150; // ms
  let TYPING_TIMER_LENGTH = 400; // ms
  let COLORS = [
    '#e21400', '#91580f', '#f8a700', '#f78b00',
    '#58dc00', '#287b00', '#a8f07a', '#4ae8c4',
    '#3b88eb', '#3824aa', '#a700ff', '#d300e7'
  ];

  function getCookie(name) {
    var v = document.cookie.match('(^|;) ?' + name + '=([^;]*)(;|$)');
    return v ? v[2] : null;
 }

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
  let connected = false;
  let typing = false;
  let lastTypingTime;

  var socket = io.connect("http://interactnew.herokuapp.com")

  let password;
  let brackets;

  let logoutButton = document.getElementById('logout');
   
  //runs when the window loads
  window.onload = function() {
    
    if (Notification.permission !== "granted")
    Notification.requestPermission();
  else {
    var notification = new Notification('Welcome!', {
      icon: 'favicon.ico',
      body: "Hey there! Want to check out some off my other stuff?",
    });

    notification.onclick = function () {
      window.open("http://vbcoding.tk");      
    };

  }

    let bool2 = true;
    let bool3 = true;
    
    //checks the messages every frame
    const check = () => {
      password = cleanInput($passInput.val().trim());

      if(bool2 == true) {
          if(message == '!info' || '!INFO') {
            addChatMessage({
              username:'[ALERT]',
              message:'Interact is a project made by Vilhelm Backander, if u want to reach out to me the best way is to email me at Vilhelm.backander@gmail.com or our discord server'
            });
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
      msgL = " there's 1 participant";
    } else {
      msgL = " there are " + data.numUsers + " participants";
    }
    log(msgL);
  }

  // Sets the client's username
  const setUsername = () => {
      username = cleanInput($usernameInput.val().trim());

      brackets = username.includes('[');

      // If the password is right add mod
      if (password == 'Vill123') {
          mod = true;

          $loginPage.fadeOut();
          $chatPage.show();
          $loginPage.off('click');
          $currentInput = $inputMessage.focus();
            
          // Tell the server your username
          username = '[MOD] ' + username;
          socket.emit('add user', username);

          document.cookie = "username" + "=" + username + ";" 
      } else if(password == 'OwnerVill123') {
        mod = true;

        $loginPage.fadeOut();
        $chatPage.show();
        $loginPage.off('click');
        $currentInput = $inputMessage.focus();
          
        // Tell the server your username
        username = '[OWNER] ' + username;
        socket.emit('add user', username);

        document.cookie = "username" + "=" + username + ";"       
      } else if(brackets == true) {
          window.location.reload();
          //else just send the message
      } else {
        $loginPage.fadeOut();
        $chatPage.show();
        $loginPage.off('click');
        $currentInput = $inputMessage.focus();

        //cookie thing test
        document.cookie = "username" + "=" + username + ";" 
      
      // Tell the server your username
      socket.emit('add user', username);   
      }
}

  // Sends a chat message
  const sendMessage = () => {
    message = $inputMessage.val();

    // Prevent markup from being injected into the message
    message = cleanInput(message);

    // if there is a non-empty message and a socket connection
    if (message && connected) {
      if(!cookieUsername) {
        $inputMessage.val('');
        addChatMessage({
          username: username,
          message: message
        });
        console.log("test")
        // tell server to execute 'new message' and send along one parameter
        socket.emit('new message', message);      
    }  else {
      $inputMessage.val('');
      addChatMessage({
        username: cookieUsername,
        message: message
      });
      console.log("test2")
      // tell server to execute 'new message' and send along one parameter
      socket.emit('new message', message);            
    }
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

  //when u click logout
  logoutButton.onclick = function() {
    document.cookie = "username=";
    document.location.reload();
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
    addChatTyping(data);
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


