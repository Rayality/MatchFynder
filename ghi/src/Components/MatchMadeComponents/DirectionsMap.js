import { Component, useEffect } from 'react'
import '../MatchMadeComponents/map-overlay.css'



export default class Directions extends Component {
    constructor(props) {
        super(props);
        let google = window.google
        google.maps.importLibrary("routes")
        this.state = {
            placeLat: this.props.place.geometry.location.lat,
            placeLng: this.props.place.geometry.location.lng,
            userLat: this.props.user.lat,
            userLng: this.props.user.lng
        }
    }

    componentDidMount() {
        let google = window.google
        this.directionsService = new google.maps.DirectionsService();
        this.directionsRenderer = new google.maps.DirectionsRenderer();
        this.map = new window.google.maps.Map(document.getElementById("map"), {
            zoom: 14,
            center: {
                lat: this.state.placeLat,
                lng: this.state.placeLng
            },
        });
        this.directionsRenderer.setMap(this.map)

    }

    showMap = () => {
        this.props.show()
    }

    componentDidUpdate(prevProps) {
        if (prevProps !== this.props) {
            this.setState({
                placeLat: this.props.place.geometry.location.lat,
                placeLng: this.props.place.geometry.location.lng,
                userLat: this.props.user.lat,
                userLng: this.props.user.lng
            })
            // let google = window.google
            // this.directionsService = new google.maps.DirectionsService();
            // this.directionsRenderer = new google.maps.DirectionsRenderer();
            // this.map = new window.google.maps.Map(document.getElementById("map"), {
            //     zoom: 14,
            //     center: {
            //         lat: this.state.placeLat,
            //         lng: this.state.placeLng
            //     },
            // });
        }
        // if (this.directionsService) {
        //     console.log('trying to set directions')
            this.directionsService.route({
                origin: {
                    'lat': this.state.userLat,
                    'lng': this.state.userLng
                },
                destination: {
                    'lat': this.state.placeLat,
                    'lng': this.state.placeLng
                },
            })
                .then((response) => {
                    this.directionsRenderer.setDirections(response);
                })
                .catch((e) => console.log(e))
        // };
    }

    render() {

        return (
            <div>
                {/* <div className='place-info-bg' onClick={this.showMap}/> */}
                <div id='map' className='map-screen' onClick={this.showMap}></div>
            </div>
        );
    };
}
