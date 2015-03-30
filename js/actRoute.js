// act 1 
// zoom to 2 points
// show route
// show pictures

function panZoom_endPoint() {//{{{
	marProp = {
		position: point,
		map: map,
		animation: google.maps.Animation.BOUNCE,
		title: '布加勒斯特'
	};

	zoomTo(act1Zoom, actTimeOut, function() {
		map.panTo(point);
		setTimeout(function() {
			zoomTo(act1ZoomTo, actTimeOut, function() {
				marker = new google.maps.Marker(marProp);
				setTimeout(panZoom_startPoint, actTimeOut);
			});
		}, actTimeOut);
	});
}//}}}

function panZoom_startPoint() {//{{{
	point = new google.maps.LatLng(pStart.lat, pStart.lng);
	marProp = {
		position: point,
		map: map,
		animation: google.maps.Animation.BOUNCE,
		title: '布达佩斯'
	};

	zoomTo(act1Zoom, actTimeOut, function() {
		map.panTo(point);
		setTimeout(function() {
			zoomTo(act1ZoomTo, actTimeOut, function() {
				var marker = new google.maps.Marker(marProp);
				setTimeout(panZoom_route, actTimeOut);
			});
		}, actTimeOut);
	});
}//}}}

function panZoom_route() {//{{{
	var llStart = new google.maps.LatLng(pStart.lat, pStart.lng);
	var llEnd = new google.maps.LatLng(pEnd.lat, pEnd.lng);
	var llRC = new google.maps.LatLng(pRC.lat, pRC.lng);
	zoomTo(13, actTimeOut, function() {
		map.panTo(llRC);
		setTimeout(function() {
			var request = {
				origin: llStart,
			destination: llEnd,
			travelMode: google.maps.DirectionsTravelMode.DRIVING
			};
			var directionsDisplay = new google.maps.DirectionsRenderer({
				suppressMarkers: false,
				suppressInfoWindows: true
			});
			directionsDisplay.setMap(map);
			var directionsService = new google.maps.DirectionsService();
			directionsService.route(request, function(result, status) {
				console.log(result);
				if (status == google.maps.DirectionsStatus.OK) {
					directionsDisplay.setDirections(result);
				}
			});
			setTimeout(function() {
				var between = [
			{
				title: '布达佩斯 → 布加勒斯特',
				content: '824 km.',
				point: llStart
			},
				{
					title: '布加勒斯特 → 布达佩斯',
				content: '11 hours and 10 minute drving.',
				point: llEnd
				},
				{
					title: '变得是距离，不变的是坚持',
				content: '<img src="./images/ticket.jpg" width="200" height="149" alt="ticket" />',
				point: llStart
				}
			];
			loopWin(between, loopTimeOut, showPhotos);
			}, loopTimeOut);
		}, actTimeOut);
	});
}//}}}

function showPhotos() {//{{{
	//map.clearOverlays();
	map.panTo(new google.maps.LatLng(pROMA.lat, pROMA.lng));
	setTimeout(function() {
		zoomTo(act1Zoom, actTimeOut, loopWin(photos, 2500, wannaTo));
	}, actTimeOut);
}//}}}

