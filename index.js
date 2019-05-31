// const URL = 'https://trektravel.herokuapp.com';
axios.defaults.baseURL = 'https://trektravel.herokuapp.com';
//
// Status Management
//
const reportStatus = (message) => {
  $('#status-message').html(message);
  $('#status-message').addClass('alert alert-secondary');
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


//
// Loading Trips
//
const loadTrips = () => {
  reportStatus('Loading trips...');

  const tripList = $('#trip-list');
  tripList.empty();

  axios.get('/trips')
    .then((response) => {
      reportStatus(`Successfully loaded ${response.data.length} trips`);
      response.data.forEach((trip) => {
        // tripList.append(`<li><a href='${trip.id}'>${trip.name}</a></li>`);
        // const listItem = $(`<li data-trip-id='${trip.id}'>${trip.name}</li>`);
        const listItem = $(`<li>${trip.name}</li>`);
        tripList.append(listItem);
        listItem.click(showTripDetails(trip.id));
      });
      // $('#trip-list li').click(loadTripDetails);
    })
    .catch((error) => {
      reportStatus(`Encountered an error while loading trips: ${error.message}`);
      console.log(error);
    });
};

//Load Trip Details
const showTripDetails = (tripId) => {
  const loadTripDetails = (e) => {
    reportStatus('Loading trip details...');
    $('.details').removeClass('hidden')
    
    const tripDetail = $('#trip-detail');
    tripDetail.empty();

    // const tripId = $(e.target).data('trip-id');
    // $("#reservation-form").attr('data-trip-id', tripId)
    
    axios.get(`trips/${tripId}`)
    
    .then((response) => {
      console.log(response);
      let trip = response.data
      reportStatus(`Successfully loaded ${trip.name} details`);   
        tripDetail.append(`<li><span> Name:</span> ${trip.name}</li>`);
        tripDetail.append(`<li><span> Continet:</span> ${trip.continent}</li>`);
        tripDetail.append(`<li><span> Category:</span> ${trip.category}</li>`);
        tripDetail.append(`<li><span> Weeks:</span> ${trip.weeks}</li>`);
        tripDetail.append(`<li><span> Cost:</span> $${trip.cost}</li>`);
        tripDetail.append(`<li><span> About:</span> ${trip.about}</li>`);

      const reserve = reservationHandler(tripId);
      $('#reservation-form').submit(reserve);
    })
    .catch((error) => {
      reportStatus(`Encountered an error while loading trips: ${error.message}`);
      console.log(error);
    });
  };

  return loadTripDetails;
};

//
// Creating a reservation
//
const readFormData = () => {
  const parsedFormData = {};

  const nameFromForm = $(`#reservation-form input[name="name"]`).val();
  parsedFormData['name'] = nameFromForm ? nameFromForm : undefined;

  const emailFromForm = $(`#reservation-form input[name="email"]`).val();
  parsedFormData['email'] = emailFromForm ? emailFromForm : undefined;

  return parsedFormData;
};

const clearForm = () => {
  $(`#reservation-form input[name="name"]`).val('');
  $(`#reservation-form input[name="email"]`).val('');
}

const reservationHandler = (tripId) => {

  const reserveTrip = (e) => {
    e.preventDefault();

    const tripData = readFormData();
    console.log(tripData);

    reportStatus('Sending pet data...');

    // axios.post(`trips/${$(e.target).data('trip-id')}/reservations`, tripData)
    axios.post(`trips/${tripId}/reservations`, tripData)
      .then((response) => {
        reportStatus(`Successfully created a reservation with ID ${response.data.id}!`);
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
  };
  return reserveTrip;

};


$(document).ready(() => {
  $('#load').click(loadTrips);
  // $('#trip-list li').click(loadTripDetails);
  // $('#reservation-form').submit(reserveTrip);
});