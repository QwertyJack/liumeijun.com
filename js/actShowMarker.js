// act 3
// show markers "happy birthday"

function showMarkerText() {//{{{
	if (infowindow) {
		infowindow.close();
	}
	map.panTo(new google.maps.LatLng(39.94102, 82.699584));
	setTimeout(function() {
		zoomTo(8, actTimeOut, function() {
			loopAddMarker(markerText, function() {
				setTimeout(function() {
					slideDown('theEnd', actTimeOut, function() {
						var theEndText = '<div id="theEndText">Happy birthday to my dearest Wen Jing :) <br />' + 
						'<button data-toggle="wshare" data-type="weibo">分享到微博</button>' + 
					'<button onclick="window.location.reload();">再看一次</button></div>';
				document.getElementById('theEnd').innerHTML = theEndText;
					});
				}, 5000);
			});
		})
	}, actTimeOut);
}//}}}

function loopAddMarker(markers, callback) {//{{{
	var i           = 0;
	var len         = markers.length;
	var callback    = callback || function() {};
	var loop        = '';
	function loopAddMarkerInner() {
		if( i == len ) {
			clearTimeout(loop);
			callback();
			return false;
		}
		addMarker(markers[i].lng, markers[i].lat);
		i++;
		loop = setTimeout(loopAddMarkerInner, markerTimeOut);
	}
	loopAddMarkerInner();
}//}}}

function addMarker(lng, lat) {//{{{
	marProp = {
		position: new google.maps.LatLng(lat, lng),
		map: map,
		animation: google.maps.Animation.DROP,
		//animation: google.maps.Animation.BOUNCE,
	};
	marker = new google.maps.Marker(marProp);
}//}}}
