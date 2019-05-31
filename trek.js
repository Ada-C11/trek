const tripsURL = 'https://trektravel.herokuapp.com/trips';
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
// Loading Pets
//
const loadTrips = () => {
  reportStatus('Loading trips...');

  const tripList = $('#trip-list');
  tripList.empty();

  const tripDetails = $('.trip-details');
  // tripDetails.empty();

  axios.get(tripsURL)
    .then((response) => {
      reportStatus(`Successfully loaded ${response.data.length} trips`);
      response.data.forEach((trip) => {
        tripList.append(`<li><a class='trip-item' href='#trip-details'>${trip.name}</a></li>`);
        const details = {
          id: `ID: ${trip.id}`,
          category: `Category: ${trip.category}`,
          continent: `Continent: ${trip.continent}`,
          cost: `Cost: ${trip.cost}`,
          name: `Name: ${trip.name}`,
          dutation: `Duration: ${trip.weeks}`,
        }
        // $('.body').on('click', '.trip-item', () => {
        //   tripDetails.append(`<li>${trip.id}</li>`);
        //   console.log('GOT CALLED');
        // });
      });
    })

    .catch((error) => {
      reportStatus(`Encountered an error while loading trips: ${error.message}`);
      console.log(error);
    });
};

$('.trip-details').on('click', '.trip-item', function(event) {
  tripDetails.append(`<li>${details.id}</li>`);
  console.log(id);
});

// const tripDetails = $('#trip-details');
// tripDetails.empty();


$(document).ready(() => {
  $('#load').click(loadTrips);
  // $('#trip-form').submit(createTrip);
});
