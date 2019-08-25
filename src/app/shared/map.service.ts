import { } from '@types/googlemaps';

export class MapService {
  _savedMarkers = [];
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

  saveMarkers = (markers) => {
    this._savedMarkers = markers;
  }

  getPlacesList = () => {
    return this._places;
  }
}