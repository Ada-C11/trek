const URL = 'https://trektravel.herokuapp.com/trips'

// html set-up
const tripsHeader = $('<div>All Trips</div>');
tripsHeader.addClass('card-header');

const tripList = $('<ul>');
tripList.addClass('list-group list-group-flush');
tripList.attr('id', 'trip-list');

const tripDetailsHeader = $('<div>Trip Details</div>');
tripDetailsHeader.addClass('card-header');

const tripDetails = $('<div>');
tripDetails.addClass('trip-details card')

const tripBody = $('<div>');
tripBody.addClass('card-body');


// get request for trips
const requestTrips = () => {
  return axios.get(URL);
}

// load list of current trips  
const loadTrips = () => {
  const currentTrips = $('#current-trips');
  tripList.empty();

  requestTrips()
    .then((response) => {
      const trips = response.data;
      trips.forEach((trip) => {
        tripList.append(`<li class=list-group-item>${trip.name}</li>`);
      });
    })
    .catch((error) => {
      console.log(error);
    });

  currentTrips.addClass('card');
  currentTrips.append(tripsHeader, tripList);
}

// load details for clicked on trip
const loadDetails = (function(tripName) {
  const tripInfo = $('.trip-information');
  tripInfo.empty();

  requestTrips()
    .then((response) => {
      const trips = response.data;
      const clickedTrip = trips.find((trip) => {
        return trip['name'] === tripName.replace(/amp;/, '');
      });
      tripBody.empty();
      tripDetails.append(tripDetailsHeader);
      tripDetails.append(tripBody);
      tripBody.append(`<h2>Name: ${clickedTrip.name}</h2>`);
      tripBody.append(`<p>Continent: ${clickedTrip.continent}</p>`);
      tripBody.append(`<p>Category: ${clickedTrip.category}</p>`);
      tripBody.append(`<p>Weeks: ${clickedTrip.weeks}</p>`);
      tripBody.append(`<p>Cost: $${clickedTrip.cost.toFixed(2)}</p>`);
      tripBody.append(`<p>About: ${clickedTrip.about}</p>`);
    })
    .catch((error) => {
      console.log(error);
    });

  tripInfo.append(tripDetails);
});

// doing the things!
$(document).ready(function() {

  $('#trips-btn').click(loadTrips);

  tripList.on('click', 'li', function(event) {
    loadDetails(this.innerHTML);

  });
});

