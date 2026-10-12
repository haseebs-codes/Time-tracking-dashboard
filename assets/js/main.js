//? Load the data from data.json
async function loadActivities() {
  const response = await fetch("./data.json");
  const data = await response.json();

  //? Inject the data into the function to use it
  renderActivityGrid(data);


  const filterBtns = document.querySelectorAll('.js-filter-btn');
  filterBtns.forEach((button) => {
    button.addEventListener('click', () => {
      //? Get the active button & remove active
      const activeBtn = document.querySelector('.js-filter-btn.active');
      activeBtn.classList.remove('active');
      activeBtn.setAttribute('aria-pressed', false);

      //? Add it when its clicked
      button.classList.add('active');
      button.setAttribute('aria-pressed', true);

      //? Get the button thats selected
      const dataFilter = button.dataset.filter;

      //? Remove active class & aria-pressed from all of the buttons
      //? using inner forEach loop.
      /* filterBtns.forEach((filterBtn) => {
        filterBtn.classList.remove('active');
        filterBtn.setAttribute('aria-pressed', false);
      }); */

      //? Pass the button thats selected to the function
      renderActivityGrid(data, dataFilter);
    });
  });
}

loadActivities();

//? Give the dataFilter a default value
function renderActivityGrid(activities, dataFilter = "weekly") {

  let activityCardHTML = "";
  const timePeriods = {
    "daily": 'Yesterday',
    "weekly": 'Last Week',
    "monthly": 'Last Month'
  }
  //? Generate the cards using variables and placeholders
  activities.forEach((activity) => {
    const cardTitles = activity.title.toLowerCase();
    const cardModifiers = cardTitles.replace(' ', '-');
    const currentHours = activity.timeframes[dataFilter]["current"];
    const previousHours = activity.timeframes[dataFilter]["previous"];

    activityCardHTML += `
      <div class="filter-card filter-card--${cardModifiers}">
        <div class="filter-card__inner">
          <p class="filter-card__inner--title">${activity.title}</p>
          <h2 class="filter-card__inner--hrs">${currentHours}hrs</h2>
          <button aria-pressed="false" class="filter-card__inner--btn">
            <svg width="21" height="5" xmlns="http://www.w3.org/2000/svg">
              <path
              d="M2.5 0a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5Zm8 0a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5Zm8 0a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5Z"
              fill-rule="evenodd" />
            </svg>
          </button>
          <p class="filter-card__inner--pre">${timePeriods[dataFilter]} - ${previousHours}hrs</p>
        </div>
      </div>
    `;
  });

  document.querySelector('.js-filter-grid').innerHTML = activityCardHTML;
}
