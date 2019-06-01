const displayStatus = (message) => {
    $('#status').html(message);
  }
  
  const handleApiError = (error) => {
    console.log(error);
    // TODO: politely report this error to the user
  }
  const URL = 'https://trektravel.herokuapp.com/trips';

  const loadTrips = () => {
    displayStatus("loading trips...");

      const tripList = $('#trip-list');
      tripList.empty();
    
      axios.get(URL)
        .then((response) => {
          displayStatus(`Successfully loaded ${response.data.length} trips`);
          response.data.forEach((trip) => {
            tripList.append(`<li id = ${trip.id}>${trip.name}</li>`);
            
            $(`#${trip.id}`).click(function() {
              showTripDetails(this.id);
              reserveTrip(this.id);
            }
            );
          });
        })
        .catch((error) => {
          console.log(error);
        });
    };

  const showTripDetails = (tripId) => {
        $("#trip-details").empty();
  const tripURL = URL + "/" + tripId;
  axios.get(tripURL)
      .then((response) => {
        //append the trip details 
        $("#trip-details").append(
        `<p><b>Name:</b> ${response.data.name}</p>
        <p><b>Continent:</b> ${response.data.continent}</p>
        <p><b>Category:</b> ${response.data.category}</p>
        <p><b>Weeks:</b> ${response.data.weeks}</p>
        <p><b>Cost:</b> $${response.data.cost}</p>
        <p><b>About:</b></p>
        <p>${response.data.about}</p>`
        );
      })
      .catch((error) => {
        console.log(error);
      });
  }

  const displayForm = (tripName) => {
    $('#res-form').append(
      `<h3>Reserve a spot on ${tripName}</h3>
        <div>
            <label for="name">Name</label>
            <input type="text" name="name" />
        </div>
        <div>
            <label for="email">Email</label>
            <input type="text" name="email" />
        </div>
        <input type="submit" name="reserve-trip" value="Reserve" />`
    )
  }
  
  const reserveTrip = (tripId) => {
    $("#reservation").empty();
    displayForm(tripId);
    // const resURL = URL + "/" + tripId + "/" + "reservations";
    // axios.post(resURL)
    
  }
  
  $(document).ready(() => {
    $('#load-trips').click(loadTrips);
    

  });
  