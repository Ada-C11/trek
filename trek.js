// one last test!
let currentTripId = null

const TRIPS_URL = 'https://trektravel.herokuapp.com/trips';

const reportStatus = (message) => {
  $('#status-message').html(message);
};

const reportApiError = (error) => {
  console.log('encountered error when posting', error);

  let errorHtml = `<p>${error.message}</p><ul>`;

  const fieldProblems = error.response.data.errors;

  Object.keys(fieldProblems).forEach(field => {
    const problems = fieldProblems[field];
    problems.forEach(problem => {
      errorHtml += `<li><strong>${field}:</strong> ${problem}</li>`;
    });
  });

  errorHtml += '</ul>';
  reportStatus(errorHtml);
}

const loadTripData = (id) => {
  return function () {
    reportStatus(`Loading trip ${id}...`);

    currentTripId = id;

    const tripInfo = $('#trip-info');
    tripInfo.empty();


    axios.get(TRIPS_URL + `/${id}`)
      .then((response) => {
        reportStatus(`Successfully loaded ${response.data.name} trip`);
        const trip = response.data

        tripInfo.html(`
          <h3>Name: ${trip.name}</h3>
          <h4>Continent: ${trip.continent}</h4>
          <h4>Category: ${trip.category}</h4>
          <h4>Weeks: ${trip.weeks}</h4>
          <h4>Cost: $${trip.cost}</h4>
          <h4>About:</h4>
          <p>${trip.about}</p>
        `);

        $('#reserve-a-spot-on').html(`Reserve a spot on the ${trip.name} trip`)

        $('#right-side').addClass('visible')

      })
      .catch((error) => {
        reportStatus(`Encountered an error while loading trips: ${error.message}`);
        console.log(error);
      });
  }
}

const loadTrips = () => {
  reportStatus('Loading trips...');

  const tripList = $('#trip-list');
  tripList.empty();

  axios.get(TRIPS_URL)
    .then((response) => {
      reportStatus(`Successfully loaded ${response.data.length} trips`);
      response.data.forEach((trip) => {
        const name = trip.name
        const id = trip.id

        tripList.append(`
          <button id="trip-${id}" class="btn w-100">
            ${name}
          </button>
        `);

        $(`#trip-${id}`).click(loadTripData(id));
      });

    })
    .catch((error) => {
      reportStatus(`Encountered an error while loading trips: ${error.message}`);
      console.log(error);
    });

  $('#left-side').addClass('visible')
};

const readTripForm = () => {
  return {
    name: $('#name').val(),
    email: $('#email').val()
  };
}

const reserveTrip = () => {
  const tripData = readTripForm();

  reportStatus('About to post trip data...');
  console.log('About to post trip data', tripData);

  axios.post(`https://trektravel.herokuapp.com/trips/${currentTripId}/reservations`, tripData)
    .then((response) => {
      console.log('successfully posted trip data', response);

      const tripId = response.data.id;
      reportStatus(`Successfully created a new trip with ID ${tripId}`);
    })
    .catch((error) => {
      reportApiError(error);
    })

  $('#name').val(''),
    $('#email').val('')
};

$(document).ready(() => {


  $('#load').click(loadTrips);

  $('#trip-form').submit((event) => {
    event.preventDefault();
    reserveTrip();
  });
});