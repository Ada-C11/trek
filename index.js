const URL = 'https://trektravel.herokuapp.com/trips';

const reportStatus = (message) => {
  console.log(message);
  $('#status-message').html(message);
};

const reportApiError = (error) => {
  console.log("encountered error when posting", error);
  let errors = Object.values(error)[2].data.errors;
  let errorHtml = `<p>${error.message}</p><ul>`;

  for (let [field, problem] of Object.entries(errors)) {
    errorHtml += `<li>${field}: ${problem}</li>`;
  }
  errorHtml += '</ul>';
  console.log(errorHtml);
  reportStatus(errorHtml);
}

const loadTripForm = (tripName) => {
  const tripForm = $('#trip-form');
  tripForm.addClass('card');
  tripForm.append(
    `<h4 class="card-header">Reserve a spot on ${tripName}</h4>
    <div class="card-body">
      <div class="form-group">
        <label for="name">Name</label>
        <input type="text" name="name" class="form-control" placeholder="Your Name">
      </div>
      <div class="form-group">
        <label for="email">Email</label>
        <input type="text" name="email" class="form-control" placeholder="you@example.com">
      </div>
      <div>
        <input type="submit" class="btn btn-primary" name="reserve-trip" value="Reserve">
      </div>
    </div>`
  )
}

const loadTripDetail = (response) => {
  const tripDetail = $('#trip-details');
  tripDetail.empty();
  tripDetail.addClass('card');
  tripDetail.append(
    `<h4 class="card-header">Trip Details</h4>
    <div class="card-body">
      <h5 class="card-title">Name: ${response.data.name}</h5>
      <p><strong>Continent:</strong> ${response.data.continent}</p>
      <p><strong>Category:</strong> ${response.data.category}</p>
      <p><strong>Weeks:</strong> ${response.data.weeks}</p>
      <p><strong>Cost:</strong> $${response.data.cost}</p>
      <p><strong>About:</strong></p>
      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi congue euismod libero, 
      et dapibus sapien maximus in. Nunc suscipit velit lectus, quis vestibulum dui consequat tincidunt. 
      Maecenas enim massa, pellentesque a scelerisque euismod, scelerisque volutpat orci. Suspendisse 
      pulvinar sapien ut vulputate semper. Nunc ultricies efficitur risus. Cras cursus vel arcu.</p>
    </div>`
  );
}

const loadTrips = () => {
  reportStatus('Loading trips...');

  const tripList = $('#trip-list');
  tripList.empty();

  axios.get(URL)
    .then((response) => {
      tripList.addClass('card');
      tripList.append(`<h4 class="card-header">All Trips</h4>`);
      $('h4').addClass('trip-section-title');
      reportStatus(`Successfully loaded ${response.data.length} trips`);

      response.data.forEach((trip) => {
        tripList.append(`<button id=${trip.id}>${trip.name}</button>`);
        $(`#${trip.id}`).addClass('btn btn-light btn-block');
        $(`#${trip.id}`).click(function() {
          tripDetails($(this).attr('id'));
          $('#trip-form').empty();
          loadTripForm(trip.name);
          $('#trip-form').submit((event) => {
            event.preventDefault();
            reserveTrip(trip.id);
          });
        })
      });
    })
    .catch((error) => {
      reportStatus(`Encountered an error while loading trips: ${error.message}`);
      console.log(error);
    });
}

const tripDetails = (tripId) => {
  const temp = URL + '/' + tripId;
  axios.get(temp)
  .then((response) => {
    loadTripDetail(response);
  })
  .catch( (error) => {
    console.log(error.message);
  }); 
}

const readTripForm = () => {
  return new FormData(document.querySelector('#trip-form'));
}

const reserveTrip = (tripId) => {
  const tripData = readTripForm();
  const temp = URL + '/' + tripId + '/reservations' 
  
  axios.post(temp, tripData)
    .then((response) => {
      console.log("successfully posted trip data", response);

      const tripId = response.data.id;
      reportStatus(`Successfully reserved a trip with ID ${tripId}`);
    })
    .catch((error) => {
      reportApiError(error);
    })
}

$(document).ready( function() {
  $('.all-trips').click(loadTrips);
  
});