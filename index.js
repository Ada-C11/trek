const URL = 'https://trektravel.herokuapp.com/trips';

function reportStatus(message) {
  $('#status-message').html(message);
}

let trips = {};

function loadTrips() {
  reportStatus('Loading trips...');

  const tripList = $('#trip-list');
  tripList.empty();

  axios.get(URL)
    .then((response) => {
      reportStatus(`Successfully loaded ${response.data.length} trips`);
      response.data.forEach((trip) => {
        const listItem = $(`<li>${trip.name}</li>`).appendTo(tripList);
        listItem.click(() => {
          clickTrip(trip.name);
        })
        trips[trip.name] = trip;
      });
    })
    .catch((error) => {
      reportStatus(`Encountered an error while loading trips: ${error.message}`);
      console.log(error);
    });
}

function clickTrip(tripName) {
  const trip = trips[tripName];
  const details = $('#details');
  details.show();
  details.empty();
  details.append(`<p><b>Name</b>: ${trip.name}</p>`);
  details.append(`<p>Continent: ${trip.continent}</p>`);
  details.append(`<p>Category: ${trip.category}</p>`);
  details.append(`<p>Weeks: ${trip.weeks}</p>`);
  details.append(`<p>Cost: $${trip.cost}</p>`);
  details.append(`<p>About:</p>`);
  details.append(`<p>This is the trip of your dreams!</p>`);

  const form = $('#registration');
  form.show();
  $('#registration-submit').click((event) => {
    reserveTrip(event, trip.id);
  });
}

// function createTrip(event) {
//   event.preventDefault();

//   reportStatus('Sending trip data...');

//   axios.post(URL, tripData)
//     .then((response) => {
//       reportStatus(`Successfully added a trip with ID ${response.data.id}!`);
//       clearForm();
//     })
//     .catch((error) => {
//       console.log(error.response);
//       reportStatus(`Encountered an error while loading trips: ${error.message}`)
//     });
// }

function reserveTrip(event, tripId) {
  //prevents page from reloading
  event.preventDefault();
  //https://developer.mozilla.org/en-US/docs/Web/API/FormData
  const reservationData = new FormData($('#registration')[0]);

  reportStatus('Reserving trip...');
  const URL = `https://trektravel.herokuapp.com/trips/${tripId}/reservations`;

  axios.post(URL, reservationData)
  .then((response) => {
    reportStatus(`Successfully reserved a trip with ID ${response.data.id}!`);
  })
  .catch((error) => {
    console.log(error.response);
    reportStatus(`Encountered an error while reserving trips: ${error.message}`)
  });
}

$(document).ready(() => {
  $('#load').click(loadTrips);
  // $('#trip-form').submit(createTrip);
});