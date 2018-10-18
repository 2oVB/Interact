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

let api;
let api2 = getCookie('api');

window.onload = function() {
  if(!api2 || api2 == 'false') {
    document.getElementById('api').checked = false;
  } else if(api2 == 'true') {
    document.getElementById('api').checked = true;
  }
}

document.getElementById('back').onclick = function() {
  window.location.replace('http://interactnew.herokuapp.com');
}

document.getElementById('api').onchange = function() {
  document.cookie = "api=" + document.getElementById('api').checked + "; expires=Thu, 18 Dec 2100 12:00:00 UTC; path=/";
  api = getCookie('api');
  console.log(document.getElementById('api').checked);
  
}

