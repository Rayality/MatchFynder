import React, { useEffect, useState } from "react";
import "boxicons";
import { useSwipeable } from "react-swipeable";

function Option(props) {
  // Create variables leveraging React's useState functionality
  // in order to
  // (i) get a list of options that will be displayed in order
  // (ii) set/reset the active option to display on the options page
  // (iii) set/reset the index of the action option from the options list
  const [options, setOptions] = useState([]);
  const [option, setOption] = useState({});
  const [index, setIndex] = useState(0);

  // Get the data to populate the options list
  // and set the first option at index 0
  const fetchData = async () => {
    const url = "http://localhost:8100/api/options/";
    const response = await fetch(url);
    if (response.ok) {
      const data = await response.json();
      setOptions(data.options);
      setOption(data.options.at(index));
    } else {
      console.error(response);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

  // Upon button click, prevent the page from refreshing
  // and reset the index and the option to be displayed
  const handleButton = async (event) => {
    event.preventDefault();
    setIndex(index + 1);
    const next_option = options.at(index);
    setOption(next_option);
  };

  // Upon swipe (or click/drag),
  // reset the index and the option to be displayed
  const handleSwipe = async (event) => {
    setIndex(index + 1);
    const next_option = options.at(index);
    setOption(next_option);
  };

  // Create a variable to be able to set where in the html
  // to detect swipe/click and drag
  // leverage useSwipeable package to call handleSwipe
  // with the trackMouse parameter set to true
  const handlers = useSwipeable({
    onTouchEndOrOnMouseUp: (event) => handleSwipe(event),
    trackMouse: true,
  });

  return (
    <div className="prevent-select">
      <div className="d-flex container justify-content-center">
        <div className="thumbnail">
          <div {...handlers}>
            <img
              draggable="false"
              src={option.picture_url}
              alt="google maps sourced image associated with restaurant"
            />
            <div className="caption">
              <h4>{option.name}</h4>
              <p>Price: {option.price_level} out of 5</p>
              <p>Rating: {option.rating} out of 5</p>
              <p class="d-flex justify-content-between">
                <button onClick={handleButton} className="btn btn-light">
                  <box-icon
                    name="x-circle"
                    color="red"
                    animation="tada-hover"
                  ></box-icon>
                </button>
                <button onClick={handleButton} className="btn btn-light">
                  <box-icon
                    name="check-circle"
                    color="green"
                    animation="tada-hover"
                  ></box-icon>
                </button>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Option;
