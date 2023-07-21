import { useEffect, useState } from 'react';
import '../../App.css';
import React, { Component } from "react";
import { BadgeCard } from "../MatchMadeComponents/BadgeCard";
import {medal, contact, page, map} from "../MatchMadeComponents/MatchMadadeImgs";
import MySlider from '../MatchMadeComponents/Slider';
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import "../MatchMadeComponents/match-made.css";
import "../MatchMadeComponents/match-made-buttons.css"
import "../MatchMadeComponents/badge-card.css"
import { useParams } from 'react-router-dom';



const MatchMade = () => {
    let { place_id } = useParams();
    const [googlePictures, setGooglePictures] = useState([]);
    const [googleDetails, setGoogleDetails] = useState({})
    let option_details;

    useEffect(() => {
        async function getPictures() {
            const response = await fetch(`http://localhost:8000/place/details?place_id=${place_id}`);
            if (response.ok) {
                option_details = await response.json();
                console.log(option_details)
                setGoogleDetails(option_details)
                setGooglePictures(option_details.photos)
            }
        }
        getPictures();
    }, [])

    return (
        <div className="match-view">

                <h1 className="restaurant-title">Restaurant Title</h1>
                <div className="pictures">
                     <div className="pictures-bg">
                        <MySlider pictures={googlePictures}/>
                    </div>
                 </div>
                 <div className='info-container'>
                     <p className="info">
                        Rating: {googleDetails["rating"]}
                        <div className="info-text">
                            #{googleDetails["user_ratings_total"]}
                        </div>
                    </p>
                     <p className="info-2">
                        Price level: {googleDetails["price_level"]}
                    </p>
                 </div>
                 <div className="top-badges">
                     <BadgeCard className="badge-card" />
                     <BadgeCard className="badge-card" />
                     <BadgeCard className="badge-card" />
                 </div>

             <div className="button-container">
                 <button className="badges-button">
                    <div className="badges-button-div">
                        <h4>Extra Info</h4>
                        <img alt="Details" src={page} />
                    </div>
                 </button>
                 <button className="badges-button">
                    <div className="badges-button-div">
                        <h4>Contact</h4>
                        <img  alt="Contact" src={contact} />
                    </div>
                 </button>
                 <button className="badges-button">
                    <div className="badges-button-div">
                        <h4>Directions</h4>
                        <img alt="Directions" src={map}/>
                    </div>
                 </button>
                 <button className="badges-button">
                    <div className="badges-button-div">
                        <h4>Badges</h4>
                        <img alt="Badges" src={medal} />
                    </div>
                 </button>
             </div>
        </div>
    );
};
export default MatchMade


// const pic_placeholder = "https://res.cloudinary.com/teepublic/image/private/s--y2oaoINm--/c_fit,g_north_west,h_715,w_840/co_cc2106,e_outline:40/co_cc2106,e_outline:inner_fill:1/co_ffffff,e_outline:40/co_ffffff,e_outline:inner_fill:1/co_bbbbbb,e_outline:3:1000/c_mpad,g_center,h_1260,w_1260/b_rgb:eeeeee/c_limit,f_auto,h_630,q_auto:good:420,w_630/v1533670083/production/designs/2991942_0.jpg"
// const restaurant_info = "This place was amazing. I wish the google api would be more cooperative to work with in React/js. Finding workarounds to hide my api key is annoying. I am venting constructively"
// const restaurant_name = "Wack Arnolds"
// function MatchMade() {
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
//     return (
//     <div className=''>
//         <div className='Radialprpblue'/>
//         <div className='d-flex justify-content-center flex-column'>
//             <div className="d-flex flex-column align-content-center justify-content-center align-items-center">
//                 <div className=' bg-gradient cardSize' style={{"--bs-bg-opacity": ".5", 'min-height': '100%vh'}}>
//                     <h4 className='card-title text-center pb-3 text-white'>Card Title</h4>
//                     <img className='card-img-top rounded-4 px-2 cardImage' src={pic_placeholder} />
//                     <div className='card-body d-flex flex-column justify-content-center align-items-center'>
//                         <p className='paragraph justify-self-center'>
//                             {restaurant_info}
//                         </p>
//                         <div className="d-flex align-content-center justify-content-center">
//                             <button id="directions" className="btn buttonColor" disabled={isLoading} onClick={!isLoading ? handleClick : null}>
//                                 {isLoading ?  'Getting Route…': 'Click for Directions'}
//                             </button>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     </div>
//     );
// }
// export default MatchMade;
