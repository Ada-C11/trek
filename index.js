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
  $(".card").show();
  const target = $('#trip-list');
  target.empty();
  tripList.forEach((trip) => {
    target.append(`<a href="#" id="${trip.id}" class="list-group-item list-group-item-action">${trip.name}</a>`);
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
      const resHeader = $('#reservation-header')
      resHeader.text(`Reserve a Spot on ${tripInfo.name}`)
      const target = $('#reservation-form');
      target.removeClass('d-none');
      $('#reservation-card').removeClass('d-none');
      resHeader.removeClass('d-none');
      target.submit(reserve)
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
  target.removeClass('d-none');
  target.append(`<h2 class="card-header mb-2">Trip Details</h2>`)
  target.append(`<span class="font-weight-bold m-3">Name:</span> ${tripInfo.name}<br>`);
  target.append(`<span class="font-weight-bold m-3">ID:</span> ${tripInfo.id}<br>`);
  target.append(`<span class="font-weight-bold m-3">Continent:</span> ${tripInfo.continent}<br>`);
  target.append(`<span class="font-weight-bold m-3">Category:</span> ${tripInfo.category}<br>`);
  target.append(`<span class="font-weight-bold m-3">Weeks:</span> ${tripInfo.weeks}<br>`);
  target.append(`<span class="font-weight-bold m-3">Cost:</span> $${tripInfo.cost}<br>`);
  target.append(`<div class="font-weight-bold ml-3">About:</div><div id="about-text">${tripInfo.about}</div><br>`);
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
          `Encountered an error with this reservation: ${error.message}`, error.response.data.errors
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