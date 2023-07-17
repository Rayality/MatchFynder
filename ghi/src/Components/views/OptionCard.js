import React, { useState } from "react";
import { useGetOptionsQuery } from "../../Redux/optionsApi";
import "boxicons";
import { useSwipeable } from "react-swipeable";
import ErrorNotification from "../../ErrorNotification";
import {
  useAddSearchOptionMutation,
  useGetMatchMadeQuery,
} from "../../Redux/searchApi";
import { useGetSearchQuery } from "../../Redux/searchApi";

//export let optionId = null;

function Option(props) {
  // Create a local index variable leveraging React's useState functionality
  // in order to set/reset the index of the action option from the options list
  const [index, setIndex] = useState(0);

  // use useGetOptionsQuery to populate the list of options
  const { data, error, isLoading } = useGetOptionsQuery();
  const [addSearchOptionMutation, searchOptionData] =
    useAddSearchOptionMutation();

  const optionId = data?.[index].id;
  console.log(optionId);

  // Upon button click, prevent the page from refreshing
  // and reset the index of the option to be displayed
  const handleButton = async (event) => {
    event.preventDefault();
    setIndex(index);

    const optionId = data?.[index - 1].id;
    //console.log('optionId:', optionId)

    if (optionId) {
      addSearchOptionMutation({ option_id: optionId, search_id: 5 });
    }
  };

  // Upon swipe (or click/drag),
  // reset the index of the option to be displayed
  const handleSwipe = async (event) => {
    setIndex(index + 1);
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

  // if (matchMadeIsLoading) {
  //   return <progress className="progress is-primary" max="100"></progress>;
  // }

  return (
    <div className="prevent-select">
      <div className="d-flex container justify-content-center">
        <div className="thumbnail">
          <ErrorNotification error={error} />
          <div {...handlers}>
            <img
              draggable="false"
              src={data[index].picture_url}
              alt="google maps sourced pic associated with restaurant"
            />
            <div className="caption">
              <h4>{data[index].name}</h4>
              <p>Price: {data[index].price_level} out of 5</p>
              <p>Rating: {data[index].rating} out of 5</p>
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

//const option_Id = Option().optionId
//console.log(optionId)
