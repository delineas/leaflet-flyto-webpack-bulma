// Import Leaflet library
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Import Leaflet Extra Markers
import 'font-awesome/css/font-awesome.min.css';
import 'leaflet-extra-markers/dist/js/leaflet.extra-markers.min.js';
import 'leaflet-extra-markers/dist/css/leaflet.extra-markers.min.css';

// Import Leaflet Omnivore
import omnivore from '@mapbox/leaflet-omnivore/leaflet-omnivore.min.js';

// Import CSS 
import 'bulma/css/bulma.min.css';
import '../css/styles.css';

// Import Static files
import '../static/index.html';

// Import Data
import placesData from '../data/places.csv';

let importAllImages = (r) => (r.keys().map(r))
const images = importAllImages(require.context('../img', false, /\.(png|jpe?g|svg)$/));

/* This code is needed to properly load the images in the Leaflet CSS */
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({ 
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
});

// Define map
const map = L.map('map');
const defaultCenter = [41.65638889,-4.73833333];
const defaultZoom = 12;
// Tilelayer
const basemap =  L.tileLayer('https://{s}.tile.openstreetmap.se/hydda/full/{z}/{x}/{y}.png', {
	maxZoom: 18,
	attribution: 'Tiles courtesy of <a href="http://openstreetmap.se/" target="_blank">OpenStreetMap Sweden</a> &mdash; Map data &copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
});

// Map bootstrapping
map.setView(defaultCenter, defaultZoom);
basemap.addTo(map);


// Create data from csv
let placeMarkers = []
let points = omnivore.csv(placesData)
    .on('ready', function(layer) {
        this.eachLayer(function(marker) {
            // Fit bounds of map with loaded data
            map.fitBounds(points.getBounds())

            // Create properties and push to place data
            let properties = setProperties(marker)
            let id = properties.id
            placeMarkers[id] = properties
            
            // Assign icon marker
            marker.setIcon(placeMarker(id))
            
            // Create place item HTML
            document.getElementById('places').append(html2dom(placeTemplate(properties)))
            
        });
    })
.addTo(map);    

let scrollElement = document.querySelector('.places-container');

// Subscribte to scroll
scrollElement.addEventListener('scroll', function () {
    updatePosition()
});

// On every scroll event, move to marker and set active place
let updatePosition = () =>  {
    let placesIds = Object.keys(placeMarkers)
    for (var i = 0; i < placesIds.length; i++) {
        var placeId = placesIds[i];
        if (isElementOnScreen(`place-${placeId}`,-200)) {
            mapMoveTo(placeMarkers[placeId])
            setActivePlace(placeId);
            break;
        }
    }
}

// Ser properties
let setProperties = (marker) => {
    let properties = marker.toGeoJSON().properties
    properties.lat = marker.getLatLng().lat
    properties.lng = marker.getLatLng().lng
    return properties;
}

// Define place marker
let placeMarker = (id) => (
    L.ExtraMarkers.icon({
        icon: 'fa-number',
        number: id,
        markerColor: 'red',
        shape: 'penta',
        prefix: 'fa'
      })
)

// Define move map animation
let mapMoveTo = (marker) => map.flyTo(marker, 16)


// Set Active place on html
let setActivePlace = (placeId) => {
    let cards = document.getElementsByClassName('card')
    let i = cards.length;
    while(i--) {
        cards[i].classList.remove('has-background-grey-lighter')
    }
    document.getElementById(`place-${placeId}`).getElementsByClassName('card')[0].classList.add('has-background-grey-lighter')
}

// Check if element is on screen
let isElementOnScreen = (selector, offset) => {
    offset = offset || 0
    let element = document.getElementById(selector)
    if(!element) return false
    let top = element.getBoundingClientRect().top

    if(top < 0 + offset) 
        return false
    
        return true
}

// Convert string into html
let html2dom = (html) => {
    let container = document.createElement('div');
    container.innerHTML = html
    return container.firstChild
}

// Place template
let placeTemplate = (place) => ( 
    `<div id='place-${place.id}'>
        <div class="card"> 
            <div class="card-image">
                <figure class="image is-4by3">
                <img src="assets/images/${place.photo}" alt="">
                </figure>
            </div>
            <div class="card-content">
                <div class="media">
                <div class="media-content">
                    <p class="title is-4">${place.id}. ${place.name}</p>
                </div>
                </div>

                <div class="content">
                    ${place.description}
                <br>
                <small><a target="_blank" href="${place.owner}">Origen de la foto</a></small>
                </div>
            </div>
        </div>
    </div>`
);