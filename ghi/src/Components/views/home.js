import { useNavigate } from "react-router-dom";
import { useAuth } from "../AuthProvider";
import { shown } from "../../Redux/modal-slice";
import { useDispatch } from "react-redux";

function Home() {
  const { token } = useAuth()
  const navigate = useNavigate()
  const dispatch = useDispatch();

  const handleClick = () => {
    if (!token) {
      dispatch(shown())
    } else {
      navigate('search/', { replace: true })
    }
  }
  return (
    <div>
      <div className="cover-container d-flex h-100 p-3 mx-auto flex-column">
        <div>
          <div className="hero-cover">
            <img
              src="https://images.pexels.com/photos/3184195/pexels-photo-3184195.jpeg"
              className="img-fluid img-thumbnail"
              alt="group enjoying shared meal"
            />
            <div className="home-container">
              <div className="home-text">
                <h1>Match Fynder</h1>
                <p>easy group decisions: local restaurants</p>
              </div>
              <div>
                <button
                  onClick={handleClick}
                  className="btn btn-lg btn-secondary fynder-button btn3d"
                >
                  new fynd
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="container">
        <h2 className="fynder-slate-text">how it works</h2>
        <div className="row bs-wizard">
          <div className="col bs-wizard-step">
            <div className="text-center bs-wizard-stepnum" data-bs-toggle="tooltip" data-bs-placement="bottom" data-bs-title="Tooltip on bottom">enter location</div>
            <div className="progress">
              <div className="progress-bar"></div>
            </div>
            <button
              className="bs-wizard-dot border-0"
              aria-describedby="tooltip"
              title="enter a zipcode or city, state"
            ></button>
          </div>

          <div className="col bs-wizard-step">
            <div className="text-center bs-wizard-stepnum">invite others</div>
            <div className="progress">
              <div className="progress-bar"></div>
            </div>
            <button
              className="bs-wizard-dot border-0"
              aria-describedby="tooltip"
              title="invite your family or friends to participate"
            ></button>
          </div>

          <div className="col bs-wizard-step">
            <div className="text-center bs-wizard-stepnum">approve/veto</div>
            <div className="progress">
              <div className="progress-bar"></div>
            </div>
            <button
              className="bs-wizard-dot border-0"
              aria-describedby="tooltip"
              title="everyone gets a chance to approve/veto restaurant options"
            ></button>
          </div>

          <div className="col bs-wizard-step">
            <div className="text-center bs-wizard-stepnum">match</div>
            <div className="progress">
              <div className="progress-bar"></div>
            </div>
            <button
              className="bs-wizard-dot border-0"
              aria-describedby="tooltip"
              title="get your match, along with fun/snarky participation badges"
            ></button>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Home;
