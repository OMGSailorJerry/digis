import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { MapService } from './../shared/map.service';

@Component({
	standalone: false,
	selector: 'app-map',
	templateUrl: './map.component.html',
	styleUrls: ['./map.component.less']
})
export class MapComponent implements OnInit, OnDestroy {
	@ViewChild('googleMap', { static: true }) gmapElement: any;

	map: google.maps.Map | undefined;
	markers: google.maps.Marker[] = [];
	mapProp: { center: google.maps.LatLng, zoom: number; mapTypeId: any; disableDefaultUI: boolean } | undefined;
	addMarkerListener: google.maps.MapsEventListener | undefined;
	places: { name: string; type: string; }[] | undefined;

	constructor(private mapService: MapService) { }

	ngOnInit() {
		if (navigator.geolocation) {
			navigator.geolocation.getCurrentPosition(this.initMap, () => {
				this.initMap({ coords: { latitude: 50.4501, longitude: 30.5234 } } as GeolocationPosition);
			});
		} else {
			this.initMap({ coords: { latitude: 50.4501, longitude: 30.5234 } } as GeolocationPosition);
		}
		this.places = this.mapService.getPlacesList();
	};

	ngOnDestroy() {
		if (this.addMarkerListener) {
			this.addMarkerListener.remove();
		}
		this.markers = [];
	};

	initMap = (pos: GeolocationPosition) => {
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

		this.addMarkerListener = this.map.addListener('click', (event: {latLng: google.maps.LatLng}) => {
			this.addMarker(event.latLng);
		});
	};

	addMarker = (location: google.maps.LatLng) => {
		var marker = new google.maps.Marker({
			position: location,
			map: this.map
		});

		this.markers.push(marker);
	};

	setMarkers = (map: google.maps.Map | undefined) => {
		this.markers.push(...this.mapService.getMarkers());

		for (var i = 0; i < this.markers.length; i++) {
			this.markers[i].setMap(map as google.maps.Map);
		}
	};

	hideMarkers = () => {
		this.setMarkers(undefined);
	};

	showMarkers = () => {
		this.setMarkers(this.map);
	};

	saveMarkers = () => {
		this.mapService.saveMarkers(this.markers);
	};

	callback = (results: google.maps.places.PlaceResult[] | null, status: google.maps.places.PlacesServiceStatus) => {
		if (!results) return;
		if (status === google.maps.places.PlacesServiceStatus.OK) {
			for (var i = 0; i < results.length; i++) {
				if (results && results[i].geometry!.location) {
					this.addMarker(results![i].geometry!.location!);
				}
			}
		}
	};

	showplaces = (pos: google.maps.LatLng, type: string) => {
		if (!this.map) return;
		let request = {
			location: { lat: +pos.lat(), lng: +pos.lng() },
			radius: 1500,
			type: type
		}

		let service = new google.maps.places.PlacesService(this.map);

		service.nearbySearch(request, this.callback);
	};

	selectPlace = (place: string) => {
		this.setMarkers(undefined);
		this.showplaces(this.mapProp!.center, place)
	};

	zoomIn = () => {
		if (!this.map) return;
		this.map?.setZoom(this.map.getZoom()! + 1);
	};

	zoomOut = () => {
		if (!this.map) return;
		this.map.setZoom(this.map.getZoom()! - 1);
	};
}
