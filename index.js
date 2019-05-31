const URL = 'https://trektravel.herokuapp.com/trips';
const tripDetailsURL = 'https://trektravel.herokuapp.com/trips/';
const reserve = $('#section.reserve-trip')

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
          // show individual trips details with access to trip from loop
          const showTripDetails = (trip) => {
            const tripDetail = () => {
              axios.get(tripDetailsURL + trip.id)
              .then((response) => {
                const deets = $('#trip-details');
                deets.empty();

                deets.html(
                `<h1>Trek Trip Details<h1> 
                  <h2>Trip Name: ${trip.name}</h2>
                  <h3>Continent: ${trip.continent}</h3>
                  <h3>Category: ${trip.category}</h3>
                  <h3>Weeks: ${trip.weeks}</h3>
                  <h3>Cost: $${trip.cost}</h3>
                  <h3>About: </h3>
                  <p>${trip.about}</p>`
                )
              })
              
              .catch((error) => {
                reportStatus(error);
              });
            }
            return tripDetail;
          };
          const clickedTrip = showTripDetails(trip);
          // $('#trip-list p').click(showTripDetails);
          $('p:last').click(clickedTrip);
        });

      })
      .catch((error) => {
        reportStatus(`Encountered an error while loading trips: ${error.message}`, 'danger');
        console.log(error);
      });
  }

  const readFormData = () => {    
    const parsedFormData = {};

    const nameFromForm = $(`#new-reservation input[name="name]`).val();
    parsedFormData['name'] = nameFromForm ? nameFromForm : undefined;

    const emailFromForm = $(`#new-reservation input[name="email"]`).val();
    parsedFormData['email'] = emailFromForm ? emailFromForm : undefined;

    return parsedFormData;
  };

  const reserveTrip = (trip) => {
    console.log("reserving trip", trip)
  
    // TODO: Wave 2
    // reserve a spot on the trip when the form is submitted
  }
  
  $(document).ready(() => {
    $('#load-trips').click(loadTrips);  
  });
  