const URL = 'https://trektravel.herokuapp.com/trips/';
const allTrips = $('section.trip-list');


const reportStatus = (message) => {
  const statusContainer = $('#status').html(message);
  statusContainer.empty();
  statusContainer.append(`<p>${message}</p>`)
  }
  
  const handleApiError = (error) => {
    console.log(error);
    // TODO: politely report this error to the user
  }
  
  const loadTrips = () => {
    reportStatus("loading trips...");

    const tripList = $('#trip-list');
    tripList.empty();

    axios.get(URL)
      .then((response) => {
        reportStatus(`Successfully loaded ${response.data.length} trips`, 'success');

        const trips = response.data;
        
        trips.forEach((trip) => {
          tripList.append(`<p>${trip.name}</p>`)
        });
          
      })
      .catch((error) => {
        reportStatus(`Encountered an error while loading trips: ${error.message}`, 'danger');
        console.log(error);
      });
      
    // TODO: Wave 1
    // make an axios call to the trips index and display the results
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
  