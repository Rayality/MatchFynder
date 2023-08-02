import { Component, useState } from 'react'


export default function Location() {
    let lat;
    let lng;
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(access);
    } else {
        console.log("Unable to get location")
    }

    function access(position) {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;
        lat = latitude;
        lng = longitude;
        console.log(`Latitude: ${latitude}, Longitude: ${longitude}`);
    }

    return { "lat": lat, "lng": lng }
}
