const ALL_TRIPS_URL = 'https://trektravel.herokuapp.com/trips';
// const ONE_TRIP = `https://trektravel.herokuapp.com/trips/`

const displayStatus = (message) => {
  $('#status').html(message);
}

let tripId;

const handleApiError = (error) => {
  console.log(error);
  // TODO: politely report this error to the user
}

// const currentTripId = (id) => {
//   let currentId = id;

//   const returnStoredId = () => {
//     console.log(`This is trip number ${currentId}`);
//     return currentId;
//   }

//   return returnStoredId;
// };

const loadTrips = () => {
  displayStatus("loading trips...");

  // TODO: Wave 1
  // make an axios call to the trips index and display the results
  axios.get(ALL_TRIPS_URL)

    .then((response) => {
      const trips = response.data;
      displayStatus(`Successfully loaded ${trips.length} trips`);
      console.log(trips)
      trips.forEach((trip) => {

        $('#trip-list').append(`<li><button id=${trip.id}>${trip.id}: ${trip.name}</button></li>`);
        
        
      });
    })
    .catch((error) => {
      displayStatus(`Encountered an error while loading tips: ${error.message}`);
      console.log('The error was this:', error);
    });
}

const showTripDetails = () => {
  // console.log('Im in the request!');
  // console.log(`the value of id currently is`);
  // console.log(`the value of id is`, tripId())
  axios.get(`${ALL_TRIPS_URL}/${tripId}`) //need to get access to trip id at this time 

    .then((response) => {
      const trip = response.data;
      displayStatus('Successfully loaded trip');
      console.log(response.data);
      $('#trip-details').append(`<li>Name: ${trip.name}</li>`);
      $('#trip-details').append(`<li>Continent: ${trip.continent}</li>`);
      $('#trip-details').append(`<li>Category: ${trip.category}</li>`);
      $('#trip-details').append(`<li>Cost: ${trip.cost}</li>`);
      $('#trip-details').append(`<li>About: ${trip.about}</li>`);
    })
    .catch((error) => {
      displayStatus(`Encountered an error while loading pets: ${error.message}`);
      console.log('The error was this:', error);
    });
}

const reserveTrip = (trip) => {
  console.log("reserving trip", trip)

  // TODO: Wave 2
  // reserve a spot on the trip when the form is submitted
}

$(document).ready(() => {

  // let tripId = currentTripId;

  $('#load-trips').click(loadTrips);
  $('#one-trip').click(showTripDetails);
  $('#trip-list').on('click', 'button', function (event) {
    tripId = event.target.id;
    showTripDetails();
  });
  
});