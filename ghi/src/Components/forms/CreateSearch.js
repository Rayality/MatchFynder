import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import ErrorNotification from "../../ErrorNotification";
import {
  searchApi,
  useCreateSearchMutation,
  useLazyOptionsApiZipQuery,
  useOptionsApiCityQuery,
} from "../../Redux/searchApi";

export default function CreateSearchForm() {
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [location, setLocation] = useState("");
  const [queryApiZip, apiZipResult, lastPromise] =
    useLazyOptionsApiZipQuery();
    // location
    // search_id

  const [createSearch, searchResult] = useCreateSearchMutation();

  const handleLocationChange = (event) => {
    const value = event.target.value;
    setLocation(value);
  };
  async function handleSubmit(e) {
    e.preventDefault();
    createSearch();
    const search_id = searchResult.id;
    queryApiZip(location, search_id);
  }

  if (apiZipResult.isSuccess) {
    navigate("/options");
  } else if (apiZipResult.isError) {
    setError(apiZipResult.error);
  }

  return (
    <div className="container mb-3 shadow">
      <div className="mb-3">
        <h1>Find a Restaurant Match</h1>
      </div>
      <form onSubmit={handleSubmit} className="form-floating mb-3">
        <div className="mb-3">
          <ErrorNotification error={error} />
          <label htmlFor="inputLocation" className="form-label">
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
        {/* <NavLink to="/options"> */}
        <button type="submit" className="btn btn-primary mb-3">
          Submit
        </button>
        {/* </NavLink> */}
      </form>
    </div>
  );
}
