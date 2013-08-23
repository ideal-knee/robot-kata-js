console.log("Hello Robot Kata!");

var floorContext = document.getElementById('floor').getContext('2d');
var floorImage = new Image();
var floorOffset = $('#floor').offset();

floorImage.src = 'roomba-dock.png';
floorImage.onload = function () {
  floorContext.drawImage(floorImage, 0, 0);
};

$('#floor').mousemove(function (e) {
  var x = Math.floor(e.pageX - floorOffset.left);
  var y = Math.floor(e.pageY - floorOffset.top);
  console.log(floorContext.getImageData(x, y, 1, 1).data);
});
