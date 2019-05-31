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

const loadTrips = () => {
  // TODO: Wave 1
  // make an axios call to the trips index and display the results

  reportStatus("loading trips...");
  
  let tripsList = $('#trips-list');
  tripsList.empty();
  
  axios.get(URL)
  .then((response) => {
    let responseArr = response.data
    
    reportStatus(`Successfully loaded ${responseArr.length} trips`);
    
    responseArr.forEach(trip => {
      tripsList.append(`<li>${trip.name}</li>`);
    });
  })
  .catch((error) => {
    reportStatus(`Encountered an error while loading wonder: ${error.message}`);
    console.log(error);
  });
}

const showTripDetails = (trip) => {
  // $(this.Attr([id]))
  console.log("showing details for trip", trip);

  // DONT FORGET TO START AT TRIP 70

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