var me;
  // This is called with the results from from FB.getLoginStatus().
  function statusChangeCallback(response) {
    console.log('statusChangeCallback');
    console.log(response);
    // The response object is returned with a status field that lets the
    // app know the current login status of the person.
    // Full docs on the response object can be found in the documentation
    // for FB.getLoginStatus().
    if (response.status === 'connected') {
      // Logged into your app and Facebook.
      FB.api('/me', function(response) {
      // console.log('Successful login for: ' + response.name);
            me = response;
            $(".login-name").text(response.name);
      });
      $(".fb-login-button").addClass("hidden");
    } else if (response.status === 'not_authorized') {
      // The person is logged into Facebook, but not your app.
      document.getElementById('status').innerHTML = 'Please log ' +
        'into this app.';
    } else {
      // The person is not logged into Facebook, so we're not sure if
      // they are logged into this app or not.
      document.getElementById('status').innerHTML = 'Please log ' +
        'into Facebook.';
    }
  }

  // This function is called when someone finishes with the Login
  // Button.  See the onlogin handler attached to it in the sample
  // code below.
  function checkLoginState() {
    FB.getLoginStatus(function(response) {
      statusChangeCallback(response);
    });
  }

//TODO pass in deal,  name, id

  function buy(){
    console.log('buy');
    if(me || window.location.hostname==="localhost"){
      $.ajax({
        method:'POST',
        url: "/deal/1/buy/",
        data:{
          userId:me,
          userName:'def'
        }
      }).done(function(res) {
        console.log(res);
      $("#buy").addClass("hidden");
      $("#bought").removeClass("hidden");

      });



    }else{
      alert('Login first!');  
    }


  }

  $("#buy").click(buy);
