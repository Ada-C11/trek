const BASE_URL = 'https://trektravel.herokuapp.com/trips';

const displayStatus = (message) => {
  $('#status').html(message);
}

let tripId;

const handleApiError = (error) => {
  console.log('Error:', error);
  // TODO: politely report this error to the user
}


const loadTrips = () => {
  displayStatus("Loading trips...");

  axios.get(BASE_URL)
    .then((response) => {
      const trips = response.data;
      displayStatus(`Successfully loaded ${trips.length} trips`);
      trips.forEach((trip) => {

        $('#trip-list').append(`<li><button id=${trip.id}>${trip.id}: ${trip.name}</button></li>`);
      });
    })
    .catch((error) => {
      displayStatus(`Encountered an error while loading tips: ${error.message}`);
      // console.log('The error was this:', error);
    });
}

const showTripDetails = () => {
  // console.log('Im in the request!');
  // console.log(`the value of id currently is`);
  // console.log(`the value of id is`, tripId())
  axios.get(`${BASE_URL}/${tripId}`) //need to get access to trip id at this time 

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

        <input type="submit" name="submit" value="Submit" />
      </form>`)

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

  return parsedFormData;
};

const clearForm = () => {
  $(`#trip-form input[name="name"]`).val('');
  $(`#trip-form input[email="email"]`).val('');
}

const createReservation = () => {
  // console.log("reserving", trip)

  // event.preventDefault();

  const reservationData = readFormData();
  console.log("reservation data is", reservationData);
  // console.log(`tripIDs`, tripId);

  // displayStatus('Sending reservation data...');

  axios.post(BASE_URL + '/' + tripId +'/reservations', reservationData)
    .then((response) => {
      console.log('posted res data', response);
      const resId = response.data.id
      displayStatus(`Successfully created a reservation with id of ${resId}`);
      clearForm();
    })
    .catch((error) => {
      console.log(error.response);
      if (error.response.data && error.response.data.errors) {
        // reportError(
        //   `Encountered an error: ${error.message}`,
        //   error.response.data.errors
        // );
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
  $('#trip-form').submit((event) => {
    event.preventDefault();
    createReservation();
  });
});