const URL =  'https://trektravel.herokuapp.com/trips/'

// Status Management
const reportStatus = (message) => {
  $('#status-message').html(message);
};

const reportError = (message, errors) => {
  let content = `<p>${message}</p><ul>`;
  for (const field in errors) {
    for (const problem of errors[field]) {
      content += `<li>${field}: ${problem}</li>`;
    }
  }
  content += "</ul>";
  reportStatus(content);
};

// Wave 1 - Display
const displayTripsList = (tripsList) => {
  const target = $('#trips-list');
  target.empty();
  tripsList.forEach(trip => {
    target.append(`<li><a href="#" id="${trip.id}">${trip.name}</a></li>`);

    const tripID = $(`#${trip.id}`);
    tripID.click(() => loadTripDetails(trip));
  });
}

// Wave 1 - Load
const loadTrips = () => {
  reportStatus("loading trips...");

  axios.get(URL)
  .then((response) => {
    const trips = response.data;
    displayTripsList(trips);

    reportStatus(`Successfully loaded ${trips.length} trips`);
  })
  .catch((error) => {
    reportStatus(`Encountered an error while loading trips: ${error.message}`);
    console.log(error);
  });
}

// Wave 2 - Display
const displayTripDetails = (trip) => {
  const target = $('#trip-details');
  target.empty();

  target.append(`<h1>Trip Details</h1>`);
  target.append(`<li>ID: ${trip.id}</li>`);
  target.append(`<li>Name: ${trip.name}</li>`);
  target.append(`<li>Continent: ${trip.continent}</li>`);
  target.append(`<li>Category: ${trip.category}</li>`);
  target.append(`<li>Weeks: ${trip.weeks}</li>`);
  target.append(`<li>Cost: $${trip.cost.toFixed(2)}</li>`);
  target.append(`<li>About: ${trip.about}</li>`);
}

// Wave 2 - Load
const loadTripDetails = (trip) => {
  reportStatus(`loading details for trip ${trip.name}`);

  axios.get(URL + trip.id)
  .then((response) => {
    const trip = response.data;
    displayTripDetails(trip);

    reportStatus(`Successfully loaded details for: ${trip.name}`);
  })
  .catch((error) => {
    reportStatus(`Encountered an error while loading trip: ${error.message}`);
    console.log(error);
  });
}

const reserveTrip = (event) => {
  event.preventDefault();
  console.log("reserving trip", trip)
}

$(document).ready(() => {
  $('#trips-button').on('click', loadTrips);
});