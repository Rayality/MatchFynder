import React, { Component } from "react";
import Slider from "react-slick";
import "./match-made.css"

export default class MySlider extends Component {
    constructor(props) {
        super(props);
        this.state = {
            pics: this.props.pictures
        };
    }
    componentDidUpdate(prevProps) {
        if (prevProps !== this.props) {
            this.setState({pics: this.props.pictures})
        }
    }

    render() {
        const settings = {
            className: "pic",
            centerMode: true,
            infinite: true,
            slidesToShow: 1,
            slidesToScroll: 1,
            speed: 500,
            dots: false,
            adaptiveHeight: true,
            variableWidth: true,
            focusOnSelect: true
        };
        return (
        <Slider {...settings}>
            {this.state.pics.map(function(pic, index) {
                return (
                    <img className='pic' key={index} alt="Pictures from google" src={pic}/>
                );
            })}
        </Slider>
        );
    }
}
