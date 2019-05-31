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
  tripInfo.empty();

  axios.get(ALL_TRIPS + '/' + id)
  .then((response) => {
    reportStatus(`Successfully loaded details about trip #${id}.`);

    let trip = response.data;

    $('#trip-info').append(`
        <h3>Name: ${trip.name}</h3>
        <div>
        <p><strong>Continent: </strong>${trip.continent}</p>
        <p><strong>Category: </strong>${trip.category}</p>
        <p><strong>Weeks: </strong>${trip.weeks}</p>
        <p><strong>Cost: </strong>$${trip.cost}</p></div>
        `);
    $('#about-trip').html(`        <strong>About: </strong><p>${trip.about}</p>`);
    $('#trip').append(`<span>${id}</span>`);
    $('span').hide();
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

    let tripId = $(this).next().text();
    tripDetails(tripId);
    $('#trip-details').show();
  });
});
