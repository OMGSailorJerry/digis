import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { } from '@types/googlemaps';
import { MapService } from './../shared/map.service';

@Component({
	selector: 'app-map',
	templateUrl: './map.component.html',
	styleUrls: ['./map.component.less']
})
export class MapComponent implements OnInit, OnDestroy {

	@ViewChild('googleMap') gmapElement: any;
	map: google.maps.Map;
	markers: google.maps.Marker[] = [];
	mapProp: { center: google.maps.LatLng, zoom: number; mapTypeId: any; disableDefaultUI: boolean };
	addMarkerListener: google.maps.MapsEventListener;
	places: { name: string; type: string; }[];

	constructor(private mapService: MapService) { }

	ngOnInit() {
		navigator.geolocation.getCurrentPosition(this.initMap);
		this.places = this.mapService.getPlacesList();
	};

	ngOnDestroy() {
		if (this.addMarkerListener) {
			this.addMarkerListener.remove();
		}
		this.markers = [];
	};

	initMap = (pos) => {
		this.mapProp = {
			center: new google.maps.LatLng(+pos.coords.latitude, +pos.coords.longitude),
			zoom: 16,
			mapTypeId: google.maps.MapTypeId.ROADMAP,
			disableDefaultUI: true
		};
		let marker = new google.maps.Marker({ position: this.mapProp.center });
		let infowindow = new google.maps.InfoWindow({
			content: 'We are here'
		});

		this.map = new google.maps.Map(this.gmapElement.nativeElement, this.mapProp);
		marker.setMap(this.map);
		infowindow.open(this.map, marker);

		this.addMarkerListener = this.map.addListener('click', (event) => {
			this.addMarker(event.latLng);
		});
	};

	addMarker = (location) => {
		var marker = new google.maps.Marker({
			position: location,
			map: this.map
		});

		this.markers.push(marker);
	};

	setMarkers = (map) => {
		this.markers.push(...this.mapService.getMarkers());

		for (var i = 0; i < this.markers.length; i++) {
			this.markers[i].setMap(map);
		}
	};

	hideMarkers = () => {
		this.setMarkers(null);
	};

	showMarkers = () => {
		this.setMarkers(this.map);
	};

	saveMarkers = () => {
		this.mapService.saveMarkers(this.markers);
	};

	callback = (results, status) => {
		if (status === google.maps.places.PlacesServiceStatus.OK) {
			for (var i = 0; i < results.length; i++) {
				this.addMarker(results[i].geometry.location);
			}
		}
	};

	showplaces = (pos, type) => {
		let request = {
			location: { lat: +pos.lat(), lng: +pos.lng() },
			radius: 1500,
			type: type
		}

		let service = new google.maps.places.PlacesService(this.map);

		service.nearbySearch(request, this.callback);
	};

	selectPlace = (place) => {
		this.setMarkers(null);
		this.showplaces(this.mapProp.center, place)
	};

	zoomIn = () => {
		this.map.setZoom(this.map.getZoom() + 1);
	};

	zoomOut = () => {
		this.map.setZoom(this.map.getZoom() - 1);
	};
}
