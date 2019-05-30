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
      tripList.append(`<li>Trip #${trip.id}: ${trip.name}</li>`);
    });
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
  const details = $('#details');

  tripInfo.empty();
  details.empty();

  axios.get(ALL_TRIPS + `/${id}`)
  .then((response) => {
    reportStatus(`Successfully loaded details about trip #${id}.`);

    let trip = response.data;

    tripInfo.append(`<li>Name: ${trip.id}: ${trip.name}</li>,
    <li>${trip.continent}</li>,
    <li>${trip.category}</li>,
    <li>${trip.weeks}</li>,
    <li>${trip.cost}</li>`).hide();
    details.append(`<li>Details: ${trip.about}</li>`).hide();
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
  });

  // load details about specific trip
  $('ul').on('click', 'li', function() {

    let tripId = $(this).html();
    tripDetails(tripId);

    $('#trip-info').show();
    $('#details').show();
  });
});
