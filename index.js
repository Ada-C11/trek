const URL = 'https://trektravel.herokuapp.com/trips/';

const reservationForm = trip => {
  return `<h2>Reserve a Spot on ${trip.name}</h2>
          <form id="reservationForm">
          	<div class="form-group">
          		<label for="name">Name</label>
          		<input type="name" class="form-control" id="name" placeholder="Your name here" required>
          	</div>
          	<div class="form-group">
          		<label for="email">Email</label>
          		<input type="email" class="form-control" id="email" placeholder="you@example.com" required>
          	</div>
          	<button type="submit" class="btn btn-primary">Reserve</button>
          <form>`;
};

const tripSummary = trip => {
  return `<h2>Trip Details</h2>
          <h3>Name:</h3><p>${trip.name}</p>
          <h4>Continent:</h4><p>${trip.continent}</p>
          <h4>Category:</h4><p>${trip.category}</p>
          <h4>Weeks:</h4><p>${trip.weeks}</p>
          <h4>Cost:</h4><p>${trip.cost}</p>
          <h4>About:</h4><p>${trip.about}</p>`;
};

String.prototype.capitalize = function() {
  return this[0].toUpperCase() + this.slice(1, this.length);
};

const confirmation = (tripConfirmation, tripName) => {
  return `<h2>${tripConfirmation.name.capitalize()}, your trip has been booked!</h2>
  <p>Confirmation ID: ${tripConfirmation.id} for Trek to ${tripName}</p>`;
};

const readDataForm = (email, name) => {
  return { email: email, name: name };
};

const reportStatus = message => {
  $('#statusMessage').html(message);
};

const reportApiError = error => {
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
};

const onClick = function(action, listener) {
  listener.click(action);
};

const postReservation = trip => {
  $(`#trekReservation`).append(`<article id="tripReservation">`);
  const reservation = $('#tripReservation');
  reservation.empty();
  reservation.append(reservationForm);
  handleReservation(trip);
};

const handleReservation = trip => {
  const reservation = $('#trekReservation');
  $('form').submit(function(event) {
    event.preventDefault();
    const reservationData = readDataForm(
      event.target[1].value,
      event.target[0].value
    );
    axios
      .post(`${URL + trip.id}/reservations`, reservationData)
      .then(response => {
        reservation.empty();
        reservation.append(confirmation(response.data, trip.name));
      })
      .catch(error => {
        reportApiError(error);
      });
  });
};

const getTrips = () => {
  reportStatus('Loading trips...');
  $(`#trekList`).append(`<ul id="tripList">`);
  const allTrips = $('#tripList');
  allTrips.append(`<h2>All Trips</h2>`);
  axios
    .get(`${URL}`)
    .then(response => {
      reportStatus(`Successfully loaded ${response.data.length} trips`);
      response.data.forEach(trip => {
        allTrips.append(`<li id="${trip.id}">${trip.name}</li>`);
        onClick(getTrip, $(`#${trip.id}`));
      });
    })
    .catch(error => {
      reportStatus(
        `Encountered an error while loading trips: ${error.message}`
      );
    });
};

const getTrip = event => {
  $(`#trekInfo`).append(`<article id="tripInfo">`);
  const info = $('#tripInfo');
  info.empty();
  axios
    .get(`${URL + event.currentTarget.id}`)
    .then(response => {
      const trip = response.data;
      info.append(tripSummary(trip));
      postReservation(trip);
    })
    .catch(error => {
      reportStatus(`Encountered an error while loading trip: ${error.message}`);
    });
};

$(document).ready(() => {
  onClick(getTrips, $('#tripBtn'));
});
