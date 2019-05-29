const displayStatus = (message) => {
  $('#status').html(message);
}

const handleApiError = (error) => {
  console.log(error);
  // TODO: politely report this error to the user
}

const loadTrips = () => {
  displayStatus("loading trips...");

  // TODO: Wave 1
  // make an axios call to the trips index and display the results
}

const showTripDetails = (trip) => {
  console.log("showing details for trip", trip);

  // TODO: Wave 2
  // display trip details and the trip reservation form
}

const reserveTrip = (trip) => {
  console.log("reserving trip", trip)

  // TODO: Wave 2
  // reserve a spot on the trip when the form is submitted
}

$(document).ready(() => {
  $('#load-trips').click(loadTrips);
});