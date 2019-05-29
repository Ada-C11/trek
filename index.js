const tripListURL = 'https://trektravel.herokuapp.com/trips';

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

//
// Loading Trips
//
const loadTrips = () => {
  reportStatus('Loading trips...');

  const tripList = $('#trip-list');
  tripList.empty();

  // sends GET request to endpoint
  axios.get(tripListURL)
    .then((response) => {
      reportStatus(`Successfully loaded ${response.data.length} trips`);
      // parses through each response 
      response.data.forEach((trip) => {
        // adds each trip to list 
        tripList.append(`<li> Trip ${trip.id} : ${trip.name} </li>`);
      });
    })
    .catch((error) => {
      reportStatus(`Encountered an error while loading trips: ${error.message}`);
      console.log(error);
    });
};

// 

//
// OK GO!!!!!
//
$(document).ready(() => {
  $('#load').click(loadTrips);
});