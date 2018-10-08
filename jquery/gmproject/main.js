$(document).ready( function() {
	console.log('Document is loaded.');

	var currentLocation = ""; // This stores the current location for the remove case

	var id = 0;	// Id for each marker

	let startPosition = { lat : -34.397, lng : 150.644 };

	var markers = []; // To store the markers of each location

	var localAddition = true; // This will be false is the location already is stored.

	map = new google.maps.Map(document.getElementById('map'),
				{ center : startPosition , zoom : 8});
				
	var geocoder = new google.maps.Geocoder();

	function creatMark(location) {
		for (var i = 0; i < markers.length; i++) {
			var currentLocation = markers[i].address;
			if (currentLocation.toLowerCase() == location.toLowerCase()) {
				// alert("Atention! This location already exists.");
				localAddition = false;
				alert("Atention! This location already exists.");
				return;
			}
			else
				localAddition = true;
		}
		geocoder.geocode({'address' : location },
			function (results, status) {
							
				if ( status = google.maps.GeocoderStatus.OK) {
					let lat = results[0].geometry.location.lat();
					let lng = results[0].geometry.location.lng();

					var newMarker = new google.maps.Marker({
						position : { lat :  lat, lng : lng},
						map : map,
						title : location,
						// id : id++
					});

					console.log(newMarker);
					map.setCenter({lat : lat, lng : lng});

					map.setZoom(12);

					markers.push({  address : location, marker : newMarker});
					console.log('​creatMark -> markers', markers);

				}
				else
					alert("Invalid location!");
			});
					
	}

	function goToLocation(location) {

		geocoder.geocode({'address' : location },
			function (results, status) {
				if ( status = google.maps.GeocoderStatus.OK) {
					var lat = results[0].geometry.location.lat();
					var lng = results[0].geometry.location.lng();

					map.setCenter({lat : lat, lng : lng});

					map.setZoom(12);

				}
				
			});
					
	}

	$('.zoomIn').click(function () {

		let zoom = map.getZoom();

		if (zoom < 20)
			map.setZoom(++zoom);
	});

	$('.zoomOut').click(function () {
		let zoom = map.getZoom();

		if (zoom > 1)
			map.setZoom(--zoom);
	});

	/* *************** This is only for addition *************** */
	// Get the input field
	var input = document.getElementById("location");

	// Execute a function when the user releases a key on the keyboard
	input.addEventListener("keyup", function(event) {
	// Cancel the default action, if needed
	event.preventDefault();
		// Number 13 is the "Enter" key on the keyboard
		if (event.keyCode === 13) {
			// Trigger the button element with a click
			document.querySelector(".addLocation").click();
		}
	});

	$('.addLocation').click(function () {
		
		var location = $('#location').val();

		creatMark(location);
		if (localAddition)
			$('#locations option:first').before('<option class="current">' + location + '</option>');

	});

	$('.Remove').click(function () {

		var currentLocation = $('select#locations option:checked').val();

		if (currentLocation != "") {
  			console.log('​currentLocation', currentLocation);
			$('select#locations option:checked').remove(); 
			
			for (var i = 0; i < markers.length; i++) {
				var storeLoc = markers[i].address.toLowerCase();
				if (storeLoc === currentLocation.toLowerCase()) {
					var targetMarker = markers[i].marker;
     				console.log('​targetMarker', targetMarker);
					
					targetMarker.setMap(null);
					markers.splice(i, 1);
					return;
				}
			}

		}
			

	});
	$('#locations').click(function () {
		var location = $("select#locations option:checked" ).val();

		goToLocation(location);

		currentLocation = location;

	});
	

});

