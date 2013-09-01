var floorCanvas = document.getElementById('floor');

function get2DContext(canvas) {
  return canvas.getContext('2d');
}

function getElementPosition(element) {
  var offset = $(element).offset();
  return { x: offset.left, y: offset.top };
}

function getEventPosition(event) {
  return { x: event.pageX, y: event.pageY };
}

function getRelativePosition(origin, absolute) {
  return { x: absolute.x - origin.x, y: absolute.y - origin.y };
}

function getPixelColor(context, position) {
  var imageData = context.getImageData(position.x, position.y, 1, 1).data;
  return { r: imageData[0], g: imageData[1], b: imageData[2] };
}

function getColorName(color) {
  var threshold = 192;

  if (color.r > threshold && color.g > threshold && color.b > threshold) {
    return 'white';
  } else if (color.r > threshold && color.g > threshold) {
    return 'yellow';
  } else if (color.r > threshold) {
    return 'red';
  } else if (color.g > threshold) {
    return 'green';
  } else if (color.b > threshold) {
    return 'blue';
  } else {
    return 'black';
  }
}

function loadImage_(context, imageName, callback) {
  var image = new Image();
  image.src = imageName;
  image.onload = function () {
    context.drawImage(image, 0, 0);
    callback();
  }
}

function addMouseMoveCallback_(element, callback) {
  $(element).mousemove(callback);
}

function logColorAtEvent_(event) {
  console.log(getColorName(getPixelColor(get2DContext(floorCanvas),
                                         getRelativePosition(getElementPosition(floorCanvas),
                                                             getEventPosition(event) ) )));
}

function printWelcomeMessage_() {
  console.log('Hello robot kata!');
}

loadImage_(get2DContext(floorCanvas), 'roomba-dock.png', printWelcomeMessage_);
addMouseMoveCallback_(floorCanvas, logColorAtEvent_);
