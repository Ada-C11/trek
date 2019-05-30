const ALL_TRIPS_URL = 'https://trektravel.herokuapp.com/trips';
const ONE_TRIP = ' https://trektravel.herokuapp.com/trips/'

const displayStatus = (message) => {
    $('#status').html(message);
  }
  
  const handleApiError = (error) => {
    console.log(error);
    // TODO: politely report this error to the user
  }
  
  const loadTrips = () => {
    // displayStatus("loading trips...");
  
    // TODO: Wave 1
    // make an axios call to the trips index and display the results
    axios.get(ALL_TRIPS_URL)

    .then((response) => {
        displayStatus(`Successfully loaded ${response.data.length} trips`);
        const trips = response.data;
        console.log(trips)
        trips.forEach((trip) => {
            $('#trip-list').append(`<li>${trip.name}`);
        });
    })
    .catch((error) => {
        displayStatus(`Encountered an error while loading pets: ${error.message}`);
        console.log('The error was this:', error);
    });
  }
  
  const showTripDetails = (trip) => {
    console.log("showing details for trip", trip);

    
  
    // TODO: Wave 2
    // display trip details and the trip reservation form
  }
  
  const reserveTrip = (trip) => {
    console.log("reserving trip", trip)
  
    // TODO: Wave 2
    // reserve a spot on the trip when the form is submitted
  }
  
  $(document).ready(() => {
    $('#load-trips').click(loadTrips);
  });