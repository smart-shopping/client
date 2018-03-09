function processImage() {

  var subscriptionKey = "5a1d4c8879b142a7ae0a6ee38ae21540";
  var uriBase = "https://westcentralus.api.cognitive.microsoft.com/face/v1.0/detect";

  var params = {
    "returnFaceId": "true",
    "returnFaceLandmarks": "false",
    "returnFaceAttributes": "age,gender,headPose,smile,facialHair,glasses,emotion,hair,makeup,occlusion,accessories,blur,exposure,noise",
  };

  // Display the image.
  var sourceImageUrl = document.getElementById("inputImage").value;
  document.querySelector("#sourceImage").src = sourceImageUrl;
  // const sourceImageUrl = image
  // console.log(sourceImageUrl);

  // Perform the REST API call.
  $.ajax({
    url: uriBase + "?" + $.param(params),

    // Request headers.
    beforeSend: function(xhrObj) {
      xhrObj.setRequestHeader("Content-Type", "application/json");
      xhrObj.setRequestHeader("Ocp-Apim-Subscription-Key", subscriptionKey);
    },

    type: "POST",

    // Request body.
    data: '{"url": ' + '"' + sourceImageUrl + '"}',
  })

  .done(function(data) {
    // Show formatted JSON on webpage.
    // const result = $("#responseTextArea").val(JSON.stringify(data, null, 2));
    // const result = document.getElementById("responseTextArea").value()
    const result = data[0]
    console.log(result)
    $.ajax({
      url       : "http://localhost:3000/api/music",
      type      : "post",
      dataType  : "json",
      data      : result,
      success   : (respond) => {
        console.log(respond);
      },
      error     : (err) => {
        console.log(err);
      }
    })
  })

  .fail(function(jqXHR, textStatus, errorThrown) {
    // Display error message.
    var errorString = (errorThrown === "") ? "Error. " : errorThrown + " (" + jqXHR.status + "): ";
    errorString += (jqXHR.responseText === "") ? "" : (jQuery.parseJSON(jqXHR.responseText).message) ?
    jQuery.parseJSON(jqXHR.responseText).message : jQuery.parseJSON(jqXHR.responseText).error.message;
    alert(errorString);
  });
};
