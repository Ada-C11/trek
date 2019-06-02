const URL = 'https://trektravel.herokuapp.com/trips';
const tripDetailsURL = 'https://trektravel.herokuapp.com/trips/';

//
// Error Handling
//
const reportStatus = (message) => {
  const statusContainer = $('#status').html(message);
  statusContainer.empty();
  statusContainer.append(`<p>${message}</p>`)
  }
  
  const handleApiError = (error) => {
    console.log(error);
  }

  //
  // Load trips and details
  //
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
                  <p>${response.data.about}</p>`
                )
                const reserve = tripReservationHandler(trip.id);
                $('#res-form').submit(reserve);
              })
              .catch((error) => {
                reportStatus(error);
              });
              // Generates booking form
              resFormGenerator(trip);

            };          
            return tripDetail;
          }
          // Shows individual trip details
          const clickedTrip = showTripDetails(trip);
          $('p:last').click(clickedTrip);

        });

      })
      .catch((error) => {
        reportStatus(`Encountered an error while loading trips: ${error.message}`, 'danger');
        console.log(error);
      });

  };

  //
  // Booking Reservation
  //
  const resFormGenerator = (trip) => {
    $('#res-form').empty();
    $('#res-form').append(
      `<h3>Book a trek for ${trip.name}</h3>
      <input type="hidden" id="${trip.id}" name="${trip.id}" value="${trip.id}">
      
      <div>
        <label for="name">Name</label>
        <input type="text" name="name"/>
      </div>
      <div>
        <label for="email">Email</label>
        <input type="text" name="email"/>
      </div>
      <input type="submit" name="book" value="Book"/>`)
  };

  const readFormData = () => {    
    const parsedFormData = {};

    const nameFromForm = $(`#res-form input[name="name"]`).val();
    parsedFormData['name'] = nameFromForm ? nameFromForm : undefined;

    const emailFromForm = $(`#res-form input[name="email"]`).val();
    parsedFormData['email'] = emailFromForm ? emailFromForm : undefined;

    return parsedFormData;
  };

  const clearForm = () => {
    $(`#res-form input[name="name"]`).val('');
    $(`#res-form input[name="email"]`).val('');
  };
  
  const tripReservationHandler = (trip) => {
    reportStatus("Booking Reservation...");
    return (event) => {
      event.preventDefault();

      const reserveInfo = readFormData();

      axios.post(tripDetailsURL + trip + '/reservations', reserveInfo)
      .then((response) => {
        reportStatus(`Your reservation # ${response.data.id} was created!`);  
        clearForm();
      })

      .catch((error) => {
        reportStatus(error);
      });
    };
  };

  
  $(document).ready(() => {
    $('#load-trips').click(loadTrips); 
  });