const listErrors = (errors) => {
  let errorList = '<ul>';
  for (const field in errors) {
    if (errors[field]) {
      for (const problem of errors[field]) {
        errorList += `<li>${field}: ${problem}</li>`;
      }
    }
  }
  errorList += '</ul>';
  return errorList;
};

const showMessage = (elementID, status) => {
  $(elementID).addClass(status);
  $(elementID).removeClass('hidden');
};
const handleReserveTrip = (tripID, continent) => {
  const endpoint = `https://trektravel.herokuapp.com/trips/${tripID}/reservations`;
  const name = $('#name-field').val();
  const email = $('#email-field').val();

  axios.post(endpoint, {
    name,
    email,
  })
    .then((response) => {
      $('#reserve-form')[0].reset();
      showMessage('#reserve-message','success');

      const messageHTML = (
        `<h4>Congrats, ${name}, you're going to ${continent}!</h4>`
              + `<p>Your reservation ID is ${response.data.id}.</p>`
      );
      $('#reserve-message').html(messageHTML);
      
    })
    .catch((error) => {
      showMessage('#reserve-message','error');
      $('#reserve-message').html(`<h4> A problem occured: ${error.message} </h4>`);

      if (error.response && error.response.data && error.response.data.errors) {
        const errors = error.response.data.errors;
        $('#reserve-message').append(listErrors(errors));
      }
    });
};

const changeSelected = (tripID) => {
  $('.selected').removeClass('selected');
  $(`#trip-${tripID}`).addClass('selected');
};

const displayTripDescription = (tripID) => {
  axios.get(`https://trektravel.herokuapp.com/trips/${tripID}`)
    .then((response) => {
      $('#trip-details').append(`<details>${response.data.about}</details>`);
    })
    .catch((error) => {
      $('#trip-details').append(`<p class="error">Failed to load trip details:  ${error.message}</p>`);
    });
};

const displayReservationForm = (tripName) => {
  $('#reserve-heading').text(`Reserve a Spot on ${tripName}`);
  $('#reserve-message').empty();
  $('#reserve-trip').removeClass('hidden');
};

const setReservationButtonHandler = (tripID, continent) => {
  $('#reserve-button').off();
  $('#reserve-button').click((event) => {
    event.preventDefault();
    handleReserveTrip(tripID, continent);
  });
};

const displayTripDetails = (trip) => {
  const tripDetails = (
    `<h3>${trip.name}</h3>`
          + `<p id="continent">Continent: ${trip.continent}</p>`
          + `<p id="category">Category: ${trip.category[0].toUpperCase() + trip.category.slice(1)}</p>`
          + `<p id="weeks">${trip.weeks} ${(trip.weeks === 1) ? 'week' : 'weeks'}</p>`
          + `<p id="cost">$${trip.cost.toFixed(2)}</p>`
  ); 
  $('#trip-details').removeClass('hidden');
  $('#trip-details').html(tripDetails);
};
const buildTripClickHandler = (trip) => {
 
  const handler = () => {
    changeSelected(trip.id);
    displayTripDetails(trip);
    displayTripDescription(trip.id);
    displayReservationForm(trip.name);
    setReservationButtonHandler(trip.id, trip.continent);
  };
  return handler;
};

const moveButton = ()=>{
  $('#main-button').removeClass('centered');
  $('#main-button').text('Reload Trips');
};
const loadTrips = (tripData) => { 
  $('.selected').removeClass('selected');
  $('#trips-list').removeClass('hidden');
  $('#reserve-trip, #trip-details').addClass('hidden');
  $('#trip-details, #trips-list').empty();
  
  for (const trip of tripData) {
    $('#trips-list').append(`<div id=trip-${trip.id}><h3>${trip.name}</h3></div>`);
    const handleTripClick = buildTripClickHandler(trip);
    $(`#trip-${trip.id}`).click(() => { handleTripClick(); });
  }
};

const handleMainButtonClick = () => {
  axios.get('https://trektravel.herokuapp.com/trips')
    .then((response) => {
      $('#status-message').empty();
      $('#status-message').addClass('hidden');
      moveButton();
      loadTrips(response.data);
    })
    .catch((error) => {
      $('#status-message').html(`Could not load trips: ${error.message}`);
      showMessage('#status-message', error);
    });
};

$('document').ready(() => {
  $('#main-button').click(() => { handleMainButtonClick(); });
  $('#reserve-button').click(() => { handleReserveTrip(); });
});
