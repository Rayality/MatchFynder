import { React, useEffect, useState } from 'react';
import '../../App.css';
// import { BadgeCard } from "../MatchMadeComponents/BadgeCard";
import { medal, page, map } from "../MatchMadeComponents/MatchMadadeImgs";
import { PlaceInfo, Directions, MySlider, Location } from "../MatchMadeComponents/componentList"
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import "../MatchMadeComponents/match-pics.css";
import "../MatchMadeComponents/match-made-buttons.css";
import "../MatchMadeComponents/badge-card.css";
import { useLazyPlaceDetailsQuery } from '../../Redux/searchApi';


function MatchMade(props) {
    const [getPlaceDetails] = useLazyPlaceDetailsQuery();
    const place_id = props.place_id
    const [googlePictures, setGooglePictures] = useState([]);
    const [googleDetails, setGoogleDetails] = useState({});
    const [showMap, setShowMap] = useState(false)
    const [show, setShow] = useState(false);
    const [userLocation, setUserLocation] = useState({'lat':NaN, 'lng':NaN, 'access':'NA'})

    useEffect(() => {
        async function getPictures() {
            try{
                const option_details = await getPlaceDetails(place_id).unwrap();
                setGoogleDetails(option_details);
                setGooglePictures(option_details.photos);
                await window.google.maps.importLibrary("routes")
            }
            catch (error) {
                console.error("Could not get place details");
            }
        }
        getPictures();
    }, [getPlaceDetails, place_id])

    async function directionsButtonClick() {
        await Location(setUserLocation);
        toggleMap();
    }

    function toggleMap() {
        setShow(false)
        setShowMap(!showMap)
    }

    function toggle() {
        setShowMap(false)
        setShow(!show);
    }

    return (
        <div>
            <div className="match-view-container match-made-jumbotron">
                <div className="button-container">
                    <button className="badges-button">
                        <div className="badges-button-div" onClick={toggle}>
                            <h4>Extra Info</h4>
                            <img alt="Details" src={page} />
                        </div>
                    </button>
                    <button className="badges-button" onClick={directionsButtonClick}>
                        <div className="badges-button-div">
                            <h4>Directions</h4>
                            <img alt="Directions" src={map} />
                        </div>
                    </button>
                    <button className="badges-button">
                        <div className="badges-button-div">
                            <h4>Badges</h4>
                            <img alt="Badges" src={medal} />
                        </div>
                    </button>
                </div>
                <div className="matched-container">
                    {show ? <PlaceInfo google={googleDetails} show={toggle} /> : null}
                    {showMap ? <Directions show={toggleMap} user={userLocation} place={googleDetails} />: null}
                    <h4 className='fynder-dark-text'>
                        You're going to . . .
                    </h4>
                    <h1 className='fynder-dark-text'>{googleDetails["name"]}</h1>
                    <div className='match-info-container'>
                        <h4 className='fynder-dark-text' aria-describedby="tooltip"
                            title={googleDetails["user_ratings_total"]}>
                            Rating: {googleDetails["rating"]} out of 5
                        </h4>
                        <h4 className='fynder-dark-text'>
                            Price: {googleDetails["price_level"]} out of 5
                        </h4>
                    </div>
                    <div className="pictures-bg">
                        <MySlider pictures={googlePictures} />
                    </div>
                    <div className='match-info-container'>
                    </div>
                </div>
            </div >
            <div className="container">
                <h2 className="fynder-slate-text">how it works</h2>
                <div className="row bs-wizard">
                    <div className="col bs-wizard-step complete">
                        <div className="text-center bs-wizard-stepnum">enter location</div>
                        <div className="progress">
                            <div className="progress-bar"></div>
                        </div>
                        <button
                            className="bs-wizard-dot border-0"
                            aria-describedby="tooltip"
                            title="enter a zipcode or city, state"
                        ></button>
                    </div>

                    <div className="col bs-wizard-step complete">
                        <div className="text-center bs-wizard-stepnum">invite others</div>
                        <div className="progress">
                            <div className="progress-bar"></div>
                        </div>
                        <button
                            className="bs-wizard-dot border-0"
                            aria-describedby="tooltip"
                            title="invite your family or friends to participate"
                        ></button>
                    </div>

                    <div className="col bs-wizard-step complete">
                        <div className="text-center bs-wizard-stepnum">approve/veto</div>
                        <div className="progress">
                            <div className="progress-bar"></div>
                        </div>
                        <button
                            className="bs-wizard-dot border-0"
                            aria-describedby="tooltip"
                            title="everyone gets a chance to approve/veto restaurant options"
                        ></button>
                    </div>

                    <div className="col bs-wizard-step active">
                        <div className="text-center bs-wizard-stepnum">match</div>
                        <div className="progress">
                            <div className="progress-bar"></div>
                        </div>
                        <button
                            className="bs-wizard-dot border-0"
                            aria-describedby="tooltip"
                            title="get your match, along with fun/snarky participation badges"
                        ></button>
                    </div>
                </div>
            </div>
        </div>
    );
};
export default MatchMade



//     const [isLoading, setLoading] = useState(false);
//     const [lat, setLat] = useState("");
//     const [long, setLong] = useState("");
//     const [locationAccess, setLocationAccess] = useState(false);
//     const locationAcquired = (position) => {
//         setLat(position.coords.latitude);
//         setLong(position.coords.longitude);
//         setLocationAccess(true);
//     };
//     const handleClick = async () => {
//         setLoading(true);
//         navigator.geolocation.getCurrentPosition(locationAcquired);
//     };
