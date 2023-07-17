import { useEffect, useState } from 'react';
import { Container, Card, Spinner, Button,} from '../EaseOfAccess/ReactBootstrap';
import '../../App.css';
import React from "react";
import { BadgeCard } from "./BadgeCard";
import "../../App.css";
import medal from "../images/medal.png"


const MatchMade = () => {
  return (
    <div className="match-view">
      <div className="div">
        <div className="overlap-2">
          <div className="overlap-3">
            <div className="pictures">
              <div className="overlap-group-2">
                <div className="pictures-bg">
                  <img className="side-pic" alt="" src="" />
                  <img className="pic" alt="" src="" />
                  <img className="side-pic" alt="" src="" />
                </div>
              </div>
            </div>
            <p className="rating">Rating</p>
            <div className="top-badges">
              <BadgeCard className="badge-card-instance" />
              <BadgeCard className="badge-card-instance" />
              <BadgeCard className="badge-card-instance" />
            </div>
            <div className="frame-3">
              <div className="link-button">
                <img alt="Menu" src="" />
              </div>
              <div className="link-button">
                <img alt="Description" src="" />
              </div>
              <div className="link-button">
                <img alt="Directions" src=""/>
              </div>
              <button className="link-button">
                <img alt="Badges" src={medal} />
              </button>
            </div>
          </div>
          <p className="price">Price-point</p>
        </div>
        <h1 className="restaurant-title">Restaurant Title</h1>
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
