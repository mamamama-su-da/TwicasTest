$(function() {
  $('#capture-button').click(getSnap);

  var video = $('#video').get(0);
  var canvas = $('#tmp-canvas').get(0);
  var ctx = canvas.getContext('2d');

  function getSnap(){
    ctx.drawImage(video,0,0);

    const imgSrc = canvas.toDataURL('image/png');
    sendImage(imgSrc);

    var img = new Image();
    img.src = imgSrc;
    img.onload = function(){
      img.width = img.width / 2;
      img.height = img.height / 2;
      $('#capture').append(img);
    }
  }
});

function sendImage(imgSrc) {

  const apiKey = 'de0ba397a1c26c5e1614255fe0895311';
  const apiSecret = '7iGjcR69HvJv4aFFn835SJKPoxhgcBiE';

  const url = 'https://apius.faceplusplus.com/detection/detect';

  const form = new FormData();
  form.append('img', toBlog(imgSrc.split(',')[1]));
  form.append('api_key', apiKey);
  form.append('api_secret', apiSecret);

  $.ajax({
    url,
    method: 'POST',
    dataType: 'json',
    data: form,
    processData: false,
    contentType: false,
  }).done(data => {
    console.log(data);

    if (data.face && data.face[0]) {
      const smiling = data.face[0].attribute.smiling.value;
      console.log(smiling);
      alert(`笑顔 ${smiling}% !!!`)
    }
  });
}

function toBlog(base64) {
  // base64形式の文字列をデコード
  var data = window.atob(base64);
  var buff = new ArrayBuffer(data.length);
  var arr = new Uint8Array(buff);

  // blobの生成
  for(var i = 0, dataLen = data.length; i < dataLen; i++){
    arr[i] = data.charCodeAt(i);
  }
  return new Blob([arr], {type: 'image/png'});
}
