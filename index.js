const ALL_TRIPS = 'https://trektravel.herokuapp.com/trips';

 
// ERROR & STATUS REPORTING
const reportStatus = (message) => {
  const statusContainer = $('#status-message');
  statusContainer.empty();
  statusContainer.append(`<p>${message}</p>`);
}

const reportError = (message, errors) => {
  let content = `<p>${message}</p><ul>`;
  for(const field in errors){
    for(const problem of errors[field]){
      content += `<li>${field}: ${problem}</li>`;
    }
  }
  content += '</ul>';
  reportStatus(content);
};

// LOAD ALL TRIPS
const loadTrips = () => {
  reportStatus('Loading trips...');

  const tripList = $('#trips-list');
  tripList.empty();

  axios.get(ALL_TRIPS)
  .then((response) => {
    reportStatus(`Successfully loaded ${response.data.length} trips`);
    

    response.data.forEach((trip) => {
      tripList.append(`<li><button class='${trip.id}'> ${trip.name}</button></li>`);
    })
  })
  .catch((error) => {
    reportStatus(`Encountered an error while loading trips: ${error.message}`);

    console.log(error);
  });
}

//TRIP DETAILS
const tripDetails = (id) => {
  reportStatus('Loading trip details...');

  const tripInfo = $('#trip-info');
  tripInfo.empty();

  axios.get(ALL_TRIPS + '/' + id)
  .then((response) => {
    reportStatus(`Successfully loaded details about ${id}.`);

    let trip = response.data;

    tripInfo.append(`<h3>Name: ${trip.name}</h3>`);
    tripInfo.append(`<p><strong>Continent: </strong>${trip.continent}</p>`);
    tripInfo.append(`<p><strong>Category: </strong>${trip.category}</p>`);
    tripInfo.append(`<p><strong>Weeks: </strong>${trip.weeks}</p>`);
    tripInfo.append(`<p><strong>Cost: </strong>$${trip.cost}</p>`);
    tripInfo.append(`<p><strong>About:</strong> ${trip.about}</p>`);
  })
  .catch((error) => {
    reportStatus(`Encountered an error while loading trip: ${error.message}`);
    console.log(error);
  });
}

$(document).ready(() => {
  $('#load-trips').click(() => {
    // Load all trips
    loadTrips();
    $('#trips').show();
  });

  // load details about specific trip
  $('ul').on('click', 'button', function() {

    let tripId = this.className;
    tripDetails(tripId);
    $('#trip-details').show();
  });
});
