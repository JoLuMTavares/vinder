
// Global one for the position setting
// var geocoder = new google.maps.Geocoder();

var map;

var markers = []; // To store the markers of each location

function initMap() {

	

	var geocoder = new google.maps.Geocoder();

	var locations = [];

	$.ajax({

		url      : '/location',
		type     : 'GET',
		dataType : 'JSON',
		success   : function (response) {
			// console.log(`Will not be called.`)
			locations = response.locations;
			console.log("Locations -> "  + locations);

			firstLoc = locations[0];
			console.log('​initMap -> firstLoc', firstLoc);

			console.log(firstLoc.lat);
			console.log(firstLoc.lng);

			let lat = parseFloat(firstLoc.lat);
			console.log('​initMap -> lat', lat);
			let lng = parseFloat(firstLoc.lng);
			console.log('​initMap -> lng', lng);

			map = new google.maps.Map(document.getElementById('map'),
			{
				center : {lat : lat , lng : lng},
				zoom   : 8                            
			});

			var geocoder = new google.maps.Geocoder();

			geocoder.geocode({'address' : firstLoc.title }, 
				function (results, status) {
								
					if ( status = google.maps.GeocoderStatus.OK) {
						var name = firstLoc.title;
						// let lat = results[0].geometry.firstLoc.lat();
						// let lng = results[0].geometry.firstLoc.lng();

						var newMarker = new google.maps.Marker({
							position : { lat :  lat, lng : lng},
							map : map,
							title : name,
							// id : id++
						});

						console.log(newMarker);
						// map.setCenter({lat : lat, lng : lng});

						// map.setZoom(12);
						markers.push({  address : firstLoc.title, marker : newMarker});
      					console.log('​initMap -> markers', markers);
					
					}
				}
			);

			for (var i = 1; i < locations.length; i++) {

				let lat = parseFloat(locations[i].lat);
				let lng = parseFloat(locations[i].lng);

				var theMarker = new google.maps.Marker({
					position : { lat :  lat, lng : lng},
					map : map,
					title : locations[i].title,
					// id : id++
				});

				map = new google.maps.Map(document.getElementById('map'),
				{
					center : {lat : lat , lng : lng},
					zoom   : 8                            
				});

				markers.push({address : locations[i].title, marker: theMarker});
			}
		}
	
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

// Stores a new location on the server
function storeLocation(lat, lng, location) {
	$.ajax({

		url         : 'http://localhost:3000/location/',
		type        : 'POST',
		dataType    : 'JSON',
		data        :  JSON.stringify( 
			{
				lat		: lat,
				lng    	: lng,
				title   : location
			}
		),
		dataType    : 'JSON',
		contentType : 'application/json',
		success   : function (response) {
			if (response.error == 0)
				return cb(null, response.newLocation);
			else
				return cb(xhr.responseText);

		},
		error     : function (xhr, status, error) {
			console.log(`
				error   : ${error},
				status  : ${status},
				xhr     : ${JSON.stringify(xhr)}
			`);
			return cb(xhr.responseText);
		}
	});
	return ("Hallo...something...whatever.");
}


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

	var response; // Response from the server
	
	var geocoder = new google.maps.Geocoder();

	var locationName = $("#location").val();

	if (locationName ==  "")
		alert("Please write a location to add");
	else {
		geocoder.geocode({address : locationName }, 
			function (results, status) {
				if (status === google.maps.GeocoderStatus.OK) {
					let lat = results[0].geometry.location.lat();
					let lng = results[0].geometry.location.lng();

					let newLocation = {
						lat 	: lat,
						lng 	: lng,
						title	: locationName
					}

					// not correct. It's wrong this sintax below
					storeLocation(newLocation.lat, newLocation.lng, newLocation.title) {
						if (err) {
							alert("The location could not be saved!" + err);
							return;
						}
					}
					
					markers.push({  address : location, marker : newLocation});
					// console.log('​creatMark -> markers', markers);

					map.setCenter({lat : lat, lng : lng});

					map.setZoom(12);
				}
			});
	}
					
}


    // let startPosition = { lat : -34.397, lng : 150.644 };
/*
    map = new google.maps.Map(document.getElementById('map'),
    { center : startPosition , zoom : 8});

    var geocoder = new google.maps.Geocoder();
    var location = 'New York, USA';

    geocoder.geocode({'address' : location },
        function (results, status) {
            if ( status = google.maps.GeocoderStatus.OK) {
                let lat = results[0].geometry.location.lat();
                let lng = results[0].geometry.location.lng();

                var newMarker = new google.maps.Marker({
                    position : { lat :  lat, lng : lng},
                    map : map,
                    title : location
                });

                map.setCenter({lat : lat, lng : lng});

            }
        }
	);	
	
	*/

$(document).ready( function() {
	console.log('Document is loaded.');

	initMap();

	// map = new google.maps.Map(document.getElementById('map'),
	// 			{ center : {lat : 0.0, lng : 0.0} , zoom : 8});
	// initMap();
	// var geocoder = new google.maps.Geocoder();
	// The main map initialization
	
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
		// if (localAddition)
			$('#locations option:first').before('<option class="current">' + location + '</option>');

	});
			

});

