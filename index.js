const URL = "https://trektravel.herokuapp.com/trips";

const reportStatus = (message) => {
    $('#status-message').html(message);
};

const loadReservationForm = () => {
  $('.reservations').append('<form id="reservation-form"></form>')
    // $('.reservations').append(`<p>Hey howdy hey</p>`);
    const nameField = '<div>' + '<label for="name">Name:</label>' + 
    '<input type="text" id="name" name="user_name">' + '</div>'

    const emailField = '<div>' + '<label for="email">Email:</label>' + 
    '<input type="text" id="email" name="user_email">' + '</div>'

    $('#reservation-form').append(nameField);
    $('#reservation-form').append(emailField);
};

const loadDetails = (id) => {
    const detailsList = $('#details-list');
    const tripUrl = URL + `/${id}`;

    axios.get(tripUrl)
    .then(function (response) {
      const details = response.data;
      detailsList.append(`<li>ID: ${details.id}</li>`);
      detailsList.append(`<li>Name: ${details.name}</li>`);
      detailsList.append(`<li>Continent: ${details.continent}</li>`);
      detailsList.append(`<li>Category: ${details.category}</li>`);
      detailsList.append(`<li>Weeks: ${details.weeks}</li>`);
      detailsList.append(`<li>Cost: ${details.cost}</li>`);

      loadReservationForm();
    })
    .catch((error) => {
      reportStatus(`Whoops!  Something went wrong while loading trip details: ${error.message}`);
      console.log(error);
    });
    }

const loadTrips = () => {

    const tripsList = $('#trip-list');
    tripsList.empty();

    axios.get(URL)
    .then(function (response) {
        const trips = response.data;
        for (let i = 0; i <= trips.length-1; i += 1) {
            const idNum = response.data[i].id;
            const tripId = `${idNum}`;
            const element = `<li id="${tripId}">${response.data[i].name}</li>`;
            tripsList.append(element);
        }
        // tripsList.append(`<li>${response.data[0]}</li>`);
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
        $('section.details').append('<h2>Details</h2>');

        const tripId = parseInt($(this).attr("id"));
        const detailsWindow = '<ul id="details-list"></ul>';

        // const detailsWindow = '<ul class="details-list">' + `<li>${$(this).html()} number ${tripId}</li>` + '</ul>'
        $('section.details').append(detailsWindow);
        loadDetails(tripId);
    });
})