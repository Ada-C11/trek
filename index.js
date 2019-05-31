const allTripsURL = 'https://trektravel.herokuapp.com/trips'
const tripDetailURL = 'https://trektravel.herokuapp.com/trips/'

const reportStatus = (message) => {
  $('#status-message').html(message).hide(3000);
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
      <p>Continent: ${response.data.continent}</p>
      <p>Category: ${response.data.category}</p>
      <p>Weeks: ${response.data.weeks}</p>
      <p>Cost: ${response.data.cost}</p>
      <p>About</p>
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

  axios.get(allTripsURL)
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
        })
      });
    })
    .catch((error) => {
      reportStatus(`Encountered an error while loading trips: ${error.message}`);
      console.log(error);
    });
}

const tripDetails = (tripId) => {
  const temp = tripDetailURL + tripId;
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

const addTrip = () => {

}

$(document).ready( function() {
  $('.all-trips').click(loadTrips);
});