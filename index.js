const URL = "https://trektravel.herokuapp.com/trips/";

// const ATRIPID = 'https://trektravel.herokuapp.com/trips/';

const reportStatus = (message) => {
  $('#status-message').html(message);
};
const loadTrips = () => { 
  reportStatus('Loading trips...');

  const tripList = $('#trip-list');
  tripList.empty();

  axios.get(URL)
    .then((response) => {
      reportStatus(`Successfully loaded ${response.data.length} trips`);
      response.data.forEach((trip) => {
        tripList.append(`<p>${trip.name}</p>`);
        
        const showTripDetails = (trip) => {
          const pleaseWork = () => {
            console.log("showing details for trip", trip.id);
            const tripEach = $('#trip-details');
            tripEach.empty();
          
            axios.get(URL + trip.id) 
            .then((response) => {
              reportStatus(`Successfully loaded ${response.data.id} trips`);
              tripEach.html(
                `<h1>Trip Details</h1><h2>Name: ${response.data.name}</h2>Continent: ${response.data.continent}<h3>Category: ${response.data.category}</h3><h4>Weeks: ${response.data.weeks}</h4><h4>Cost: ${response.data.cost}</h4><h4>About:</h4><p>${response.data.about}</p>`
            )
          })
            .catch((error) => {
              reportStatus(`Encountered an error while loading trips: ${error.message}`);
              console.log(error);
            })
          };
          return pleaseWork;
        };
        const thisTrip = showTripDetails(trip)
        $('p:last').click(thisTrip)
      })
    })
  }
const displayStatus = (message) => {
  $('#status-message').html(message);
}

const handleApiError = (error) => {
  console.log("encountered error when posting", error);

  let errorHtml = `<p>${error.message}</p><ul>`;
  // TODO: politely report this error to the user
}

  // TODO: Wave 2
  // display trip details and the trip reservation form

const reserveTrip = (trip) => {
  console.log("reserving trip", trip)

  // TODO: Wave 2
  // reserve a spot on the trip when the form is submitted
}

$(document).ready(() => {
  $("#load-trips").click(loadTrips);

  $('#-form').submit((event) => {
    event.preventDefault();
    reserveTrip();
  });
});