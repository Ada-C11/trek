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
      tripList.append('<h1> All Trips </h1>')
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
        tripAttributes.append(`<li class='detail'> ${detail.charAt(0).toUpperCase() + detail.slice(1)}: ${value} </li>`);
      }

    })
    .catch((error) => {
      reportStatus(`Encountered an error while loading trips: ${error.message}`);
      console.log(error);
    });
};

const tripForm = (tripID) => {
  reportStatus('Loading trip form');

  const tripFormContainer = $('#trip-form-container');
  tripFormContainer.empty();

  const tripURL = tripListURL + '/' + tripID;


  const form = `<form id='trip-form' class=${tripID}>
    <div class="name-sec">
      <label for="name">Name</label>
      <input type="name" id="name">
    </div>
    <div class="email-sec">
      <label for="email">Email</label>
      <input type="email" id="email">
    </div>
    <button type="submit">Make reservation</button>
  <form>`;

  // sends GET request to endpoint
  axios.get(tripURL)
    .then((response) => {
      reportStatus(`Successfully loaded Trip Form ${tripID}`);
      // add header
      tripFormContainer.append(`<h1> Reserve This Trip </h1>` + form);

    })
    .catch((error) => {
      reportStatus(`Encountered an error while loading trips: ${error.message}`);
      console.log(error);
    });
};


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


const makeReservation = (tripID) => {
  const tripURL = tripListURL + '/' + tripID;

  event.preventDefault();

  const tripData = readFormData();
  console.log(tripData);

  reportStatus('Sending trip data...');

  axios.post(tripURL, tripData)
    .then((response) => {
      reportStatus(`Successfully added a trip with ID ${tripID}!`);
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


//
// OK GO!!!!!
//
$(document).ready(() => {
  $('#load').click(loadTrips);
  $('#trip-list').on('click', '.trip', function () {
    readTrip(this.id);
    tripForm(this.id)
  });
  $('#tripForm').on('submit', 'button', function () {
    makeReservation(this.class)
  });
});




