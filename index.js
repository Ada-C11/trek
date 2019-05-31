const URL = 'https://trektravel.herokuapp.com/trips';
const tripDetailsURL = 'https://trektravel.herokuapp.com/trips/';


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
              axios.get(tripDetailsURL + `${trip.id}`)
              .then((response) => {
                const deets = $('#trip-details');
                deets.empty();

                deets.html(
                `<h1>Trek Trip Details<h1> 
                  <h2>Trip Name: ${response.data.name}</h2>
                  <h3>Continent: ${response.data.continent}</h3>
                  <h3>Category: ${response.data.category}</h3>
                  <h3>Weeks: ${response.data.weeks}</h3>
                  <h3>Cost: $${response.data.cost}</h3>
                  <h3>About: </h3>
                  <p>${response.data.about}</p>`
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
  
  // const showTripDetails = (event) => {
  //   const tripID = $(event.target).data("trek-id")
  //   axios.get(tripDetailsURL + tripID)
  //   .then((response) => {
   
  //   })
  //   .catch((error) => {
  //       console.log(error);
  //   });
  
  // };


  const reserveTrip = (trip) => {
    console.log("reserving trip", trip)
  
    // TODO: Wave 2
    // reserve a spot on the trip when the form is submitted
  }
  
  $(document).ready(() => {
    $('#load-trips').click(loadTrips);  
  });
  