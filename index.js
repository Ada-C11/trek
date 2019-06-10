const TRIPSURL = 'https://trektravel.herokuapp.com/trips/'


// error handling from panopto video

const reportStatus = (message) => {
  $('#status-message').html(message);
};

const reportError = (message, errors) => {
  let info = `<p>${message}</p><ul>`;
  for (const field in errors) {
    for (const problem of errors[field]) {
     content += `<li>${field}: ${problem}</li>`;
    }
  }
  content += "</ul>"
  reportStatus(info);
};

// Gets All Trips - from Ada Pets  
const loadTrips = () => {
  reportStatus('Loading trips...');

  const tripList = $('#trip-list');
  tripList.empty();
  
  
  axios.get(TRIPSURL)
    .then((response) => {
      let listOfTrips = response.data

      reportStatus(`Successfully loaded ${listOfTrips.length} trips`);
      console.log('Loading trips works!');
      //loops through response to print the trip name
      listOfTrips.forEach((trip) => {
        let currentTrip = $(`<li>${trip.name}</li>`);
        currentTrip.addClass(`${trip.id}`);
        tripList.append(currentTrip);
      })
    })
  .catch((error) => {
    reportStatus(`Error while loading trips: ${error.message}`);
    console.log(error);
  })
};
// Trip Details 
const detailsTrips = (event) => {
  let tripID = event.target.className;
  let tripDetailsURL = `https://trektravel.herokuapp.com/trips/${tripID}`;
  reportStatus("Loading details...");

   const tripDetails = $("#details");
   tripDetails.empty();

   axios.get(tripDetailsURL)
    .then((response) => {
      reportStatus(`Successfully loaded trip for ${response.data.name}`);
      console.log('Succefully loaded trip!');

      tripDetails.html(
        `<h2>${response.data.name} in ${response.data.continent}</h2>
        <h3>Cost: $${response.data.cost}</h3>
        <h3>Category: ${response.data.category}</h3>
        <h3>Weeks: ${response.data.weeks}</h3>
        <h3>About:</h3><p>${response.data.about}</p>`
      )
    })

    .catch((error) => {
      reportStatus(
        `Encountered an error while loading trips: ${tripID}: ${error.message}`
      );
      console.log(error);
    });
};

// Make a reservation 
 
const readFormData = () => {
    let parsedData = {};

    parsedData.name = $("input[name='name']").val();
    parsedData.email = $("input[name='email']").val();

    return parsedData;
  };

const clearForm = () => {
  $('#trip-form input[name="name"]').val('');
  $('#trip-form input[name="email"]').val('');
}

const reservation = (event) => {
  
  event.preventDefault();
  console.log('this works')

  // const testData = readTripForm();
  const tripID = event.target.className;
  let createTripURL = `https://trektravel.herokuapp.com/trips/${tripID}/reservations`
  let tripData = readFormData();
  reportStatus('Sending trip data...');
  
  console.log("About to post trip data", tripData)

  axios.post(createTripURL, tripData)
    .then((response) => {
      console.log(response);
      reportStatus(`Successfully added trip! ${response.data.id}`);
      clearForm();
    })
    .catch((error) => {
      console.log(error.response)
      if(error.response.data && error.response.data.errors) {
      reportStatus(`There was an error loading this trip: ${error.message}`, error.response.data.errors);
    } else {
      reportStatus(`There was an error loading this trip: ${error.message}`);
    }
   });
};

$(document).on('click', 'li', detailsTrips);
$(document).on('submit', 'form', reservation);

$(document).ready(() => {
  $('#load-trips').click(loadTrips);
  $('form').submit(readFormData);
});
