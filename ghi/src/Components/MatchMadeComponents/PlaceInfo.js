import x from "../images/x.png"
import check from "../images/check.png"
import { Component } from "react"
import "../MatchMadeComponents/match-pics.css"
import "./place-info.css"

export default class PlaceInfo extends Component {
    phone = String(this.props.google.international_phone_number);

    reservable = this.props.google.formatted_phone_number ? check : x;
    delivery = this.props.google.dedivvery ? check : x;
    dineIn = this.props.google.dine_in ? check : x;
    veg = this.props.google.serves_vegetarian_food ? check : x;
    wheelchair = this.props.google.wheelchair_accessible_entrance ? check : x;
    breakfast = this.props.google.serves_breakfast ? check : x;
    lunch = this.props.google.serves_lunch ? check : x;
    dinner = this.props.google.serves_dinner ? check : x;
    beer = this.props.google.serves_beer ? check : x;
    wine = this.props.google.serves_wine ? check : x;
    showfunc = () => {
        this.props.show()
    }
    render() {
        return (
            <div className='place-info-bg'>
                <button className="close-info" onClick={this.showfunc}>CLOSE</button>
                <div className='place-info'>
                    <div>
                        <h1 className="fynder-dark-text text-top" onClick={this.showfunc}>Phone#: {this.phone ? this.phone : 'Number not available'}</h1>
                    </div>
                    <div className="features">
                        <div className="feature-block">Reservable: <img className="check-img" src={this.reservable} alt="..." /></div>
                        <div className="feature-block">Delivery: <img className="check-img" src={this.delivery} alt="..." /></div>
                    </div>
                    <div className="features">
                        <div className="feature-block">Breakfast: <img className="check-img" src={this.breakfast} alt="..." /></div>
                        <div className="feature-block">Dine in: <img className="check-img" src={this.dineIn} alt="..." /></div>
                    </div>
                    <div className="features">
                        <div className="feature-block">Lunch: <img className="check-img" src={this.lunch} alt="..." /></div>
                        <div className="feature-block">Wine: <img className="check-img" src={this.wine} alt="..." /></div>
                    </div>
                    <div className="features">
                        <div className="feature-block">Dinner: <img className="check-img" src={this.dinner} alt="..." /></div>
                        <div className="feature-block">Beer: <img className="check-img" src={this.beer} alt="..." /></div>
                    </div>
                    <div className="features">
                        <div className="feature-block">Vegetarian Options: <img className="check-img" src={this.veg} alt="..." /></div>
                        <div className="feature-block">Wheelchair Access: <img className="check-img" src={this.wheelchair} alt="..." /></div>
                    </div>
                </div>
            </div>
        )
    };
}
