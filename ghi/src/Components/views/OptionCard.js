import React, { useCallback, useState } from "react";
import "boxicons";
import { useSwipeable } from "react-swipeable";
import ErrorNotification from "../../ErrorNotification";
// import {
//   useAddSearchOptionMutation
// } from "../../Redux/searchApi";
import { useGetOptionsBySearchQuery } from "../../Redux/searchApi";
import dino from "../images/dino.png"

function Option(props) {
  const searchId = props.searchId
  // Create a local index variable leveraging React's useState functionality
  // in order to set/reset the index of the action option from the options list
  const [index, setIndex] = useState(0);
  const { data, error, isLoading } = useGetOptionsBySearchQuery(searchId);
  // const [socketUrl, setSocketUrl] = useState(
  //   `ws://localhost:8000/search/${searchId}`
  // );

  // const { sendJsonMessage, lastJsonMessage } = useWebSocket(socketUrl);

  // use useGetOptionsQuery to populate the list of options
  // const [addSearchOptionMutation, searchOptionData] =
  //   useAddSearchOptionMutation();

  // Upon button click, prevent the page from refreshing
  // and reset the index of the option to be displayed
  const handleButton = async (event) => {
    event.preventDefault();
    setIndex(index);

    //const optionId = data?.[index - 1].id;
    //console.log('optionId:', optionId)

    //if (optionId) {
    // addSearchOptionMutation({ option_id: optionId, search_id: 5 });
    //}
  };

  const handleThumbnail = () => {
    if (!data[index][0].picture_url) {
      setThumbnail(dino)
    } else {
      setThumbnail(data[index][0].picture_url)
    }
  }
  useEffect(() => {
    if (!data) {
      setThumbnail(dino)
    } else {
      setThumbnail(data[index][0].picture_url)
    }
  }, [data])
  // Upon swipe (or click/drag),
  // reset the index of the option to be displayed
  // Create a variable to be able to set where in the html
  // to detect swipe/click and drag
  // leverage useSwipeable package to call handleSwipe
  // with the trackMouse parameter set to true
  const handlers = useSwipeable({
    onTouchEndOrOnMouseUp: (event) => handleSwipe(event),
    trackMouse: true,
  });

  // handle loading
  if (!isLoading) {
    // var optionId = data[index][0].id;
  } else {
    return <progress className="progress is-primary" max="100"></progress>;
  }
  const handleSwipe = async (event) => {
    setIndex(index + 1);
    handleThumbnail();
  };

  return (
    <div>
      <div className="cover-container d-flex mx-auto flex-column">
        <div className="options-jumbotron jumbotron-fluid">
          <div className="prevent-select">
            <div className="d-flex container justify-content-center">
              <div className="thumbnail options-container">
                <ErrorNotification error={error} />
                <div {...handlers}>
                  <img className="img-thumbnail object-fit-cover"
                    style={{ "max-height": "400px" }}
                    draggable="false"
                    src={data[index][0].picture_url}
                    alt="google maps sourced pic associated with restaurant"
                  />
                  <div className="caption">
                    <h4>{data[index][0].name}</h4>
                    <p>Price: {data[index][0].price_level} out of 5</p>
                    <p>Rating: {data[index][0].rating} out of 5</p>
                    <p className="d-flex justify-content-between">
                      <button onClick={handleButton} className="btn">
                        <box-icon
                          name="x-circle"
                          color="red"
                          animation="tada-hover"
                          aria-describedby="tooltip"
                          title="click or swipe left to veto"
                        ></box-icon>
                      </button>
                      <button onClick={handleButton} className="btn">
                        <box-icon
                          name="check-circle"
                          color="green"
                          animation="tada-hover"
                          aria-describedby="tooltip"
                          title="click or swipe right to approve"
                        ></box-icon>
                      </button>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
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

          <div className="col bs-wizard-step active">
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

          <div className="col bs-wizard-step disabled">
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
}

export default Option;
