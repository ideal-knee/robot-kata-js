loadFloorImage(function () {
  console.log("Hello Robot Kata!");
});

var floor = {
  context: $('#floor')[0].getContext('2d'),
  offset: $('#floor').offset(),
  getPosition: function (e) {
    return {
      x: Math.floor(e.pageX - this.offset.left),
      y: Math.floor(e.pageY - this.offset.top)
    }
  }
}

function loadFloorImage(callback) {
  var image = new Image();
  image.src = 'roomba-dock.png';
  image.onload = function () {
    floor.context.drawImage(this, 0, 0);
    callback();
  }
}

function getColor(pos) {
  var imageData = floor.context.getImageData(pos.x, pos.y, 1, 1).data;
  var r = imageData[0];
  var g = imageData[1];
  var b = imageData[2];
  var threshold = 192;

  if (r > threshold && g > threshold && b > threshold) {
    return 'white';
  } else if (r > threshold && g > threshold) {
    return 'yellow';
  } else if (r > threshold) {
    return 'red';
  } else if (g > threshold) {
    return 'green';
  } else if (b > threshold) {
    return 'blue';
  } else {
    return 'black';
  }
}

$('#floor').mousemove(function (e) {
  console.log(getColor(floor.getPosition(e)));
});
