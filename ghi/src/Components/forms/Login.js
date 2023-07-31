import { usePostLoginMutation } from "../../Redux/loginAPI";
import { useState } from "react";
import { useAuth } from "../AuthProvider";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setUsername, setPassword } from '../../Redux/account-slice'
import { shown } from "../../Redux/modal-slice";

export default function LoginForm() {
  const dispatch = useDispatch();
  const { setToken } = useAuth();
  const [account, setAccount] = useState({
    username: "",
    password: "",
  });
  const [loginPost] = usePostLoginMutation();
  const navigate = useNavigate()
  const initModal = () => {
    dispatch(shown());
  };

  function handleChange(e) {
    let value = e.target.value;
    let name = e.target.name;
    setAccount({ ...account, [name]: value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    let params = new URLSearchParams(account)
    const response = await loginPost(params);
    const token = response.data.access_token
    dispatch(setUsername(account.username))
    dispatch(setPassword(account.password))
    setToken(token);
    setAccount({
      username: "",
      password: "",
    })
    navigate("/search", { replace: true })
  }
  return (
    <div className="container mb-3 shadow">
      <div className="mb-3 title">
        <h1>Login to Fynder</h1>
      </div>
      <form onSubmit={handleSubmit} className="form-floating mb-3">
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

        <button onClick={initModal} type="submit" className="btn btn-primary mb-3">
          Submit
        </button>
      </form>
    </div>
  );
}
