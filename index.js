const BASE_URL = 'https://trektravel.herokuapp.com/trips';

const displayStatus = (message) => {
  $('#status').html(message);
}

const reportError = (message, errors) => {
  let content = `<p>${message}</p><ul>`;
  for (const field in errors) {
    for (const problem of errors[field]) {
      content += `<li>${field}: ${problem}</li>`;
    }
  }
  content += "</ul>";
  displayStatus(content);
};

const loadTrips = () => {
  displayStatus("Loading trips...");

  axios.get(BASE_URL)
    .then((response) => {
      const trips = response.data;
      displayStatus(`Successfully loaded ${trips.length} trips`);
      trips.forEach((trip) => {

        $('#trip-list').append(`<li><button type="button" class="btn btn-primary" id=${trip.id}>${trip.id}: ${trip.name}</button></li>`);
      });
    })
    .catch((error) => {
      displayStatus(`Encountered an error while loading tips: ${error.message}`);
    });
}

const buildSubmitHandler = (tripId) => {

  const handleSubmit = (event) => {

    event.preventDefault();
    const reservationData = readFormData();

    displayStatus('Reserving trip...');
    console.log('reservationdata is', reservationData)

    axios.post(`${BASE_URL}/${tripId}/reservations`, reservationData)
      .then((response) => {
        console.log('posted res data', response);
        displayStatus(`Successfully created a reservation with ID:${response.data.id}`);
        clearForm();
      })
      .catch((error) => {
        console.log(error.response);
        if (error.response.data && error.response.data.errors) {
          reportError(
            `Encountered an error: ${error.message}`,
            error.response.data.errors
          );
          console.log(error)
        } else {
          displayStatus(`Encountered an error: ${error.message}`);
        }
      });
  }
  return handleSubmit;
}

const showTripDetails = (tripId) => {
  axios.get(`${BASE_URL}/${tripId}`)
    .then((response) => {
      const trip = response.data;
      displayStatus('Successfully loaded trip');
      $('#trip-details').empty();
      $('#trip-details').append('<h2><strong> Trip Details </strong></h2>');
      $('#trip-details').append(`<li><strong> Name: </strong> ${trip.name}</li>`);
      $('#trip-details').append(`<li><strong> Continent: </strong> ${trip.continent}</li>`);
      $('#trip-details').append(`<li><strong> Category: </strong> ${trip.category}</li>`);
      $('#trip-details').append(`<li><strong> Cost: </strong> $${trip.cost}</li>`);
      $('#trip-details').append(`<li><strong> About: </strong> ${trip.about}</li>`);
      $('#trip-details').append(`<form id="trip-form">
        <h2><strong> Reserve a Spot on ${trip.name} </strong></h2>
        <div>
          <label for="name">Name</label>
          <input type="text" name="name" />
        </div>
        <div>
          <label for="email">Email</label>
          <input type="text" name="email" />
        </div>

        <input type="submit" name="trip-form" value="Submit Reservation" />
      </form>`)
      $('#trip-form').submit(buildSubmitHandler(trip.id));

    })
    .catch((error) => {
      displayStatus(`Encountered an error while loading trip: ${error.message}`);
      console.log('The error was this:', error);
    });
}

const readFormData = () => {
  const parsedFormData = {};

  const nameFromForm = $(`#trip-form input[name="name"]`).val();
  parsedFormData['name'] = nameFromForm ? nameFromForm : undefined;

  const emailFromForm = $(`#trip-form input[name="email"]`).val();
  parsedFormData['email'] = emailFromForm ? emailFromForm : undefined;

  return parsedFormData;
};

const clearForm = () => {
  $(`#trip-form input[name="name"]`).val('');
  $(`#trip-form input[name="email"]`).val('');
}

$(document).ready(() => {
  $('#load-trips').click(loadTrips);
  $('#trip-list').on('click', 'button', function (event) {
    const tripId = event.target.id;
    showTripDetails(tripId);
  });
});