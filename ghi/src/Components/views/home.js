function Home() {
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
          </div>
          <div className="home-container">
            <div className="home-text">
              <h1>Match Fynder</h1>
              <p>easy group decisions: local restaurants</p>
            </div>
            <div>
              <a
                href="/search/"
                className="btn btn-lg btn-secondary fynder-button btn3d"
              >
                new fynd
              </a>
            </div>
          </div>
        </div>
      </div>
      <div class="container">
        <h2 className="fynder-slate-text">how it works</h2>
        <div class="row bs-wizard">
          <div class="col bs-wizard-step">
            <div class="text-center bs-wizard-stepnum">enter location</div>
            <div class="progress">
              <div class="progress-bar"></div>
            </div>
            <a
              href="#"
              class="bs-wizard-dot"
              aria-describedby="tooltip"
              title="enter a zipcode or city, state"
            ></a>
          </div>

          <div class="col bs-wizard-step">
            <div class="text-center bs-wizard-stepnum">invite others</div>
            <div class="progress">
              <div class="progress-bar"></div>
            </div>
            <a
              href="#"
              class="bs-wizard-dot"
              aria-describedby="tooltip"
              title="invite your family or friends to participate"
            ></a>
          </div>

          <div class="col bs-wizard-step">
            <div class="text-center bs-wizard-stepnum">approve/veto</div>
            <div class="progress">
              <div class="progress-bar"></div>
            </div>
            <a
              href="#"
              class="bs-wizard-dot"
              aria-describedby="tooltip"
              title="everyone gets a chance to approve/veto restaurant options"
            ></a>
          </div>

          <div class="col bs-wizard-step">
            <div class="text-center bs-wizard-stepnum">match</div>
            <div class="progress">
              <div class="progress-bar"></div>
            </div>
            <a
              href="#"
              class="bs-wizard-dot"
              aria-describedby="tooltip"
              title="get your match, along with fun/snarky participation badges"
            ></a>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Home;
