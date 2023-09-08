import React, { Component } from "react";
import Slider from "react-slick";
import "./match-pics.css"


export default class MySlider extends Component {
    constructor(props) {
        super(props);
        this.next = this.next.bind(this);
        this.previous = this.previous.bind(this);
        this.state = {
            pics: this.props.pictures
        };
    }
    next() {
        this.slider.slickNext();
    }
    previous() {
        this.slider.slickPrev();
    }
    componentDidUpdate(prevProps) {
        if (prevProps !== this.props) {
            this.setState({ pics: this.props.pictures });
        }
    }

    render() {
        const settings = {
            className: "pic",
            centerMode: true,
            infinite: false,
            slidesToShow: 1,
            slidesToScroll: 1,
            dots: false,
            adaptiveHeight: true,
            variableWidth: true,
            focusOnSelect: true,
            arrows:false,
        };
        return (
            <div style={{display: "flex", height: "300px",width: "100%", position: "relative", alignItems: "center", justifyContent: "space-around"}}>
                <div>
                    <button onClick={this.previous} className="arrows">
                        <box-icon
                            type="solid"
                            name="left-arrow-circle"
                            size="lg"
                            color="black"
                            animation="fade-left-hover"
                            aria-describedby="tooltip"
                            title="next photo"
                        />
                    </button>
                </div>
                <Slider ref={c => (this.slider = c)} {...settings}>
                    {this.state.pics.map(function (pic, index) {
                        return (
                            <img className='pic' key={index} alt="Pictures from google" src={pic} />
                        );
                    })}
                </Slider>
                <div>
                    <button onClick={this.next} className="arrows">
                        <box-icon
                            type="solid"
                            name="right-arrow-circle"
                            size="lg"
                            color="black"
                            animation="fade-right-hover"
                            aria-describedby="tooltip"
                            title="next photo"
                        />
                    </button>
                </div>
            </div>
        );
    }
}
