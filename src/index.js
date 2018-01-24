import './sass/main.scss';

function deviceOrientation() {
  if (window.DeviceOrientationEvent) {
    document.getElementById("notice").innerHTML = "DeviceOrientationEvent API Supported";
    window.addEventListener('deviceorientation', function(eventData) {
      // gamma: Tilting the device from left to right. Tilting the device to the right will result in a positive value.
      var tiltLR = eventData.gamma;

      // beta: Tilting the device from the front to the back. Tilting the device to the front will result in a positive value.
      var tiltFB = eventData.beta;

      // alpha: The direction the compass of the device aims to in degrees.
      var dir = eventData.alpha

      // Call the function to use the data on the page.
      deviceOrientationHandler(tiltLR, tiltFB, dir);
    }, false);
  } else {
    document.getElementById("notice").innerHTML = "DeviceOrientationEvent API Not Supported"
  };


  function deviceOrientationHandler(tiltLR, tiltFB, dir) {
    document.getElementById("tiltLR").innerHTML = Math.ceil(tiltLR);
    document.getElementById("tiltFB").innerHTML = Math.ceil(tiltFB);
    document.getElementById("direction").innerHTML = Math.ceil(dir);

    // Rotate the disc of the compass.
    var compassDisc = document.getElementById("compassDiscImg");
    compassDisc.style.webkitTransform = "rotate(" + dir + "deg)";
    compassDisc.style.MozTransform = "rotate(" + dir + "deg)";
    compassDisc.style.transform = "rotate(" + dir + "deg)";
  }
}

function deviceMotion() {
  window.addEventListener('devicemotion', function(event) {
    document.getElementById('acceleration-x').innerHTML = Math.round(event.acceleration.x);
    document.getElementById('acceleration-y').innerHTML = Math.round(event.acceleration.y);
    document.getElementById('acceleration-z').innerHTML = Math.round(event.acceleration.z);

    document.getElementById('acceleration-including-gravity-x').innerHTML =
      Math.round(event.accelerationIncludingGravity.x);
    document.getElementById('acceleration-including-gravity-y').innerHTML =
      Math.round(event.accelerationIncludingGravity.y);
    document.getElementById('acceleration-including-gravity-z').innerHTML =
      Math.round(event.accelerationIncludingGravity.z);

    document.getElementById('rotation-rate-beta').innerHTML = Math.round(event.rotationRate.beta);
    document.getElementById('rotation-rate-gamma').innerHTML = Math.round(event.rotationRate.gamma);
    document.getElementById('rotation-rate-alpha').innerHTML = Math.round(event.rotationRate.alpha);

    document.getElementById('interval').innerHTML = event.interval;
  });
}

document.addEventListener("DOMContentLoaded", function(event) {
  deviceOrientation();
  deviceMotion();

});
