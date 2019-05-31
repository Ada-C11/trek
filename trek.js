const URL = 'https://trektravel.herokuapp.com/trips'

// html set-up
const tripsHeader = $('<div>All Trips</div>');
tripsHeader.addClass('card-header');

const tripList = $('<ul>');
tripList.addClass('list-group list-group-flush');
tripList.attr('id', 'trip-list');

// const tripDetailsHeader

// const tripDetailsBody


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


const loadDetails = (function(tripName) {
  // console.log(tripName);

  requestTrips()
    .then((response) => {
      const trips = response.data;
      const clickedTrip = trips.find((trip) => {
        return trip['name'] === tripName;
      });
      console.log(clickedTrip);
    })
    .catch((error) => {
      console.log(error);
    });
});


// doing the things!
$(document).ready(function() {

  $('#trips-btn').click(loadTrips);

  tripList.on('click', 'li', function(event) {
    loadDetails(this.innerHTML);
  });
});

