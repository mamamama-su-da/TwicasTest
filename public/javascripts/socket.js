var socket = io();

socket.on('warota', function(warota) {
  // ここでwarotaをもとになんかする
  console.log(warota);
});
