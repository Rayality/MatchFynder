import { useEffect, useState } from 'react';
import '../../App.css';
import React from "react";
import { BadgeCard } from "../MatchMadeComponents/BadgeCard";
import { medal, contact, page, map } from "../MatchMadeComponents/MatchMadadeImgs";
import MySlider from '../MatchMadeComponents/Slider';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import "../MatchMadeComponents/match-made.css";
import "../MatchMadeComponents/match-made-buttons.css";
import "../MatchMadeComponents/badge-card.css";
import PlaceInfo from '../MatchMadeComponents/PlaceInfo';


function MatchMade(props) {
    const place_id = props.place_id
    const [googlePictures, setGooglePictures] = useState([]);
    const [googleDetails, setGoogleDetails] = useState({});
    const [show, setShow] = useState(false);

    useEffect(() => {
        async function getPictures() {
            const response = await fetch(`http://localhost:8000/place/details?place_id=${place_id}`);
            if (response.ok) {
                const option_details = await response.json();
                setGoogleDetails(option_details);
                setGooglePictures(option_details.photos);
            }
        }
        getPictures();
    }, [])

    function directionsClick(event) {
        window.open(googleDetails["url"]);
    }

    function toggle() {
        setShow(!show);
    }

    return (
        <div className="match-view">
            <div className="button-container">
                <button className="badges-button">
                    <div className="badges-button-div" onClick={toggle}>
                        <h4>Extra Info</h4>
                        <img alt="Details" src={page} />
                    </div>
                </button>
                <button className="badges-button" onClick={directionsClick}>
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
            {show ? <PlaceInfo google={googleDetails} show={toggle} /> : null}
            <div className="matched-content">
                <h1 className="restaurant-title">{googleDetails["name"]}</h1>
                <div className="pictures-bg">
                    <MySlider pictures={googlePictures} />
                </div>
                <div className='info-container'>
                    <div className="info">
                        Rating: {googleDetails["rating"]}
                        <p className="info-text">
                            #{googleDetails["user_ratings_total"]}
                        </p>
                    </div>
                    <p className="info-2">
                        Price level: {googleDetails["price_level"]}
                    </p>
                </div>
                <div className="top-badges">
                    <BadgeCard className="badge-card" />
                    <BadgeCard className="badge-card" />
                    <BadgeCard className="badge-card" />
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
