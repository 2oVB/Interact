//coded by vilhelm backander 
//open source provided by vilhelm backander
$(function () {
  let FADE_TIME = 150; // ms
  let TYPING_TIMER_LENGTH = 400; // ms

  //function to get cookie
  function getCookie(cname) {
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for(var i = 0; i <ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
  }

  
  

  //username colors
  let COLORS = [
    '#91580f', '#f8a700', '#f78b00', 'A458EC',
    '#58dc00', '#287b00', '#a8f07a', 'A8BFB9',
    '#3b88eb', '#3824aa', '#a700ff', '#d300e7',
    'C68AFF', 'DB1DB8', '855151', '07D8ED', '86A9AD'
  ];

  // elements
  let $window = $(window);
  let $usernameInput = $('.usernameInput'); // Input for username let $usernameInput = $('.usernameInput'); // Input for username
  let $messages = $('.messages'); // Messages area
  let $inputMessage = $('.inputMessage'); // Input message input box

  let $passInput = $('.passinput'); // Password input

  let $loginPage = $('.login.page'); // The login page
  let $chatPage = $('.chat.page'); // The chatroom page
  let socket = io();

  let username;
  let message = '';
  let password;
  let profileIcon;

  let mod = false;
  let owner = false;
  let youtuber = false;

  let connected = false;
  let typing = false;
  let lastTypingTime;

  let ifBrackets;

  let bool1 = true;
  let bool2 = true;
  let bool3 = true;
  let bool4 = true;
  let bool5 = true;
  let bool6 = true;
  let bool7 = true;
  let bool8 = true;

  //get api(Admin password input visibility) cookie
  let api = getCookie('api')

  window.onload = function () {

    if(profileIcon) {
      document.getElementById('profile-icon').src = profileIcon;
      localStorage.profileIcon = document.getElementById('profile-icon').src;
    } else if(localStorage.profileIcon) {
      profileIcon = localStorage.profileIcon;
      document.getElementById('profile-icon').src = localStorage.profileIcon;
      localStorage.profileIcon = document.getElementById('profile-icon').src;
    } else {  
      document.getElementById('profile-icon').src = 'IMG/placeholder.png';
      localStorage.profileIcon = document.getElementById('profile-icon').src;
    }
  

    if(!api || api == 'false') {
      document.getElementById('password').style.display = 'none';
      document.getElementById('passtitle').style.display = 'none';
    } else if(api == 'true') {
      console.log("test")
    }
    
    //alert welcome messag
    this.setTimeout(function () {
      if (bool1 == true) {
        // alert('Hello and welcome to interact, if u want to see some off my other stuff go to vbcoding.tk. happy chatting!')
        bool1 = false;
      }
    }, 500);

    const check = () => {

      let includes = message.includes('fuck');
      let includes2 = message.includes('Fuck');
      let includes3 = message.includes('kuk');
      let includes4 = message.includes('Kuk');
      let includes5 = message.includes('din mamma');
      let includes6 = message.includes('Din mamma');
      let includes7 = message.includes('nigger');
      let includes8 = message.includes('Nigger');
      let includes9 = message.includes('retarded');
      let includes10 = message.includes('Retarded');

      //sets the password
      password = cleanInput($passInput.val().trim());

      //if the message is not allowed kick the user
      if (bool2 == true) {
        if (includes == true || includes2 == true || includes3 == true || includes4 == true || includes5 == true || includes6 == true || includes7 == true || includes8 == true || includes9 == true || includes10 == true) {

          //ban the player if the message is not allowed
          this.alert("You have been kicked");

          message = +username + " has been kicked out off the server";

          addChatMessage({
            username: "that ban guy",
            message: username + " has been banned from the server"
          });


          //sets the banned state to true and the username to nothing
          this.localStorage.username = "";
          // this.window.location.reload();
          document.write("You have been kicked out off the interact server. reason:bad language. message:" + lastmsg);
          console.log("you have been banned from the server!")
          socket.emit('new message', message);

          setTimeout(() => {
            window.location = "https://google.com";
          }, 1000);
          bool2 = false;
        }
      }

      //commands

      if (bool7 == true) {
        if (message == '!hello') {
          addChatMessage({
            username: "Hello world",
            message: "Hello world"
          });

          message = "Hello world";
          username = "Hello world";

          socket.emit('hello', username, lastusername);
          socket.emit('new message', message);

          bool7 = false;
        }
      }

      if (bool4 == true) {
        if (message == "!info") {
          addChatMessage({
            username: "[INFO]",
            message: "test",
            message: "(info) - interactonline.tk is a interactive chat website where you can chat with your friends and get friends from all over the world"
          })

 
          addChatMessage({
            username: "[INFO]",
            message: "twitter:https://twitter.com/interactonline_"
          })
          bool4 = false;
        }
      }

      if (bool5 == true) {
        if (message == "!commands") {
          addChatMessage({
            username: "[COMMANDS]",
            message: "1: !commands - commands for interactonline.tk"
          })
          addChatMessage({
            username: "[COMMANDS]",
            message: "2: !info - info about the server"
          })
          bool5 = false;
        }
      }

      // if (bool6 == true) {
      //   if (message.includes('!img') == true) {
      //     let url = subStrAfterChars(message, ' ', 'b')

      //     // canAppend = true;

      //     let messages = document.getElementById('messages');
      //     let imgElement = document.createElement('img');
      //     imgElement.className = "img";
      //     imgElement.id = 'img'
      //     imgElement.src = url;

      //     if(canAppend == true) {
      //     messages.append(imgElement);
      //     canAppend = false;
      //     }

      //     fuck();
      //     bool6 = false;
      //   }
      // }


      //if u are already logged in fade the chat page in automaticly
      if (bool3 == true) {
        if (localStorage.username) {
          document.title = 'interactonline | Chat'
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
  

  let input = document.getElementById('profile_pic');
  let curFiles;
  let file;

  input.addEventListener('change', updateImageDisplay);

  function updateImageDisplay() {
    // console.log("Test");

    curFiles = input.files[0];
    profileIcon = window.URL.createObjectURL(curFiles);
 


    if(profileIcon) {
      document.getElementById('profile-icon').src = profileIcon;
      localStorage.profileIcon = document.getElementById('profile-icon').src;
    } else if(localStorage.profileIcon) {
      profileIcon = localStorage.profileIcon;
      document.getElementById('profile-icon').src = localStorage.profileIcon;
      localStorage.profileIcon = document.getElementById('profile-icon').src;
    } else {  
      document.getElementById('profile-icon').src = 'IMG/placeholder.png';
      localStorage.profileIcon = document.getElementById('profile-icon').src;
    }
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

  //set the username
  const setUsername = () => {

    if(profileIcon) {
      document.getElementById('profile-icon').src = profileIcon;
      localStorage.profileIcon = document.getElementById('profile-icon').src;
    } else if(localStorage.profileIcon) {
      profileIcon = localStorage.profileIcon;
      document.getElementById('profile-icon').src = localStorage.profileIcon;
      localStorage.profileIcon = document.getElementById('profile-icon').src;
    } else {  
      document.getElementById('profile-icon').src = 'IMG/placeholder.png';
      localStorage.profileIcon = document.getElementById('profile-icon').src;
    }
  

    //sets the varible username
    username = cleanInput($usernameInput.val().trim());

    ifBrackets = username.includes('[');

    //if the password is 'Vabc506' add mod
    if (username) {
      if (password == 'Vabc506') {
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

        //ranks

        //owner rank
      } else if (password == 'Oobc83') {
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
        //featured rank
      } else if (password == 'fas834') {

        //fade the chat page in
        $loginPage.fadeOut();
        $chatPage.show();
        $loginPage.off('click');
        $currentInput = $inputMessage.focus();

        // Tell the server your username
        username = '[FEATURED] ' + username;
        socket.emit('add user', username);

        localStorage.username = username;
        //if the message includes brackets reload the page
      } else if (ifBrackets == true) {
        window.location.reload();
        
        //vip rank
      } else if (password == '.lzxwi') {
        $loginPage.fadeOut();
        $chatPage.show();
        $loginPage.off('click');
        $currentInput = $inputMessage.focus();

        youtuber = true;

        username = '[YOUTUBER] ' + username;

        localStorage.username = username;
        // Tell the server your username
        socket.emit('add user', username);

        //default rank
      } else {
        $loginPage.fadeOut();
        $chatPage.show();
        $loginPage.off('click');
        $currentInput = $inputMessage.focus();

        localStorage.username = username;
        // Tell the server your username
        socket.emit('add user', username);
      }
    }
    $currentInput = $inputMessage.focus();
  }
  //option variables when sending a message
  let cansend = true;
  let lastmsg = 'the sky is blue';
  //send a chat message
  const sendMessage = () => {
    message = $inputMessage.val();

    // Prevent markup from being injected into the message
    message = cleanInput(message);
    // if (message.length >= 100) {
    //   log("You cant send a message longer than 100 letters!");
    // } else {
    //if the client is connected
    if (message && connected) {


      //if the messgae is not the same as the newest message
      if (lastmsg && lastmsg !== message) {
        //if the delay of 3 seconds has run out
        if (cansend == true) {
          if (!username) {
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
          } else {
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
        } else if (lastmsg == message) {
          cansend = false;
        } else {
          //if the timer of 3 seconds havent ran out log that you have to wait 3 seconds
          log("Wait 3 seconds before sending!")
        }
      }
    }
    // } 

    //set cansend == true

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

  //add a chat message
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

    let $imgClass = $('<img src="' +   localStorage.profileIcon + '" style="margin-right:10px; float:left; width:50px; height:50px"/>')
    let $messageBodyDiv = $('<span   class="messageBody">')
      .text(data.message);

    let typingClass = data.typing ? 'typing' : '';
    let $messageDiv = $('<li class="message"/>')
      .data('username', data.username)
      .addClass(typingClass)
      .append($usernameDiv, $messageBodyDiv);

      addMessageElement($imgClass);

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
    if (username.includes('[OWNER') == true) {
      return '#D82600';
    } else if (username.includes('[MOD') == true) {
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
        document.title = 'interactonline | Chat'
        setUsername();
      }
    }
  });

  $inputMessage.on('input', () => {
    updateTyping();
  });

  document.getElementById('join').onclick = function() {
    document.title = 'interactonline | Chat'
    setUsername();
  }



  // Click events

  document.getElementById('logout').onclick = function () {
    localStorage.username = "";
    localStorage.profileIcon = '';
    document.getElementById('chatpage').style.display = 'none';
    document.getElementById('loginpage').style.display = 'inline';
    username = cleanInput($usernameInput.val().trim()); 
  }

  document.getElementById('settings').onclick = function() {
    document.location.replace('http://interactnew.herokuapp.com/settings/');
  }

  document.getElementById('Commands').onclick = function () {
    addChatMessage({
      username: "[COMMANDS]",
      message: "1: !commands - commands for interactonline.tk"
    });
    addChatMessage({
      username: "[COMMANDS]",
      message: "2: !info - info about the server"
    });
  }

  document.getElementById('Clear').onclick = function () {
    window.location.reload();
  } 

  // document.getElementById('updates').onclick = function () {
  //   window.location.replace('/updates');
  // }

  // document.getElementById('about-me').onclick = function () {
  //   window.location.replace('/About-me');
  // }

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