const URL = "https://trektravel.herokuapp.com/trips";

const reportStatus = (message) => {
    $('#status-message').html(message);
};

const readFormData = () => {
    const parsedFormData = {};

    const nameFromForm = $(`#reservation-form input[name="name"]`).val();
    parsedFormData['name'] = nameFromForm ? nameFromForm : undefined;

    const emailFromForm = $(`#reservation-form input[name="email"]`).val();
    parsedFormData['email'] = emailFromForm ? emailFromForm : undefined;

    return parsedFormData;
};


const makeReservation = () => {

    event.preventDefault();
    const tripId = $(event.target).find('div.button').attr("name");
    const reservationUrl = "https://trektravel.herokuapp.com/trips" + `/${tripId}/` + "reservations";
   
    const reservationData = readFormData();
    console.log(reservationData);

    reportStatus("Submitting your reservation...");

    axios.post(reservationUrl, reservationData)
      .then(function (response) {
        console.log(response);
        reportStatus(`Successfully added your reservation!  The ID is ${response.data.id}!`);
        // $('#reservation-form').reset();
      })
      .catch(function (error) {
        console.log(error);
        reportStatus(`Encountered an error while submitting your reservation: ${error.message}`)
      });
}


const loadReservationForm = (trip) => {
  $('.reservations').append(`<h2 class=${trip.id}>Reserve a Trip to ${trip.name}</h2>`);
  $('.reservations').append('<form id="reservation-form"></form>');

    const nameField = '<div>' + '<label for="name">Name:</label>' + 
    '<input type="text" id="name" name="name">' + '</div>'

    const emailField = '<div>' + '<label for="email">Email:</label>' + 
    '<input type="text" id="email" name="email">' + '</div>'

    const submitButton = `<div class="button reserve" id="reserve" name="${trip.id}">` + 
    '<button type="submit">Reserve</button>' + '</div>'
  
    $('#reservation-form').append(nameField);
    $('#reservation-form').append(emailField);
    $('#reservation-form').append(submitButton);
};

const loadDetails = (id) => {
    const detailsList = $('#details-list');
    const tripUrl = URL + `/${id}`;

    axios.get(tripUrl)
    .then(function (response) {
      const details = response.data;
      detailsList.append(`<li><strong>ID</strong>: ${details.id}</li>`);
      detailsList.append(`<li><strong>Name</strong>: ${details.name}</li>`);
      detailsList.append(`<li><strong>Continent</strong>: ${details.continent}</li>`);
      detailsList.append(`<li><strong>Category</strong>: ${details.category}</li>`);
      detailsList.append(`<li><strong>Weeks</strong>: ${details.weeks}</li>`);
      detailsList.append(`<li><strong>Cost</strong>: ${details.cost}</li>`);

      loadReservationForm(details);
    })
    .catch((error) => {
      reportStatus(`Whoops!  Something went wrong while loading trip details: ${error.message}`);
      console.log(error);
    });
    }

const loadTrips = () => {

    const tripsList = $('#trip-list');
    tripsList.empty();
    // tripsList.append('<h2>All Trips</h2>')

    axios.get(URL)
    .then(function (response) {
        const trips = response.data;
        for (let i = 0; i <= trips.length-1; i += 1) {
            const idNum = response.data[i].id;
            const tripId = `${idNum}`;
            const element = `<li id="${tripId}">${response.data[i].name}</li>`;
            tripsList.append(element);
        }
    })
    .catch((error) => {
        reportStatus(`Whoops!  Something went wrong while loading trips: ${error.message}`);
        console.log(error);
    });

};

$(document).ready(() => {
    $('#load').click(loadTrips);

    $('#trip-list').on('click', 'li', function() {
        $('.details').empty();
        $('.reservations').empty();
        $('section.details').append('<h2>Trip Details</h2>');

        const tripId = parseInt($(this).attr("id"));
        const detailsWindow = '<ul id="details-list"></ul>';

        $('section.details').append(detailsWindow);
        loadDetails(tripId);
    });

    $(document).on("submit", "#reservation-form", makeReservation);
})