import encode from "../../logic/encodeAccount";
import { usePostLoginMutation } from "../../Redux/loginAPI";
import { useState } from "react";
import { useAuth } from "../AuthProvider";

export default function LoginForm() {
  const { setToken } = useAuth();
  const [account, setAccount] = useState({
    username: "",
    password: "",
  });
  const [loginPost] = usePostLoginMutation();

  function handleChange(e) {
    let value = e.target.value;
    let name = e.target.name;
    setAccount({ ...account, [name]: value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    encode(account);
    const newToken = await loginPost(account);
    setToken(newToken);
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

        <button type="submit" className="btn btn-primary mb-3">
          Submit
        </button>
      </form>
    </div>
  );
}
