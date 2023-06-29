import { NavLink } from "react-router-dom";
import FetchData from "../../logic/FetchData";
import { useEffect, useState } from "react";

export default function CreateAccountForm() {
  const [userData, setUserData] = useState({
    username: "",
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

  return (
    <div className='container mb-3 shadow'>
      <form className='form-floating mb-3'>
        <div className='mb-3'>
          <label for='inputFName' className='form-label'>
            First Name
          </label>
          <input
            type='text'
            className='form-control'
            id='inputFName'
            aria-describedby='emailHelp'
          />
        </div>
        <div className='mb-3'>
          <label for='inputLName' className='form-label'>
            Last Name
          </label>
          <input
            type='text'
            className='form-control'
            id='inputLName'
            aria-describedby='emailHelp'
          />
        </div>
        <div className='mb-3'>
          <label for='exampleInputEmail1' className='form-label'>
            Email address
          </label>
          <input
            type='email'
            className='form-control'
            id='inputEmail'
            aria-describedby='emailHelp'
          />
          <div id='emailHelp' className='form-text'>
            We'll never share your email with anyone else.
          </div>
        </div>
        <div className='mb-3'>
          <label for='exampleInputPassword1' className='form-label'>
            Password
          </label>
          <input type='password' className='form-control' id='inputPassword' />
        </div>
        <div className='mb-3'>
          <label for='exampleInputPassword1' className='form-label'>
            Confirm Password
          </label>
          <input
            type='password'
            className='form-control'
            id='confirmPassword'
          />
        </div>
        <div className='mb-3 form-check'>
          <input type='checkbox' className='form-check-input' id='termsCheck' />
          <label className='form-check-label' for='exampleCheck1'>
            I agree to the <NavLink href='#'>terms and conditions</NavLink>
          </label>
        </div>
        <button type='submit' className='btn btn-primary mb-3'>
          Submit
        </button>
      </form>
    </div>
  );
}
