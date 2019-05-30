const URL = 'https://trektravel.herokuapp.com/trips'




const tripsHeader = $('<div>All Trips</div>');
tripsHeader.addClass('card-header');

const tripList = $('<ul>');
tripList.addClass('list-group list-group-flush');
tripList.attr('id', 'trip-list');


  
const loadTrips = () => {
  currentTrips = ($'#current-trips');
  currentTrips.empty();

  // currentTrips.addClass('card');

  axios.get(URL)

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

$(document).ready(function() {

  $('#trips-btn').click(loadTrips);

});
