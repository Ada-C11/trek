const baseURL = "https://trektravel.herokuapp.com/trips";
const axios = require('axios')

const displayStatus = (message) => {
  $('#status').html(message);
}

const handleApiError = (error) => {
  console.log(error);
  // TODO: politely report this error to the user
}

const loadTrips = () => {
  displayStatus("loading trips...");

  const tripList = $('#trip-list');
  tripList.empty();

  axios.get(baseURL)
    .then((response) => {
      displayStatus(`Successfully loaded ${response.data.length} trips`);
      response.data.forEach((trip) => {
        tripList.append(`<li><a href="#" data-trip-id=${trip.id}> ${trip.name}</a></li>`);
      });
      $(`#trip-list li`).on('click', showTripDetails);
    });
}

const displayTripDetails = (tripDetails) => {
  const target = $('#trip-details');
  target.empty();
  Object.keys(tripDetails).forEach(function (detail) {
    target.append(`<li><strong>${detail}:</strong> ${tripDetails[detail]}</li>`);
  });
}


const showTripDetails = (event) => {
  event.preventDefault();

  console.log("showing details for trip", $(event.target).html());
  const byIdUrl = (baseURL + '/' + `${$(event.target).data("trip-id")}`);

  axios.get(byIdUrl)
    .then((response) => {
      displayTripDetails(response.data);
    });
};

const readFormData = () => {
  const parsedFormData = {};

  const nameFromForm = $(`#reserve-trip-form input[name="name"]`).val();
  parsedFormData['name'] = nameFromForm ? nameFromForm : undefined;

  const emailFromForm = $(`#reserve-trip-form input[name="email"]`).val();
  parsedFormData['email'] = emailFromForm ? emailFromForm : undefined;
}

const reserveTrip = (trip) => {
  console.log("reserving trip", trip)

  // TODO: Wave 2
  // reserve a spot on the trip when the form is submitted
}

$(document).ready(() => {
  $('#load-trips').click(loadTrips);
});
