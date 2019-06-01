const URL = 'https://trektravel.herokuapp.com/trips';

const reportStatus = (message) => {
  $('#status-message').html(message);
};

let trips = {};

const loadTrips = () => {
  reportStatus('Loading trips...');

  const tripList = $('#trip-list');
  tripList.empty();

  axios.get(URL)
    .then((response) => {
      reportStatus(`Successfully loaded ${response.data.length} trips`);
      response.data.forEach((trip) => {
        const listItem = $(`<li>${trip.name}</li>`).appendTo(tripList);
        listItem.click(() => {
          showTripDetails(trip.name);
        })
        trips[trip.name] = trip;
      });
    })
    .catch((error) => {
      reportStatus(`Encountered an error while loading trips: ${error.message}`);
      console.log(error);
    });
};

function showTripDetails(tripName) {
  const trip = trips[tripName];
  const details = $('#details');
  details.append(`<p><b>Name</b>: ${trip.name}</p>`);
  details.append(`<p>Continent: ${trip.continent}</p>`);
  details.append(`<p>Category: ${trip.category}</p>`);
  details.append(`<p>Weeks: ${trip.weeks}</p>`);
  details.append(`<p>Cost: $${trip.cost}</p>`);
  details.append(`<p>About:</p>`);
  details.append(`<p>I wish I worked at Google.</p>`);
}

const createTrip = (event) => {
  event.preventDefault();

  reportStatus('Sending trip data...');

  axios.post(URL, tripData)
    .then((response) => {
      reportStatus(`Successfully added a trip with ID ${response.data.id}!`);
      clearForm();
    })
    .catch((error) => {
      console.log(error.response);
      reportStatus(`Encountered an error while loading trips: ${error.message}`)
    });
};


// const details.html(
//   <h2>Trip Details</h2>
//   <h1>Trip ID</h1>
//   <h1>Trip Name</h1>
//   <h1>Continent</h1>
//   <h1>Details about the trip</h1>
//   <h1>Category of the trip</h1>
//   <h1>Number of weeks duration of the trip</h1>
//   <h1>Cost of the trip</h1>
// )

$(document).ready(() => {
  $('#load').click(loadTrips);
  // $('#trip-form').submit(createTrip);
});