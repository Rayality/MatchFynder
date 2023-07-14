import { useEffect, useState } from 'react';
import { Container, Card, Spinner, Button,} from '../bootstrapComponents/ReactBootstrap';
import '../../App.css'
import React from 'react'

const pic_placeholder = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRLu51OIx2W50pP6O5cENmiUc2CM1dHxdTKkQ&usqp=CAU"


function MatchMade() {
    const [isLoading, setLoading] = useState(false);
    const [lat, setLat] = useState("");
    const [long, setLong] = useState("");
    const [locationAccess, setLocationAccess] = useState(false);
    const locationAcquired = (position) => {
        setLat(position.coords.latitude);
        setLong(position.coords.longitude);
        setLocationAccess(true);
    };
    const handleClick = async () => {
        setLoading(true);
        navigator.geolocation.getCurrentPosition(locationAcquired);
    };
    return (
    <div className=''>
        <div className='Radialprpblue'/>
        <div>
            <Container className="d-flex align-content-center justify-content-center">
                <div className='p-4 m-5 bg-dark bg-gradient rounded-5' style={{"--bs-bg-opacity": ".5"}}>
                    <h4 className='card-title text-center pb-3 text-white'>Card Title</h4>
                    <img className='card-img-top rounded-4 px-2' src={pic_placeholder} />
                    <div className='card-body'>
                        <p className='card-text text-white'>
                            Some quick example text to build on the card title and make up the
                            bulk of the card's content.
                        </p>
                        <div className="d-flex align-content-center justify-content-center">
                            <button id="directions" className="btn btn-primary" disabled={isLoading} onClick={!isLoading ? handleClick : null}>
                                {isLoading ?  'Getting Route…': 'Click for Directions'}
                            </button>
                        </div>
                    </div>
                </div>
            </Container>
        </div>
    </div>
    );
}
export default MatchMade;
