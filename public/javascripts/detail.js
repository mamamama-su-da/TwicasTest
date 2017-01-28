var socket = io();
let waiting = false;

socket.on('warota', function(obj) {
  // ここでwarotaをもとになんかする
  if (userId !== obj.userId || waiting) {
    return;
  }

  const { warota, isTanaka, batCount, footCount } = obj;
  if (warota >= 80) {
    $('#bat-count').text(batCount);
    $('#foot-count').text(footCount);
    startOut(isTanaka);
  }
});

var $out = $('#jsi-out'),
  $dedeeen = $('#jsi-dedeeen'),
  $name = $('#jsi-out').text(),
  synthesName = new SpeechSynthesisUtterance(userName === '高田' ? 'タカタ' : userName),
  synthesOut = new SpeechSynthesisUtterance('アウトー');
synthesName.lang = "ja-JP";
synthesOut.lang = "ja-JP";

function startOut(isTanaka) {

  waiting = true;

  $out.find('text').text(userName + (isTanaka ? ' タイキック' : ' OUT'));
  const synthesOut = new SpeechSynthesisUtterance(isTanaka ? 'タイキック' : 'アウトー');
  synthesOut.lang = "ja-JP";
  $dedeeen[0].play();
  setTimeout(function(){
    speechSynthesis.speak(synthesName);
    $out.delay(1000).animate({left: '0'}, 300);
    speechSynthesis.speak(synthesOut);
  }, 2200);

  setTimeout(function(){
    $out.animate({left: '-600px'}, 300, 'swing', () => {
      $out.css('left', '600px');
    });
  }, 5200);

  setTimeout(function(){
    waiting = false;
  }, 10000);
}
