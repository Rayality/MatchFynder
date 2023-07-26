import { NavLink } from "react-router-dom";
import SendData from "../../logic/SendData";
import { useSelector, useDispatch } from "react-redux";
import { updated, reset } from "../../Redux/account-slice";

export default function CreateAccountForm() {
  const account = useSelector((state) => state.accountCreator.value);
  const dispatch = useDispatch();
  const url = process.env.REACT_APP_API_HOST + "/api/accounts/";

  function cleanData(data = {}) {
    const clean = {};
    for (let [key, val] of Object.entries(data)) {
      if (key !== "confirmPassword") {
        clean[key] = val;
      }
    }
    return clean;
  }

  function handleChange(e) {
    let value = [e.target.name, e.target.value];
    dispatch(updated(value));
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (account.confirmPassword === account.password) {
      const data = cleanData(account);
      SendData(url, "post", data);
      dispatch(reset());
    } else {
      console.log("Passwords do not match  1");
    }
  }

  return (
    <div className="container mb-3 shadow">
      <div className="mb-3">
        <h1>Create A Fynder Account</h1>
      </div>
      <form onSubmit={handleSubmit} className="form-floating mb-3">
        <div className="mb-3">
          <label htmlFor="inputFName" className="form-label">
            First Name
          </label>
          <input
            onChange={handleChange}
            value={account.first_name}
            name="first_name"
            type="text"
            className="form-control"
            id="inputFName"
            aria-describedby="emailHelp"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="inputLName" className="form-label">
            Last Name
          </label>
          <input
            onChange={handleChange}
            value={account.last_name}
            name="last_name"
            type="text"
            className="form-control"
            id="inputLName"
            aria-describedby="emailHelp"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="inputUsername" className="form-label">
            Username
          </label>
          <input
            onChange={handleChange}
            value={account.username}
            name="username"
            type="text"
            className="form-control"
            id="inputUsername"
            aria-describedby="emailHelp"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputEmail1" className="form-label">
            Email address
          </label>
          <input
            onChange={handleChange}
            value={account.email}
            name="email"
            type="email"
            className="form-control"
            id="inputEmail"
            aria-describedby="emailHelp"
          />
          <div id="emailHelp" className="form-text">
            We'll never share your email with anyone else.
          </div>
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputPassword1" className="form-label">
            Password
          </label>
          <input
            onChange={handleChange}
            value={account.password}
            name="password"
            type="password"
            className="form-control"
            id="inputPassword"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputPassword1" className="form-label">
            Confirm Password
          </label>
          <input
            onChange={handleChange}
            value={account.confirmPassword}
            name="confirmPassword"
            type="password"
            className="form-control"
            id="inputConfirmPassword"
          />
        </div>
        <div className="mb-3 form-check">
          <input type="checkbox" className="form-check-input" id="termsCheck" />
          <label className="form-check-label" htmlFor="exampleCheck1">
            I agree to the <NavLink href="#">terms and conditions</NavLink>
          </label>
        </div>
        <button type="submit" className="btn btn-primary mb-3">
          Submit
        </button>
      </form>
    </div>
  );
}
