
export default async function Location(setUserLocation) {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(good, denied);
    } else {
        await denied();
    }

    async function denied() {
        await setUserLocation({ lat: NaN, lng: NaN, access: 'NA' });
        return
    }

    async function good(position) {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;
        await setUserLocation({ lat: latitude, lng: longitude, access: 'OK' });
        return
    }
}
