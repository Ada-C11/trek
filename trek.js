const TRIPS_URL = 'https://trektravel.herokuapp.com/trips'
const TRIP_URL = 'https://trektravel.herokuapp.com/trips/'

// html set-up
const tripsHeader = $('<div>All Trips</div>');
tripsHeader.addClass('card-header');

const tripList = $('<ul>');
tripList.addClass('list-group list-group-flush scroll');
tripList.attr('id', 'trip-list');

const tripDetailsHeader = $('<div>Trip Details</div>');
tripDetailsHeader.addClass('card-header');

const tripDetails = $('<div>');
tripDetails.addClass('trip-details card')

const tripBody = $('<div>');
tripBody.addClass('card-body');

// const reserveForm = $('<div>');
// reserveForm.addClass('reservation-card card');

// const reserveHeader = $('<div>');
// reserveHeader.addClass('reservation-header card-header');
// reserveForm.append(reserveHeader);

// const form = $('<form>');
// form.addClass('reservation-form);

// const formField = $('<div>');
// formField.addClass('form-group');

// const formLabel = $('<label>');
// formLabel.attr('for', 'name');

// const formInput = $('<input>');
// formInput.addClass('type', 'name');
// formInput.attr('class', 'form-control');
// formInput.attr('id', 'nameInput')
// formInput.attr('aria-describedby', 'nameHelp');
// formInput.attr('placeholder', 'Enter Name');

// const submitButton = $('<button>');
// submitButton.addClass('btn btn-primary');
// submitButton.attr('type', 'submit');

// get request for trips
const requestTrips = () => {
  return axios.get(TRIPS_URL);
}

// load list of current trips  
const loadTrips = () => {
  const currentTrips = $('#current-trips');
  tripList.empty();

  requestTrips()
    .then((response) => {
      const trips = response.data;
      trips.forEach((trip) => {
        const listItem = $('<li>');
        listItem.addClass('list-group-item');
        // jQuery.data(listItem, "id", `${trip.id}`);
        // console.log( typeof jQuery.data( listItem, "id" ) );
        listItem.attr('id', `${trip.id}`);
        listItem.text(`${trip.name}`);
        tripList.append(listItem);
      });
    })
    .catch((error) => {
      console.log(error);
    });

  currentTrips.addClass('card');
  currentTrips.append(tripsHeader, tripList);
}

// load details for clicked on trip
const loadDetails = tripID => {
  const tripInfo = $('.trip-information');
  const newTripID = parseInt(tripID);
  // tripInfo.empty();
  console.log(tripID);

  axios.get(TRIP_URL + `${newTripID}`)
    .then((response) => {
      const trip = response.data;
      tripBody.empty();
      tripDetails.append(tripDetailsHeader);
      tripDetails.append(tripBody);
      tripBody.append(`<h5>Name: ${trip.name}</h5>`);
      tripBody.append(`<p>Continent: ${trip.continent}</p>`);
      tripBody.append(`<p>Category: ${trip.category}</p>`);
      tripBody.append(`<p>Weeks: ${trip.weeks}</p>`);
      tripBody.append(`<p>Cost: $${trip.cost.toFixed(2)}</p>`);
      tripBody.append(`<p>About: ${trip.about}</p>`);
      tripBody.addClass('scroll');
    })
    .catch((error) => {
      console.log(error);
    });

  tripInfo.append(tripDetails);
};

const readReserveForm = () => {
  const name = $('#reservation-form').find('input[type="name"]').val();
  const email = $('#reservation-form').find('input[type="email"]').val();
  console.log(name);
  console.log(email);
  return {
    "name": `${name}`,
    "email": `${email}`
  }
}


// load reservation form
const loadReserveForm = tripID => {
  // $('.name-field').append(reserveName);
}

// post reservation
const addReservation = tripID => {
  // $('.name-field').append(reserveName);
  const reserveData = readReserveForm();
  axios.post('https://trektravel.herokuapp.com/trips/71/reservations', reserveData)
    .then((response) => {
      console.log("Yippy bish!", response);
    })
    .catch((error) => {
      console.log(error.message, error);
    })
};

// doing the things!
$(document).ready(function() {

  $('#trips-btn').click(loadTrips);

  tripList.on('click', 'li', function(event) {
    loadDetails(this.id);
    loadReserveForm(this.id);
  });

  $('#reservation-form').submit((event) => {
    event.preventDefault();
    readReserveForm();
    addReservation();
    // addReservation();
  });
});

