import "leaflet/dist/leaflet.css";

import L from "leaflet/dist/leaflet";


export default function initMap() {
    const coords = [64.563957, 40.533100];
    const map = L.map('map').setView(coords, 16);
    
    L.tileLayer('https://tilessputnik.ru/{z}/{x}/{y}.png?from_api=v0.3', {
        attributionControl: false,
        attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);
    
    const marker = L.marker(coords, {icon: L.icon({
        iconUrl: require('../../images/marker.svg'),
        iconSize: [32, 48],
        iconAnchor: [16, 48],

    })}).addTo(map);

    marker.bindPopup("КАЛИПСО, Троицкий 157");
}

