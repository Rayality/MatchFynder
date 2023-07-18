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
    navigate(`/search/${search_id}/options`);
  }

  return (
    <div className='container mb-3 shadow'>
      <div className='mb-3'>
        <h1>Find a Restaurant Match</h1>
      </div>
      <form onSubmit={handleSubmit} className='form-floating mb-3'>
        <div className='mb-3'>
          <ErrorNotification error={error} />
          <label htmlFor='inputLocation' className='form-label'>
            Location
          </label>
          <input
            value={location}
            onChange={handleLocationChange}
            className='form-control'
            id='location'
            placeholder='zip code OR city, state'
          />
        </div>
        <button type='submit' className='btn btn-primary mb-3'>
          Submit
        </button>
      </form>
    </div>
  );
}
