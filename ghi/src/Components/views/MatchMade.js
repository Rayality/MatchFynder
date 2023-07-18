import { useEffect, useState } from 'react';
import { Container, Card, Spinner, Button,} from '../EaseOfAccess/MatchMadeBootstrap';
import '../../App.css';
import React from "react";
import { BadgeCard } from "./BadgeCard";
import "../EaseOfAccess/match-made.css";
import {medal, menu, page, map} from "../EaseOfAccess/MatchMadadeImgs"

const pictures = [
    "https://images.pexels.com/photos/16377866/pexels-photo-16377866/free-photo-of-woman-wearing-dress-on-meadow.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load",
    "https://images.pexels.com/photos/17357107/pexels-photo-17357107/free-photo-of-landscape-field-summer-sun.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load",
    "https://images.pexels.com/photos/17444510/pexels-photo-17444510/free-photo-of-landscape-people-animal-farm.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load",
    "https://images.pexels.com/photos/17584116/pexels-photo-17584116.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load",
    "https://images.pexels.com/photos/17077794/pexels-photo-17077794/free-photo-of-tilt-house-behind-grass-on-montmartre.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load"
]
const piclist = pictures.map((pic) => <img src={pic}/>)

const MatchMade = () => {
    const carousel = (listUrlStrings) => {
        listUrlStrings.map((url, index) => <img key={index} src={url} />)
    }
    return (
        <div className="match-view">
            <div>
                <h1 className="restaurant-title">Restaurant Title</h1>
                <div className="pictures">
                    <div className="pictures-bg">
                        {pictures.map((pic) => <img className="pic" alt="Picture" src={pic}/>)}
                    </div>
                </div>
                <div className='info-container'>
                    <p className="info">Rating</p>
                    <p className="info">Price-point</p>
                </div>
                <div className="top-badges">
                    <BadgeCard className="badge-card" />
                    <BadgeCard className="badge-card" />
                    <BadgeCard className="badge-card" />
                </div>
            </div>
            <div className="button-container">
                <button className="badges-button">
                    <img alt="Menu" src={menu} />
                </button>
                <button className="badges-button">
                    <img alt="Description" src={page} />
                </button>
                <button className="badges-button">
                    <img alt="Directions" src={map}/>
                </button>
                <button className="badges-button">
                    <img alt="Badges" src={medal} />
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
