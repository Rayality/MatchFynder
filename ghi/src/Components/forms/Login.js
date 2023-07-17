import { useDispatch, useSelector } from "react-redux";
import { sendLoginData } from "../../logic/SendData";
import { updated, reset } from "../../Redux/login-slice";

export default function LoginForm() {
  const account = useSelector((state) => state.accountLogin.value);
  const dispatch = useDispatch();
  const url = "http://localhost:8000/token/";

  function handleChange(e) {
    let value = [e.target.name, e.target.value];
    dispatch(updated(value));
  }

  function handleSubmit(e) {
    e.preventDefault();
    sendLoginData(url, "post", account);
    dispatch(reset());
  }
  return (
    <div className='container mb-3 shadow'>
      <div className='mb-3 title'>
        <h1>Login</h1>
      </div>
      <form onSubmit={handleSubmit} className='form-floating mb-3'>
        <div className='mb-3'>
          <label htmlFor='inputUsername' className='form-label'>
            Username
          </label>
          <input
            onChange={handleChange}
            value={account.username}
            name='username'
            type='text'
            className='form-control'
            id='inputUsername'
            aria-describedby='emailHelp'
          />
        </div>

        <div className='mb-3'>
          <label htmlFor='exampleInputPassword1' className='form-label'>
            Password
          </label>
          <input
            onChange={handleChange}
            value={account.password}
            name='password'
            type='password'
            className='form-control'
            id='inputPassword'
          />
        </div>

        <button type='submit' className='btn btn-primary mb-3'>
          Submit
        </button>
      </form>
    </div>
  );
}
