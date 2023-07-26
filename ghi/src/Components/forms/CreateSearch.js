import { useState } from "react";
import { useNavigate } from "react-router-dom";
import ErrorNotification from "../../ErrorNotification";
import {
  useCreateSearchMutation,
  useLazyOptionsApiZipQuery,
} from "../../Redux/searchApi";
import { useSelector, useDispatch } from 'react-redux'
import { setAutoLat, setAutoLng } from "../../Redux/locationSlice";
import AutoComplete from "../AutoComplete";

export default function CreateSearchForm() {
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [location, setLocation] = useState(``);
  const [createSearch] = useCreateSearchMutation();
  const [queryApiZip] = useLazyOptionsApiZipQuery();
  const dispatch = useDispatch()
  let formLat = useSelector((state) => state.autoLocation.autoLat)
  let formLng = useSelector((state) => state.autoLocation.autoLng)

  // create a search record
  // and return the search id of that record
  async function handleSearchCreate() {
    try {
      const searchPayload = await createSearch().unwrap();
      return searchPayload.id;
    } catch (error) {
      console.error("Create search rejected: ", error);
    }
  }

  // await the search id result of handleSearchCreate,
  // call the options api using the search_id
  // and the location entered by the user
  // create 20 search_options records
  // from the Finder DB or google API
  // and return the search id
  async function handleApiCalls() {
    const search_id = await handleSearchCreate();
    try {
      if (search_id) {
        let latLongString = `${formLat.payload} ${formLng.payload}`
        const apizip_payload = await queryApiZip({
          location:latLongString,
          search_id:search_id,
        }).unwrap();
        return search_id;
      }
    } catch (error) {
      console.error("Options API rejected: ", error);
    }
  }
  // upon submit, prevent default page behavior,
  // await the search id results of handleApiCalls
  // and navigate to the search_options page for that result
  async function handleSubmit(e) {
    e.preventDefault();
    if (formLat != null && formLng != null) {
      const latLongString = `${formLat.payload} ${formLng.payload}`
      console.log("preventing default",latLongString)
      dispatch(setAutoLat(null))
      dispatch(setAutoLng(null))
      const search_id = await handleApiCalls();
      navigate(`${search_id}/options`);
      }
    }

  return (
    <div className="cover-container d-flex mx-auto flex-column">
      <div className="search-jumbotron jumbotron-fluid">
        <div className="container mb-3 shadow search-container">
          <div className="mb-3">
            <h1>Fynd Restaurant</h1>
          </div>
          <form onSubmit={handleSubmit} className="form-floating mb-3">
            <div className="mb-3">
              <ErrorNotification error={error} />
            <AutoComplete />
            </div>
            <button
              type="submit"
              className="btn btn-primary mb-3 btn3d fynder-button"
            >
              Submit
            </button>
          </form>
        </div>
      </div>
      <div className="container">
        <h2 className="fynder-slate-text">how it works</h2>
        <div className="row bs-wizard">
          <div className="col bs-wizard-step active">
            <div className="text-center bs-wizard-stepnum">enter location</div>
            <div className="progress">
              <div className="progress-bar"></div>
            </div>
            <a
              href="#"
              className="bs-wizard-dot"
              aria-describedby="tooltip"
              title="enter a zipcode or city, state"
            ></a>
          </div>

          <div className="col bs-wizard-step disabled">
            <div className="text-center bs-wizard-stepnum">invite others</div>
            <div className="progress">
              <div className="progress-bar"></div>
            </div>
            <a
              href="#"
              className="bs-wizard-dot"
              aria-describedby="tooltip"
              title="invite your family or friends to participate"
            ></a>
          </div>

          <div className="col bs-wizard-step disabled">
            <div className="text-center bs-wizard-stepnum">approve/veto</div>
            <div className="progress">
              <div className="progress-bar"></div>
            </div>
            <a
              href="#"
              className="bs-wizard-dot"
              aria-describedby="tooltip"
              title="everyone gets a chance to approve/veto restaurant options"
            ></a>
          </div>

          <div className="col bs-wizard-step disabled">
            <div className="text-center bs-wizard-stepnum">match</div>
            <div className="progress">
              <div className="progress-bar"></div>
            </div>
            <a
              href="#"
              className="bs-wizard-dot"
              aria-describedby="tooltip"
              title="get your match, along with fun/snarky participation badges"
            ></a>
          </div>
        </div>
      </div>
    </div>
  );
}
