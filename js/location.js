var btaxpLocation = {lat: 35.076654, lng: -81.761685};
var map;
function initMap() {
  var directionsDisplay = new google.maps.DirectionsRenderer;
  var directionsService = new google.maps.DirectionsService;
  var mapDiv = document.getElementById("map");
  map = new google.maps.Map(mapDiv, {
    center: btaxpLocation,
    zoom: 15
  });

  var marker = new google.maps.Marker({
    position: btaxpLocation,
    map: map,
    title: 'Welcome to Bookkeeping and Tax Professionals'
  });

  directionsDisplay.setMap(map);
  directionsDisplay.setPanel(document.getElementById("right-panel"));

  var control = document.getElementById('floating-panel');
  control.style.display = 'block';
  map.controls[google.maps.ControlPosition.TOP_CENTER].push(control);

  var onChangeHandler = function() {
    calculateAndDisplayRoute(directionsService, directionsDisplay);
  };
  document.getElementById('start').addEventListener('change', onChangeHandler);
  //document.getElementById('end').addEventListener('change', onChangeHandler);
}

function calculateAndDisplayRoute(directionsService, directionsDisplay) {
  var start = document.getElementById('start').value;
  if ("initial" == start) {
    directionsDisplay.setMap(null);
    directionsDisplay.setDirections({routes: []});
    return;
  }
  directionsDisplay.setMap(map);
  var end = btaxpLocation;
  directionsService.route({
    origin: start,
    destination: end,
    travelMode: 'DRIVING'
    }, function(response, status) {
    if (status === 'OK') {
      directionsDisplay.setDirections(response);
      } else {
      window.alert('Directions request failed due to ' + status);
    }
  });
}

