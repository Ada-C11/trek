const baseURL = "https://trektravel.herokuapp.com/trips";

const displayStatus = (message) => {
  $('#status').html(message);
}

const handleApiError = (error) => {
  console.log(error);
  // TODO: politely report this error to the user
}

const loadTrips = () => {
  displayStatus("loading trips...");

  const tripList = $('#trip-list');
  tripList.empty();

  axios.get(baseURL)
    .then((response) => {
      displayStatus(`Successfully loaded ${response.data.length} trips`);
      response.data.forEach((trip) => {
        tripList.append(`<li><a href="#" data-trip-id=${trip.id}> ${trip.name}</a></li>`);
      });
      $(`#trip-list li`).click(showTripDetails);
      // $(`#trip-list li`).click(function () {
      //   $('.reserve-trip').toggle();
      // })
    })
}

const showTripDetails = (event) => {
  event.preventDefault();

  console.log("showing details for trip", $(event.target).html());
  let byIdUrl = (baseURL + '/' + `${$(event.target).data("trip-id")}`);

  axios.get(byIdUrl)
    .then((response) => {
      $('#trip-details').html("<li>Name: " + response.data.name + "</li>");
      $('#trip-details').append("<li>ID: " + response.data.id + "</li>");
      $('#trip-details').append("<li>Continent: " + response.data.continent + "</li>");
      $('#trip-details').append("<li>Category: " + response.data.category + "</li>");
      $('#trip-details').append("<li>Weeks: " + response.data.weeks + "</li>");
      $('#trip-details').append("<li>Cost: $" + response.data.cost + "</li>");
      $('#trip-details').append("<li>About: " + response.data.about + "</li>");
    })
    .catch((error) => {
      displayStatus(`Encountered an error while loading trips: ${error.message}`);
    });
};

const readFormData = () => {
  const parsedFormData = {};

  const nameFromForm = $(`#reserve-trip-form input[name="name"]`).val();
  parsedFormData['name'] = nameFromForm ? nameFromForm : undefined;

  const emailFromForm = $(`#reserve-trip-form input[name="email"]`).val();
  parsedFormData['email'] = emailFromForm ? emailFromForm : undefined;
}

const reserveTrip = (trip) => {
  console.log("reserving trip", trip)

  // TODO: Wave 2
  // reserve a spot on the trip when the form is submitted
}

$(document).ready(() => {
  $('#load-trips').click(loadTrips);
  // $('#trip-details').hide();
});
