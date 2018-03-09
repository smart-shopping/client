
  const vid = document.getElementById('vid');
  const canvas = document.getElementById('canvas');
  const context = canvas.getContext('2d');
  const captureButton = document.getElementById('capture');

  const constraints = {
    video: true,
  };

  function convertCanvasToImage(cvs) {
  const image = new Image();
	image.src = cvs.toDataURL("image/png");
  const a = cvs.toDataURL("image/png");
  return image;
  }

 function b64toBlob(b64Data, contentType, sliceSize) {
        contentType = contentType || '';
        sliceSize = sliceSize || 512;

        var byteCharacters = atob(b64Data);
        var byteArrays = [];

        for (var offset = 0; offset < byteCharacters.length; offset += sliceSize) {
            var slice = byteCharacters.slice(offset, offset + sliceSize);

            var byteNumbers = new Array(slice.length);
            for (var i = 0; i < slice.length; i++) {
                byteNumbers[i] = slice.charCodeAt(i);
            }

            var byteArray = new Uint8Array(byteNumbers);

            byteArrays.push(byteArray);
        }

      var blob = new Blob(byteArrays, {type: contentType});
      return blob;
  }

  captureButton.addEventListener('click', () => {
    context.drawImage(vid, 0, 0, canvas.width, canvas.height);
    const snapped = (convertCanvasToImage(canvas))

    console.log(snapped);
    // var block = snapped.split(";");
    // // Get the content type of the image
    // var contentType = block[0].split(":")[1];// In this case "image/gif"
    // // get the real base64 content of the file
    // var realData = block[1].split(",")[1];// In this case "R0lGODlhPQBEAPeoAJosM...."
    //
    // // Convert it to a blob to upload
    // var blob = b64toBlob(realData, contentType);

    $.ajax({
      url     : `https://api.imgur.com/3/${snapped}`,
      method  : "post",
      success : function (respond) {
        console.log(respond);
      },
      fail    : function (error) {
        console.log(error);
      }
    })
    // Stop all video streams.
    vid.srcObject.getVideoTracks().forEach(track => track.stop());
  });

  navigator.mediaDevices.getUserMedia(constraints)
    .then((stream) => {
      // Attach the video stream to the video element and autoplay.
      vid.srcObject = stream;
    });
