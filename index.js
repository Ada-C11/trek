const URL = 'https://trektravel.herokuapp.com/trips';

const reportStatus = (message) => {
  $('#status-message').html(message);
};

const reportError = (message, errors) => {
  let content = `<p>${message}</p>`
  content += "<ul>";
  for (const field in errors) {
    for (const problem of errors[field]) {
      content += `<li>${field}: ${problem}</li>`;
    }
  }
  content += "</ul>";
  reportStatus(content);
};

const loadTrips = () => {
  reportStatus('Loading trips...');
  
  axios.get(URL)
    .then((response) => {
      reportStatus(`Successfully loaded ${response.data.length} trips`);
      const trips = response.data;
      displayTripList(trips);
    })
    .catch((error) => {
      reportStatus(`Encountered an error while loading trips: ${error.message}`);
      console.log(error);
    });
};

const displayTripList = (tripList) => {
  const target = $('#trip-list');
  target.empty();
  tripList.forEach((trip) => {
    target.append(`<li id="${trip.id}">${trip.name}</li>`);
    const getDetails = showTripDetails(trip)
    $(`#${trip.id}`).click(getDetails);
  });
}

const showTripDetails = (trip) => {
  console.log("showing details for trip", trip.name);

  const getTripDetails = () => {
    axios.get(URL + '/' + trip.id)
    .then((response) => {
      const tripInfo = response.data;
      reportStatus(`Successfully loaded trip ${tripInfo.name}`);
      displayTripDetails(tripInfo)
      const reserve = reserveTrip(trip)
      $('#reservation-form').submit(reserve)
    })
    .catch((error) => {
      reportStatus(`Encountered an error while loading trip: ${error.message}`);
      console.log(error);
    });
  }
  return getTripDetails;
}

const displayTripDetails = (tripInfo) => {
  const target = $('#trip-details');
  target.empty();
  target.append(`<h2>Trip Details</h2>`)
  target.append(`<li>ID: ${tripInfo.id}</li>`);
  target.append(`<li>Name: ${tripInfo.name}</li>`);
  target.append(`<li>Continent: ${tripInfo.continent}</li>`);
  target.append(`<li>About: ${tripInfo.about}</li>`);
  target.append(`<li>Category: ${tripInfo.category}</li>`);
  target.append(`<li>Weeks: ${tripInfo.weeks}</li>`);
  target.append(`<li>Cost: ${tripInfo.cost}</li>`);
  const target2 = $('#reservation-form');
  target2.before(`<h2>Reserve a Spot on ${tripInfo.name}</h2>`)
  target2.show();
}

const readFormData = () => {
  const userFormData = {};
  userFormData.name = $("input[name='name']").val();
  userFormData.email = $("input[name='email']").val();
  return userFormData;
}

const clearForm = () => {
  $(`input[name="name"]`).val('');
  $(`input[name="email"]`).val('');
}

const reserveTrip = (trip) => {
  console.log("reserving trip", trip.name)

  const submitReservation = () => {
    event.preventDefault();
    const reservationData = readFormData();
    reportStatus('Sending reservation data...');
    axios.post(URL + '/' + trip.id + '/reservations', reservationData)
    .then(() => {
      reportStatus(`Successfully submitted reservation`);
      clearForm();
    })
    .catch((error) => {
      console.log(error.response);
      if (error.response.data && error.response.data.errors) {
        reportError(
          `Encountered an error: ${error.message}`, error.response.data.errors
        );
      } else {
        reportStatus(`Encountered an error reservering this trip: ${error.message}`);
      }
    });
  }
  return submitReservation;
}

$(document).ready(() => {
  $('#load').click(loadTrips);
});