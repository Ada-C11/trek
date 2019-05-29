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
        tripList.append(`<li class='trip' id=${trip.id}> Trip ${trip.id} : ${trip.name} </li>`);
      });
    })
    .catch((error) => {
      reportStatus(`Encountered an error while loading trips: ${error.message}`);
      console.log(error);
    });
};

// read into single trip 
const readTrip = (tripID) => {
  reportStatus('Loading trips...');

  const tripAttributes = $('#trip-attributes');
  tripAttributes.empty();

  // compiles url for specific trip
  const tripURL = tripListURL + '/' + tripID;

  // sends GET request to endpoint
  axios.get(tripURL)
    .then((response) => {
      reportStatus(`Successfully loaded Trip ${tripID}`);
      // add header
      tripAttributes.append(`<h1> Trip Details </h1>`);
      // parse through hashy details object

      for (let [detail, value] of Object.entries(response.data)) {
        tripAttributes.append(`<li class='detail'> ${detail}: ${value} </li>`);
      }
      // response.data.forEach((detail) => {
      //   // adds each trip to list 
      //   tripAttributes.append(`<li class='detail'> ${detail} </li>`);
      // });
    })
    .catch((error) => {
      reportStatus(`Encountered an error while loading trips: ${error.message}`);
      console.log(error);
    });
};

// Object.entries documentation 

//
// OK GO!!!!!
//
$(document).ready(() => {
  $('#load').click(loadTrips);
  $('#trip-list').on('click', '.trip', function () {
    readTrip(this.id);
  })

});