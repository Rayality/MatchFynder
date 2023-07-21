import { NavLink } from "react-router-dom";
import ModalForm from "./forms/Modal";
import { useDispatch } from "react-redux";
import { shown } from "../Redux/modal-slice";

function Nav() {
  const dispatch = useDispatch();
  const initModal = () => {
    dispatch(shown());
  };

  return (
    <>
      <nav className='navbar bg-body-tertiary'>
        <div className='container-fluid'>
          {/* <NavLink className="navbar-brand" href="#">Finder</NavLink> */}
          <button
            onClick={initModal}
            className='btn btn-primary'
            data-bs-toggle='modal'
            data-bs-target='#loginModal'
          >
            Insert Profile person thumbnail here!
            {/* replace this with a vector image, ask Nick if this doesnt make sense */}
          </button>
          <button
            className='navbar-toggler'
            type='button'
            data-bs-toggle='offcanvas'
            data-bs-target='#offcanvasNavbar'
            aria-controls='offcanvasNavbar'
            aria-label='Toggle navigation'
          >
            <span className='navbar-toggler-icon'></span>
          </button>
          <div
            className='offcanvas offcanvas-end'
            tabIndex='-1'
            data-bs-toggle='true'
            id='offcanvasNavbar'
            aria-labelledby='offcanvasNavbarLabel'
          >
            <div className='offcanvas-header'>
              <h5 className='offcanvas-title' id='offcanvasNavbarLabel'>
                Offcanvas
              </h5>
              <button
                type='button'
                className='btn-close'
                data-bs-dismiss='offcanvas'
                aria-label='Close'
              ></button>
            </div>
            <div className='offcanvas-body'>
              <ul className='navbar-nav justify-content-end flex-grow-1 pe-3'>
                <li className='nav-item'>
                  {/* <NavLink className="nav-link active" aria-current="page" to="/">Home</NavLink> */}
                </li>
                <li className='nav-item'>
                  <NavLink className='nav-link' to='/logout'>
                    Logout
                  </NavLink>
                </li>
              </ul>
              <form className='d-flex mt-3' role='search'>
                <input
                  className='form-control me-2'
                  type='search'
                  placeholder='Search'
                  aria-label='Search'
                />
                <button className='btn btn-outline-success' type='submit'>
                  Search
                </button>
              </form>
            </div>
          </div>
        </div>
      </nav>
      <ModalForm id='loginModal' />
    </>
  );
}
export default Nav;
