
if(localStorage.token){
  $(window).attr('location', 'home.html')
}

window.fbAsyncInit = function() {
  FB.init({
    appId      : '607280472950629',
    cookie     : true,
    xfbml      : true,
    version    : 'v2.12'
  });

  FB.AppEvents.logPageView();

  FB.getLoginStatus(function(response) {
    statusChangeCallback(response);
  });
};



(function(d, s, id) {
  var js, fjs = d.getElementsByTagName(s)[0];
  if (d.getElementById(id)) return;
  js = d.createElement(s); js.id = id;
  js.src = 'https://connect.facebook.net/id_ID/sdk.js#xfbml=1&version=v2.12&appId=592784331071735&autoLogAppEvents=1';
  fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));

 function checkLoginState() {
   FB.getLoginStatus(function(response) {
     statusChangeCallback(response);
   });
 }

 function statusChangeCallback(response){
   console.log(response);
   if(response.status === 'connected'){
     sendTokenToServer(response.authResponse.accessToken);

   }else{
     // localStorage.removeItem("token")
     console.log('not connected');
   }
 }

 function sendTokenToServer(token) {
   console.log(token);
   $.ajax({
     type: 'POST',
     url: 'http://localhost:3000/signinfb/',
     dataType : "json",
     data: {
       data: token
     },
     success: function(resp) {
       console.log(resp);

       $(window).attr('location', 'home.html')
     },
     error: function(error) {
       console.error('Failed send to server');
       console.log(error);
     }
   })
 };

 function logouts(){
   FB.logout(function(response) {
     localStorage.removeItem("token")
     localStorage.removeItem("email")
     localStorage.removeItem("id_fb")
     localStorage.removeItem("user_id")
     localStorage.removeItem("picture")
     statusChangeCallback(response)
   });
 }
