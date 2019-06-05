const BASE_URL = 'https://trektravel.herokuapp.com/trips';

const displayStatus = (message) => {
  $('#status').html(message);
}

let tripId;

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

const showTripDetails = () => {
  axios.get(`${BASE_URL}/${tripId}`) 
    .then((response) => {
      const trip = response.data;
      displayStatus('Successfully loaded trip');
      console.log(response.data);
      $('#trip-details').empty();
      $('#trip-details').append('<h2>Trip Details</h2>');
      $('#trip-details').append(`<li>Name: ${trip.name}</li>`);
      $('#trip-details').append(`<li>Continent: ${trip.continent}</li>`);
      $('#trip-details').append(`<li>Category: ${trip.category}</li>`);
      $('#trip-details').append(`<li>Cost: ${trip.cost}</li>`);
      $('#trip-details').append(`<li>About: ${trip.about}</li>`);
      $('#trip-details').append(`<form id="trip-form">
        <h1>Reserve a Spot on ${trip.name}</h1>
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
      $('#trip-form').submit(addReservation);

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

  const emailFromForm = $(`#trip-form input[email="email"]`).val();
  parsedFormData['email'] = emailFromForm ? emailFromForm : undefined;
  //when submitting post request, email is showing as undefined!? why?? 
  return parsedFormData;
  
};

const clearForm = () => {
  $(`#trip-form input[name="name"]`).val('');
  $(`#trip-form input[email="email"]`).val('');
}

const addReservation = (event) => {
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
};


$(document).ready(() => {

  $('#load-trips').click(loadTrips);
  $('#trip-list').on('click', 'button', function (event) {
    tripId = event.target.id;
    showTripDetails();
  });
});