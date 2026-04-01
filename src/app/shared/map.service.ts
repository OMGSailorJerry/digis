import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class MapService {
  _savedMarkers: google.maps.Marker[] = [];
  _places = [
    {name: 'Pharmacies', type: 'pharmacy'},
    {name: 'Gas stations', type: 'gas_station'},
    {name: 'Schools', type: 'school'}, 
    {name: 'Restaurants', type: 'restaurant'}
  ];

  constructor() {}

  getMarkers = ():google.maps.Marker[] => {
    return this._savedMarkers;
  }

  saveMarkers = (markers: google.maps.Marker[]) => {
    this._savedMarkers = markers;
  }

  getPlacesList = () => {
    return this._places;
  }
}
