var socket = io();
let stop = false;
let isTanaka = false;

$(function() {
  $('#capture-button').click(getSnap);
  $('#stop-auto-button').click(() => {
    stop = true;
  });
  $('#auto-capture-button').click(() => {
    stop = false;
    function send() {
      if (stop) return;

      getSnap();
      setTimeout(send, 1000);
    }
    send();
  });

  $('#tanaka-on').click(() => {
    isTanaka = true;
  });
  $('#tanaka-off').click(() => {
    isTanaka = false;
  });

  var video = $('#video').get(0);
  var canvas = $('#tmp-canvas').get(0);
  var ctx = canvas.getContext('2d');

  function getSnap(){
    ctx.drawImage(video,0,0,854,480);

    const $div = $('<div style="display: inline-block; margin-bottom: 15px; text-align: center; vertical-align: top;">')
    $('#capture').prepend($div);

    const imgSrc = canvas.toDataURL('image/png');
    sendImage(imgSrc).then(smiling => {
      let text = `warota: ${smiling || '0'}`
      let color = smiling > 80 ? 'red' : 'black';
      $div.append(`<div style="color: ${color};">${text}</div>`)
    });

    var img = new Image();
    img.src = imgSrc;
    img.onload = function(){
      img.width = img.width / 4;
      img.height = img.height / 4;
      $div.append(img);
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

  return new Promise((resolve, reject) => {
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
        resolve(smiling);
        console.log(smiling);
        emit(smiling);
        // alert(`笑顔 ${smiling}% !!!`)
      } else {
        resolve(null);
      }
    });
  });
}

function emit(warota) {
  socket.emit('warota', {
    userId,
    warota,
    isTanaka
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
