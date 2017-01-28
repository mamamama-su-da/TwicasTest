$(function() {
  $('#capture-button').click(getSnap);

  var video = $('#video').get(0);
  var canvas = $('#tmp-canvas').get(0);
  console.log(canvas);
  var ctx = canvas.getContext('2d');

  function getSnap(){
    ctx.drawImage(video,0,0);
    var img = new Image();
    img.src = canvas.toDataURL('image/jpeg');
    img.onload = function(){
      img.width = img.width / 2;
      img.height = img.height / 2;
      console.log(img.width);
      $('#capture').append(img);
    }
  }
});

