const reservationForm = `<form id="reservationForm">
														<div class="form-group">
															<label for="name">Name</label>
															<input type="name" class="form-control" id="name" placeholder="Your name here">
														</div>
														<div class="form-group">
															<label for="email">Email</label>
															<input type="email" class="form-control" id="email" placeholder="you@example.com">
														</div>
												<form>`;

const onClick = function(action, listener) {
  listener.click(event => {
    action(event);
    console.log();
  });
};

const postReservation = trip => {
  $(`#trekReservation`).append(`<article id="tripReservation">`);
  const reservation = $('#tripReservation');
  reservation.empty();
  reservation.append(`<h2>Reserve a Spot on ${trip.name}</h2>`);
  reservation.append(reservationForm);
};

const getTrip = event => {
  $(`#trekInfo`).append(`<article id="tripInfo">`);
  const info = $('#tripInfo');
  info.empty();
  info.append(`<h2>Trip Details</h2>`);
  axios
    .get(`https://trektravel.herokuapp.com/trips/${event.currentTarget.id}`)
    .then(response => {
      const trip = response.data;
      info.append(`<h3>Name:</h3><p>${trip.name}</p>`);
      info.append(`<h4>Continent:</h4><p>${trip.continent}</p>`);
      info.append(`<h4>Category:</h4><p>${trip.category}</p>`);
      info.append(`<h4>Weeks:</h4><p>${trip.weeks}</p>`);
      info.append(`<h4>Cost:</h4><p>${trip.cost}</p>`);
      info.append(`<h4>About:</h4><p>${trip.about}</p>`);
      postReservation(trip);
    })
    .catch(() => {});
};

const getTrips = () => {
  $(`#trekList`).append(`<ul id="tripList">`);
  const allTrips = $('#tripList');
  allTrips.append(`<h2>All Trips</h2>`);
  axios
    .get('https://trektravel.herokuapp.com/trips')
    .then(response => {
      response.data.forEach(trip => {
        allTrips.append(`<li id="${trip.id}">${trip.name}</li>`);
        onClick(getTrip, $(`#${trip.id}`));
      });
    })
    .catch(error => {});
};

// const getTrip(trip)
$(document).ready(() => {
  onClick(getTrips, $('#tripBtn'));
});
