import { NavLink } from "react-router-dom";

export default function CreateAccountForm() {
  return (
    <div className='container mb-3 shadow'>
      <form className='mb-3'>
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
