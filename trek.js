/* eslint-disable no-undef */
$('document').ready(() => {
  const listErrors = (errors) => {
    let errorList = "<ul>";
    for (const field in errors) {
      for (const problem of errors[field]) {
      errorList += `<li>${field}: ${problem}</li>`;
    }
      }
    errorList += "</ul>";
    return errorList;
  }
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

        const messageHTML = (
          `<h4>Congrats, ${name}! You're going to ${continent}!</h4>`
                + `<p>Your reservation ID is ${response.data.id}.</p>`
        );
        $('#reserve-message').addClass('success');
        $('#reserve-message').removeClass('hidden');
        $('#reserve-message').html(messageHTML);
        
      })
      .catch((error) => {
        $('#reserve-message').addClass('error');
        $('#reserve-message').removeClass('hidden');
        $('#reserve-message').html(`<h4> A problem occured: ${error.message} </h4>`)
        if (error.response && error.response.data && error.response.data.errors) {
          const errors = error.response.data.errors;
          $('#reserve-message').append(listErrors(errors));
        }
      });
  };
  const buildTripClickHandler = (trip) => {
    const changeSelected = () => {
      $('.selected').removeClass('selected');
      $(`#trip-${trip.id}`).addClass('selected');
    };

    const displayTripDescription = () => {
      axios.get(`https://trektravel.herokuapp.com/trips/${trip.id}`)
        .then((response) => {
          $('#trip-details').append(`<details>${response.data.about}</details>`);
        })
        .catch((error) => {
          $('#trip-details').append(`<p class="error">Failed to load trip details:  ${error.message}</p>`);
        });
    };

    const displayReservationForm = () => {
      $('#reserve-heading').text(`Reserve a Spot on ${trip.name}`);
      $('#reserve-message').empty();
      $('#reserve-trip').removeClass('hidden');
    };

    const setReservationButtonHandler = () => {
      $('#reserve-button').off();
      $('#reserve-button').click((event) => {
        event.preventDefault();
        handleReserveTrip(trip.id, trip.continent);
      });
    };

    const tripDetails = (
      `<h3>${trip.name}</h3>`
            + `<p id="continent">Continent: ${trip.continent}</p>`
            + `<p id="category">Category: ${trip.category[0].toUpperCase() + trip.category.slice(1)}</p>`
            + `<p id="weeks">${trip.weeks} ${(trip.weeks === 1) ? 'week' : 'weeks'}</p>`
            + `<p id="cost">$${trip.cost.toFixed(2)}</p>`
    );

    const handler = () => {
      changeSelected();
      $('#trip-details').html(tripDetails);
      displayTripDescription();
      displayReservationForm();
      setReservationButtonHandler();
    };
    return handler;
  };

  const loadTrips = (tripData) => {
    $('button').removeClass('centered');
    $('.selected').removeClass('selected');
    $('#reserve-trip').addClass('hidden');
    $('#trip-details').empty();
    $('button').text('Reload Trips');
    $('#trips-list').empty();
    for (const trip of tripData) {
      $('#trips-list').append(`<div id=trip-${trip.id}><h3>${trip.name}</h3></div>`);
      const handleTripClick = buildTripClickHandler(trip);
      $(`#trip-${trip.id}`).click(() => { handleTripClick(); });
    }
  };

  const handleButtonClick = () => {
    axios.get('https://trektravel.herokuapp.com/trips')
      .then((response) => {
        $('#status-message').empty();
        $('#status-message').addClass('hidden');
        loadTrips(response.data);
      })
      .catch((error) => {
        $('#status-message').html(`Could not load trips: ${error.message}`);
        $('#status-message').removeClass('hidden');
      });
  };

  $('#reserve-button').click(() => { handleReserveTrip(); });
  $('button').click(() => { handleButtonClick(); });
});
