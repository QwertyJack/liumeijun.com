// act 2
// zoom to place want to go
// show pictures

function wannaTo() {//{{{
	if (infowindow) {
		infowindow.close();
	}
	zoomTo(5, actTimeOut, function() {
		map.panTo(new google.maps.LatLng(pChina.lat, pChina.lng));
		//map.setMapType(google.maps.MapTypeId.HYBRID);
		setTimeout(loopWin(wanna, actTimeOut, showMarkerText), actTimeOut);
	});
}//}}}

