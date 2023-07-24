import { useState } from "react";
import { useNavigate } from "react-router-dom";
import ErrorNotification from "../../ErrorNotification";
import {
  useCreateSearchMutation,
  useLazyOptionsApiZipQuery,
  useOptionsApiCityQuery,
} from "../../Redux/searchApi";

export default function CreateSearchForm() {
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [location, setLocation] = useState("");
  const [createSearch] = useCreateSearchMutation();
  const [queryApiZip] = useLazyOptionsApiZipQuery();

  // upon data entry set the location to the value of the entry
  const handleLocationChange = (event) => {
    const value = event.target.value;
    setLocation(value);
  };

  // create a search record
  // and return the search id of that record
  async function handleSearchCreate() {
    try {
      const searchPayload = await createSearch().unwrap();
      console.log("Search payload: ", searchPayload);
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
      console.log(search_id);
      if (search_id) {
        const apizip_payload = await queryApiZip({
          location,
          search_id,
        }).unwrap();
        console.log("Options API payload: ", apizip_payload);
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
    const search_id = await handleApiCalls();
    navigate(`${search_id}/options`);
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
              <label
                htmlFor="inputLocation"
                className="form-label fynder-dark-text"
              >
                Location
              </label>
              <input
                value={location}
                onChange={handleLocationChange}
                className="form-control"
                id="location"
                placeholder="zip code OR city, state"
              />
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
      <div class="container">
        <h2 className="fynder-slate-text">how it works</h2>
        <div class="row bs-wizard">
          <div class="col bs-wizard-step active">
            <div class="text-center bs-wizard-stepnum">enter location</div>
            <div class="progress">
              <div class="progress-bar"></div>
            </div>
            <a
              href="#"
              class="bs-wizard-dot"
              aria-describedby="tooltip"
              title="enter a zipcode or city, state"
            ></a>
          </div>

          <div class="col bs-wizard-step disabled">
            <div class="text-center bs-wizard-stepnum">invite others</div>
            <div class="progress">
              <div class="progress-bar"></div>
            </div>
            <a
              href="#"
              class="bs-wizard-dot"
              aria-describedby="tooltip"
              title="invite your family or friends to participate"
            ></a>
          </div>

          <div class="col bs-wizard-step disabled">
            <div class="text-center bs-wizard-stepnum">approve/veto</div>
            <div class="progress">
              <div class="progress-bar"></div>
            </div>
            <a
              href="#"
              class="bs-wizard-dot"
              aria-describedby="tooltip"
              title="everyone gets a chance to approve/veto restaurant options"
            ></a>
          </div>

          <div class="col bs-wizard-step disabled">
            <div class="text-center bs-wizard-stepnum">match</div>
            <div class="progress">
              <div class="progress-bar"></div>
            </div>
            <a
              href="#"
              class="bs-wizard-dot"
              aria-describedby="tooltip"
              title="get your match, along with fun/snarky participation badges"
            ></a>
          </div>
        </div>
      </div>
    </div>
  );
}
