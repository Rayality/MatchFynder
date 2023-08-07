import { Component, React } from 'react'
import '../MatchMadeComponents/map-overlay.css'


export default class Directions extends Component {
    constructor(props) {
        super(props);
        let google = window.google
        google.maps.importLibrary("routes")
    }

    componentDidMount() {
        let google = window.google
        this.directionsService = new google.maps.DirectionsService();
        this.directionsRenderer = new google.maps.DirectionsRenderer();
        this.map = new window.google.maps.Map(document.getElementById("map"), {
            zoom: 14,
            center: {
                lat: this.props.place.geometry.location.lat,
                lng: this.props.place.geometry.location.lng
            },
        });
        this.directionsRenderer.setMap(this.map)
    }

    showMap = () => {
        this.props.show()
    }

    componentDidUpdate(prevProps) {
        if (prevProps !== this.props) {
            if ( this.props.user.access === 'OK' ){
            this.directionsService.route({
                origin: {
                    'lat': this.props.user.lat,
                    'lng': this.props.user.lng
                },
                destination: {
                    'lat': this.props.place.geometry.location.lat,
                    'lng': this.props.place.geometry.location.lng
                },
                travelMode: 'DRIVING'
            })
                .then((response) => {
                    this.directionsRenderer.setMap(this.map)
                    this.directionsRenderer.setDirections(response);
                })
            .catch((e) => console.log(e))
        }}
    }

    render() {

        return (
            <div className='map-overlay'>
                <button className='close-map' onClick={this.showMap} >CLOSE</button>
                <div id='map' className='map-screen' ></div>
            </div>
        );
    };
}
