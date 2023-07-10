import { useState } from "react";
import { useNavigate } from "react-router-dom";
import ErrorNotification from "../../ErrorNotification";
import { useCreateSearchMutation } from "../../Redux/searchApi";

export default function CreateSearchForm() {
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [location, setLocation] = useState("");
  const [createSearch, result] = useCreateSearchMutation();

  async function handleSubmit(e) {
    e.preventDefault();

    createSearch({ location });
  }

  if (result.isSuccess) {
    navigate("/options");
  } else if (result.isError) {
    setError(result.error);
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
            onChange={setLocation}
            name="location"
            type="text"
            className="form-control"
            id="inputLocation"
            placeholder="zip code OR city, state"
          />
        </div>
        <button type="submit" className="btn btn-primary mb-3">
          Submit
        </button>
      </form>
    </div>
  );
}
