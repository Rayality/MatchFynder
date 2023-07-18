import { useState, useEffect } from "react";
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
  const [createSearch, searchResult] = useCreateSearchMutation();
  const [queryApiZip, apiZipResult, lastPromise] = useLazyOptionsApiZipQuery();

  // upon data entry set the location to the value of the entry
  const handleLocationChange = (event) => {
    const value = event.target.value;
    setLocation(value);
  };

  // upon submit, prevent default page behavior,
  // create a search record
  // and use the location and searchId to
  // check our db and/or google api for options
  // and add them to that search's search_options
  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const search_payload = await createSearch().unwrap();
      console.log("Search fulfilled: ", search_payload);
    } catch (error) {
      console.error("Create search rejected: ", error);
    }
    try {
      const search_id = await searchResult.data?.id;
      const apizip_payload = await queryApiZip({
        location: location,
        search_id: search_id,
      }).unwrap();
      console.log("Options API fulfilled: ", apizip_payload);
    } catch (error) {
      console.error("Options API rejected: ", error);
    }
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
