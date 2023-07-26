import React, { useState, useEffect } from "react";
import { useGetAllOptionsQuery } from "../../Redux/optionsApi";
import "boxicons";
import { useSwipeable } from "react-swipeable";
import ErrorNotification from "../../ErrorNotification";
import {
  useAddSearchOptionMutation,
  useGetMatchMadeQuery,
  useGetSearchQuery,
} from "../../Redux/searchApi";
// import useWebSocket from "react-use-websocket";
import { useUpdateEdibleOptionMutation } from "../../Redux/searchApi";
import { useGetOptionsBySearchQuery } from "../../Redux/searchApi";

//export let optionId = null;

function Option(props) {
  const searchId = props.searchId;
  // Create a local index variable leveraging React's useState functionality
  // in order to set/reset the index of the action option from the options list
  const [index, setIndex] = useState(0);
  const [messageHistory, setMessageHistory] = useState({});

  // const [socketUrl, setSocketUrl] = useState(
  //   `ws://localhost:8000/search/${searchId}`
  // );

  // const { sendJsonMessage, lastJsonMessage } = useWebSocket(socketUrl);

  // use useGetOptionsQuery to populate the list of options
  const { data, error, isLoading } = useGetOptionsBySearchQuery(searchId);
  const [addSearchOptionMutation, searchOptionData] =
    useAddSearchOptionMutation();

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
  if (isLoading) {
    return <progress className="progress is-primary" max="100"></progress>;
  } else {
    var optionId = data[index][0].id;
    // if (matchMadeIsLoading) {
    //   return <progress className="progress is-primary" max="100"></progress>;
  }
  const handleSwipe = async (event) => {
    setIndex(index + 1);
    // sendJsonMessage(JSON.stringify({ option_id: optionId }));
    // console.log(lastJsonMessage);
  };

  return (
    <div className="prevent-select">
      <div className="d-flex container justify-content-center">
        <div className="thumbnail">
          <ErrorNotification error={error} />
          <div {...handlers}>
            <img
              draggable="false"
              src={data[index][0].picture_url}
              alt="google maps sourced pic associated with restaurant"
            />
            <div className="caption">
              <h4>{data[index][0].name}</h4>
              <p>Price: {data[index][0].price_level} out of 5</p>
              <p>Rating: {data[index][0].rating} out of 5</p>
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
