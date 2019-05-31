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


const displayTrips = (tripList) => {
  const target = $(`#trip-list`);
  target.empty();
  tripList.forEach(trip => {
    target.append(`<li><a class='trip-item' href='#'>${trip.name}</a></li>`);
  })
}

const showTrip = (trip) => {
  $('body').on('click', '.trip-item', function(event) {
    $('#trip-details').append(tripDetails);
  });
};

// const tripDetails = $(
//   `<li>ID: ${trip.id}</li>
//   <li>Category: ${trip.category}</li>
//   <li>Continent: ${trip.continent}</li>
//   <li>Cost: ${trip.cost}</li>
//   <li>Name: ${trip.name}</li>
//   <li>Duration: ${trip.weeks}</li>`
//   )



//
const loadTrips = () => {
  reportStatus('Loading trips...');

  axios.get(tripsURL)
  .then((response) => {
    const trips = response.data;
    displayTrips(trips);
    reportStatus(`Successfully loaded ${response.data.length} trips`);
  })

  .catch((error) => {
    reportStatus(`Encountered an error while loading trips: ${error.message}`);
    console.log(error);
  });
};


$(document).ready(() => {
  $('#load').click(loadTrips);
  // $('#trip-form').submit(createTrip);
});
