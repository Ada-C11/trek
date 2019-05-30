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
    })
}


const showTripDetails = (event) => {
  event.preventDefault();
  console.log("showing details for trip", $(event.target).html());
  let byIdUrl = (baseURL + '/' + `${$(event.target).data("trip-id")}`);
  console.log(byIdUrl)

  axios.get(byIdUrl)
    .then((response) => {
      $('#trip-list').append(response.data.id);
    })

  // TODO: Wave 2
  // display trip details and the trip reservation form
}

const reserveTrip = (trip) => {
  console.log("reserving trip", trip)

  // TODO: Wave 2
  // reserve a spot on the trip when the form is submitted
}

$(document).ready(() => {
  $('#load-trips').click(loadTrips);

  // $('#trip-list').on('click', 'li', function () {
  //   // let id = $(this).attr("id");
  //   console.log(this.id)
  //   showTripDetails(this.id);
  // });
});
