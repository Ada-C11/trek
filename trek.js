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


const reserveForm = $('<div>');
reserveForm.addClass('reservation-card card');

const reserveHeader = $('<div>');
reserveHeader.addClass('reservation-header card-header');
reserveForm.append(reserveHeader);

const form = $('<form>');
form.attr('id', 'reservation-form');
reserveForm.append(form);

const nameField = $('<div>');
nameField.addClass('name-field form-group');
form.append(nameField);


const nameLabel = $('<label>Name</label>');
nameLabel.attr('for', 'exampleInputName');
nameField.append(nameLabel);

const nameInput = $('<input>');
nameInput.attr('type', 'name');
nameInput.attr('class', 'form-control');
nameInput.attr('id', 'nameInput')
nameInput.attr('placeholder', 'Enter Name');
nameField.append(nameInput);

const emailField = $('<div>');
emailField.addClass('email-field form-group');
form.append(emailField);

const emailLabel = $('<label>Email</label>');
emailLabel.attr('for', 'exampleInputEmail');
emailField.append(emailLabel);

const emailInput = $('<input>');
emailInput.attr('type', 'email');
emailInput.attr('class', 'form-control');
emailInput.attr('id', 'emailInput')
emailInput.attr('placeholder', 'Enter Email');
emailField.append(emailInput);

const submitButton = $('<button>Submit</button>');
submitButton.attr('type', 'submit');
submitButton.addClass('btn btn-primary reserve');
form.append(submitButton);


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
  console.log(tripID);

  axios.get(TRIP_URL + `${newTripID}`)
    .then((response) => {
      const trip = response.data;
      tripBody.empty();
      tripDetails.append(tripDetailsHeader);
      tripDetails.append(tripBody);
      tripBody.append(`<p><span>Name</span>: ${trip.name}</p>`);
      tripBody.append(`<p><span>Continent</span>: ${trip.continent}</p>`);
      tripBody.append(`<p><span>Category</span>: ${trip.category}</p>`);
      tripBody.append(`<p><span>Weeks</span>: ${trip.weeks}</p>`);
      tripBody.append(`<p><span>Cost</span>: $${trip.cost.toFixed(2)}</p>`);
      tripBody.append(`<p><span>About</span>: ${trip.about}</p>`);
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

let selectedTripID 

// load reservation form
const loadReserveForm = tripID => {
  selectedTripID = tripID;
  $('.trip-information').append(reserveForm);
  reserveHeader.html('Reserve a Spot')
}

// post reservation
const addReservation = () => {
  const reserveData = readReserveForm();
  axios.post(`https://trektravel.herokuapp.com/trips/${selectedTripID}/reservations`, reserveData)
    .then((response) => {
      console.log("Yippy bish!", response);
    })
    .catch((error) => {
      console.log(error.message, error);
    })
};

// event listeners
$(document).ready(function() {

  $('#trips-btn').click(loadTrips);

  tripList.on('click', 'li', function(event) {
    loadDetails(this.id);
    loadReserveForm(this.id);
  });

  form.submit((event) => {
    event.preventDefault();
    addReservation();
  });
});

