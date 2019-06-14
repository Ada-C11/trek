const ALL_TRIPS = 'https://trektravel.herokuapp.com/trips';


// ~~~~~~~~ERROR & STATUS REPORTING~~~~~~~~
const reportStatus = (message) => {
  const statusContainer = $('#status-message');
  statusContainer.empty();
  statusContainer.append(`<p>${message}</p>`);
}

const reportError = (message, errors) => {
  let content = `<p>${message}</p><ul>`;
  for (const field in errors) {
    for (const problem of errors[field]) {
      content += `<li>${field}: ${problem}</li>`;
    }
  }
  content += '</ul>';
  reportStatus(content);
};

// ~~~~~~~~LOAD ALL TRIPS (got from Ada Pets)~~~~~~~~
const loadTrips = () => {
  reportStatus('Loading trips...');

  const tripList = $('#trips-list');
  tripList.empty();

  axios.get(ALL_TRIPS)
    .then((response) => {
      reportStatus(`Successfully loaded ${response.data.length} trips`);


      response.data.forEach((trip) => {
        tripList.append(`<li class='${trip.id}'> ${trip.name}</li>`);
      })
    })
    .catch((error) => {
      reportStatus(`Encountered an error while loading trips: ${error.message}`);

      console.log(error);
    });
}

//~~~~~~~~TRIP DETAILS~~~~~~~~
const tripDetails = (id) => {
  reportStatus('Loading trip details...');

  const tripInfo = $('#trip-info');
  tripInfo.empty();

  axios.get(ALL_TRIPS + '/' + id)
    .then((response) => {
      reportStatus(`Successfully loaded details about ${id}.`);

      $('#trip-id').text(id);
      let trip = response.data;
      
      tripInfo.append(`<h3>Name: ${trip.name}</h3>`);
      tripInfo.append(`<p><strong>Continent: </strong>${trip.continent}</p>`);
      tripInfo.append(`<p><strong>Category: </strong>${trip.category}</p>`);
      tripInfo.append(`<p><strong>Weeks: </strong>${trip.weeks}</p>`);
      tripInfo.append(`<p><strong>Cost: </strong>$${trip.cost}</p>`);
      tripInfo.append(`<p><strong>About:</strong> ${trip.about}</p>`);
    })
    .catch((error) => {
      reportStatus(`Encountered an error while loading trip: ${error.message}`);
      console.log(error);
    });
}

//~~~~~~~~TRIP RESERVATION (Ada Pets)~~~~~~~~

//~~~~~~~~Form Data~~~~~~~~
const readFormData = () => {
  const parsedFormData = {};

  const nameFromForm = $(`#reservation-form input[name="name"]`).val();
  parsedFormData['name'] = nameFromForm ? nameFromForm : undefined;

  const emailFromForm = $(`#reservation-form input[name="email"]`).val();
  parsedFormData['email'] = emailFromForm ? emailFromForm : undefined;

  return parsedFormData;
};

//~~~~~~~~Clear Form~~~~~~~~
const clearForm = () => {
  $(`#reservation-form input[name="name]`).val('');
  $(`#reservation-form input[name="email]`).val('');
}

//~~~~~~~~Reserve Trip~~~~~~~~
const reserveTrip = (event) => {
  event.preventDefault();

  const tripData = readFormData();
  console.log(tripData);

  reportStatus('Sending trip data...');

  let tripId = $('#trip-id').text();
  console.log(tripId);

  const RESERVATION_URL = ALL_TRIPS + '/' + tripId + '/reservations';

  axios.post(RESERVATION_URL, tripData)
    .then((response) => {
      reportStatus(`Successfully reserved trip with ID ${response.data.id}!`)
      clearForm();
    })
    .catch((error) => {
      console.log(error.response);
      if (error.response.data && error.response.data.errors) {
        reportError(`Encountered an error: ${error.message}`, error.response.data.errors);
      } else {
        reportStatus(`Encountered an error: ${error.message}`);
      }
    });
};

//~~~~~~~~Ready Document~~~~~~~~
$(document).ready(() => {
  $('#load-trips').on('click', function () {
    loadTrips();
    $('#trips').show();
  });
  // load details about specific trip
  $('ul').on('click', 'li', function () {
    let tripId = this.className;
    tripDetails(tripId);
    $('#trip-details').show();
    $('#reservation').show();
  });
  $('#reservation-form').submit(reserveTrip);
});