import { useNavigate } from "react-router-dom";
import ModalForm from "./forms/Modal";
import { useDispatch } from "react-redux";
import { shown } from "../Redux/modal-slice";
import { useLogoutMutation } from "../Redux/loginAPI";
import { useAuth } from "./AuthProvider";

function Nav() {
  const dispatch = useDispatch();
  const initModal = () => {
    dispatch(shown());
  };
  const navigate = useNavigate()
  const [logout] = useLogoutMutation()
  const { setToken } = useAuth()

  const handleLogout = () => {
    logout()
    setToken(undefined)
    navigate("/", { replace: true })
  }

  return (
    <>
      <nav className="navbar bg-body-tertiary">
        <div className="container-fluid">
          {/* <NavLink className="navbar-brand" href="#">Finder</NavLink> */}
          <button
            onClick={initModal}
            className="btn btn-lg btn-secondary fynder-button btn3d"
            data-bs-toggle="modal"
            data-bs-target="#loginModal"
          >
            <box-icon name='user' color="white"></box-icon>
            {/* replace this with a vector image, ask Nick if this doesnt make sense */}
          </button>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="offcanvas"
            data-bs-target="#offcanvasNavbar"
            aria-controls="offcanvasNavbar"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div
            className="offcanvas offcanvas-end"
            tabIndex="-1"
            data-bs-toggle="true"
            id="offcanvasNavbar"
            aria-labelledby="offcanvasNavbarLabel"
          >
            <div className="offcanvas-header">
              <h5 className="offcanvas-title" id="offcanvasNavbarLabel">
                Menu
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="offcanvas"
                aria-label="Close"
              ></button>
            </div>
            <div className="offcanvas-body">
              <ul className="navbar-nav justify-content-end flex-grow-1 pe-3 mb-3">
                <li className="nav-item">
                  <button onClick={() => navigate('/')} className="btn btn-lg btn-secondary fynder-button btn3d" aria-current="page" to="/">Home</button>
                </li>
                <li className="nav-item">
                  <button onClick={handleLogout} className="btn btn-lg btn-secondary fynder-button btn3d" to="/logout">
                    Logout
                  </button>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </nav>
      <ModalForm id="loginModal" />
    </>
  );
}
export default Nav;
