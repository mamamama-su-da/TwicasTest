var socket = io();

socket.on('warota', function(obj) {
  // ここでwarotaをもとになんかする
  if (userId !== obj.userId) {
    return;
  }

  // でれーん
});

var $out = $('#jsi-out'),
  $dedeeen = $('#jsi-dedeeen'),
  $name = $('#jsi-out').text(),
  synthesName = new SpeechSynthesisUtterance('たかた'),
  synthesOut = new SpeechSynthesisUtterance('アウトー');
synthesName.lang = "ja-JP";
synthesOut.lang = "ja-JP"

function startOut() {
  $dedeeen[0].play()
  setTimeout(function(){
    speechSynthesis.speak(synthesName);
    $out.delay(1000).animate({left: '0'}, 300);
    speechSynthesis.speak(synthesOut);
  }, 2200);

  setTimeout(function(){
    $out.animate({left: '-320px'}, 300);
  }, 5200);
}

startOut();
