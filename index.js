const URL =  'https://trektravel.herokuapp.com/trips/'

//
// Status Management
//
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


const displayTripsList = (tripsList) => {
  const target = $('#trips-list');
  target.empty();
  tripsList.forEach(trip => {
    target.append(`<li>${trip.name}</li>`);
  });
}

const loadTrips = () => {
  reportStatus("loading trips...");

  axios.get(URL)
  .then((response) => {
    const trips = response.data;
    displayTripsList(trips);

    reportStatus(`Successfully loaded ${trips.length} trips`);
  })
  .catch((error) => {
    reportStatus(`Encountered an error while loading trip: ${error.message}`);
    console.log(error);
  });
}

const showTripDetails = (trip) => {
  // DONT FORGET TO START AT TRIP 70

  // TODO: Wave 2
  // display trip details and the trip reservation form
  
  // // $(this.Attr([id]))
  // reportStatus("showing details for trip", trip.name);

  // let tripDetails = $('#trip-details');
  // tripDetails.empty();

  // axios.get(URL + trip.id)
  // .then((response) => {
    
  //   reportStatus(`Successfully loaded details for ` trip.name);

  //   // Do something

  // })
  // .catch((error) => {
  //   reportStatus(`Encountered an error while loading details for ` trip.name);
  //   console.log(error);
  // });
}

const reserveTrip = (trip) => {
  console.log("reserving trip", trip)

  // TODO: Wave 2
  // reserve a spot on the trip when the form is submitted
}

$(document).ready(() => {
  $('#trips-button').on('click', loadTrips);
});