import React, { useState } from "react";
import { useGetOptionsQuery } from "../../store/optionsApi";
import "boxicons";
import { useSwipeable } from "react-swipeable";
import ErrorNotification from "../../ErrorNotification";

function Option(props) {
  // Create local variables leveraging React's useState functionality
  // in order to
  // (i) set/reset the active option to display on the options page
  // (ii) set/reset the index of the action option from the options list
  const [option, setOption] = useState({});
  const [index, setIndex] = useState(0);

  // use useGetOptionsQuery to populate list of options
  // and set the first option at index 0
  const { data, error, isLoading } = useGetOptionsQuery(() => {
    setOption(data.at(0));
  });

  // Upon button click, prevent the page from refreshing
  // and reset the index and the option to be displayed
  const handleButton = async (event) => {
    event.preventDefault();
    setIndex(index + 1);
    const next_option = data.at(index);
    setOption(next_option);
  };

  // Upon swipe (or click/drag),
  // reset the index and the option to be displayed
  const handleSwipe = async (event) => {
    setIndex(index + 1);
    const next_option = data.at(index);
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

  // handle loading
  if (isLoading) {
    return <progress className="progress is-primary" max="100"></progress>;
  }

  return (
    <div className="prevent-select">
      <div className="d-flex container justify-content-center">
        <div className="thumbnail">
          <ErrorNotification error={error.message} />
          <div {...handlers}>
            <img
              draggable="false"
              src={option.picture_url}
              alt="google maps sourced pic associated with restaurant"
            />
            <div className="caption">
              <h4>{option.name}</h4>
              <p>Price: {option.price_level} out of 5</p>
              <p>Rating: {option.rating} out of 5</p>
              <p className="d-flex justify-content-between">
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
