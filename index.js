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
    target.append(`<li id="${trip.id}">${trip.name}</a></li>`);

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
    $('#reservation-form').submit(() => reserveTrip(trip))
  })
  .catch((error) => {
    reportStatus(`Encountered an error while loading trip: ${error.message}`);
    console.log(error);
  });
}

// Wave 3
const readFormData = () => {
  const parsedFormData = {};

  // const fields = ['name', 'email'];
  // for (let field in fields) {
  //   const dataFromForm = $(`#reservation-form input[name=${field}]`).val();
  //   parsedFormData[field] = dataFromForm ? dataFromForm : undefined;
  // }
  parsedFormData.name = $("input[name='name']").val();
  parsedFormData.email = $("input[name='email']").val();
  return parsedFormData;
}

const clearForm = () => {
  $(`#pet-form input[name="name"]`).val('');
  $(`#pet-form input[name="email"]`).val('');
}

const reserveTrip = (trip) => {
  event.preventDefault();
  const reservationData = readFormData();

  reportStatus(`Sending reservation data for: ${trip.name}`);

  axios.post(URL + trip.id + '/reservations', reservationData)
  .then((response) => {
    reportStatus(`Successfully added a reservation with ID ${response.data.id}!`);
    clearForm();
  })
  .catch((error) => {
    console.log(error.response);
    if (error.response.data && error.response.data.errors) {
      reportError(
        `Encountered an error: ${error.message}`,
        error.response.data.errors
      );
    } else {
      reportStatus(`Encountered an error: ${error.message}`);
    }
  });
}

$(document).ready(() => {
  $('#trips-button').on('click', loadTrips);
});