function sendData () {

  $.ajax({
    url       : "http://localhost:3000/api/music",
    type      : "post",
    dataType  : "json",
    data      : $("#url").val(),
    success   : (respond) => {
      console.log(respond);
    },
    error     : (err) => {
      console.log(err);
    }
  })
}
