function ProgressBar() {
  $(document).ready(function () {
    var currentGfgStep, nextGfgStep, previousGfgStep;
    var opacity;
    var current = 1;
    var steps = $("fieldset").length;

    setProgressBar(current);

    $(".next-step").click(function () {
      currentGfgStep = $(this).parent();
      nextGfgStep = $(this).parent().next();

      $("#progressbar li")
        .eq($("fieldset").index(nextGfgStep))
        .addClass("active");

      nextGfgStep.show();
      currentGfgStep.animate(
        { opacity: 0 },
        {
          step: function (now) {
            opacity = 1 - now;

            currentGfgStep.css({
              display: "none",
              position: "relative",
            });
            nextGfgStep.css({ opacity: opacity });
          },
          duration: 500,
        }
      );
      setProgressBar(++current);
    });

    $(".previous-step").click(function () {
      currentGfgStep = $(this).parent();
      previousGfgStep = $(this).parent().prev();

      $("#progressbar li")
        .eq($("fieldset").index(currentGfgStep))
        .removeClass("active");

      previousGfgStep.show();

      currentGfgStep.animate(
        { opacity: 0 },
        {
          step: function (now) {
            opacity = 1 - now;

            currentGfgStep.css({
              display: "none",
              position: "relative",
            });
            previousGfgStep.css({ opacity: opacity });
          },
          duration: 500,
        }
      );
      setProgressBar(--current);
    });

    function setProgressBar(currentStep) {
      var percent = parseFloat(100 / steps) * current;
      percent = percent.toFixed();
      $(".progress-bar").css("width", percent + "%");
    }

    $(".submit").click(function () {
      return false;
    });
  });
  return (
    <div class="container">
      <div class="row justify-content-center">
        <div
          class="col-11 col-sm-9 col-md-7
                    col-lg-6 col-xl-5 text-center p-0 mt-3 mb-2"
        >
          <div class="px-0 pt-4 pb-0 mt-3 mb-3">
            <form id="form">
              <ul id="progressbar">
                <li class="active" id="step1">
                  <strong>Step 1</strong>
                </li>
                <li id="step2">
                  <strong>Step 2</strong>
                </li>
                <li id="step3">
                  <strong>Step 3</strong>
                </li>
                <li id="step4">
                  <strong>Step 4</strong>
                </li>
              </ul>
              <div class="progress">
                <div class="progress-bar"></div>
              </div>{" "}
              <br></br>
              <fieldset>
                <h2>Welcome To GFG Step 1</h2>
                <input
                  type="button"
                  name="next-step"
                  class="next-step"
                  value="Next Step"
                />
              </fieldset>
              <fieldset>
                <h2>Welcome To GFG Step 2</h2>
                <input
                  type="button"
                  name="next-step"
                  class="next-step"
                  value="Next Step"
                />
                <input
                  type="button"
                  name="previous-step"
                  class="previous-step"
                  value="Previous Step"
                />
              </fieldset>
              <fieldset>
                <h2>Welcome To GFG Step 3</h2>
                <input
                  type="button"
                  name="next-step"
                  class="next-step"
                  value="Final Step"
                />
                <input
                  type="button"
                  name="previous-step"
                  class="previous-step"
                  value="Previous Step"
                />
              </fieldset>
              <fieldset>
                <div class="finish">
                  <h2 class="text text-center">
                    <strong>FINISHED</strong>
                  </h2>
                </div>
                <input
                  type="button"
                  name="previous-step"
                  class="previous-step"
                  value="Previous Step"
                />
              </fieldset>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
  {
    /* <script src="script.js"></script> */
  }
}
export default ProgressBar;
