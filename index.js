const baseURL = "https://trektravel.herokuapp.com/trips";

const reportStatus = (message) => {
  $('#status-messages').html(message);
};

const getAllTrips = () => {
  let allTrips = [];
  axios.get(baseURL)
  .then((response) => {
    response.data.forEach((trip) =>
    allTrips.push(trip)
  )})
  .catch((error) => {
    reportStatus(`Encountered an error while loading trips: ${error.message}`);
    console.log(error);
  });
  return allTrips;
}

const tripList = getAllTrips();

const displayAllTrips = () => {
    reportStatus(`Successfully loaded all trips!`);
    tripList.forEach((trip) =>
    $("#all-trips-list").append(`<li id="${trip.id}" class="list-group-item">${trip.name}</li>`)
  )
};

const generateRegistrationForm = (element) => {
  $(element).append(
    "<form><label for='name'>Name:</label> <input type='text' id='name'><label for='email'>Email address:</label> <input type='text' id='email'><button type='submit'>Submit Registration</button></form>"
  );
}

const displayTripDetails = (event) => {
  axios.get(baseURL + `/${event.target.id}`)
  .then((response) => {
    let details = response.data;
    $("#trip-details").empty();
    $("#trip-details .card-body").append(`<h2 class="card-title">${details.name}</h2>`);
    $("#trip-details").append(`<p>ID: ${details.id}</p>`);
    $("#trip-details").append(`<p>${details.continent}</p>`);
    $("#trip-details").append(`<p>${details.category}</p>`);
    $("#trip-details").append(`<p>${details.weeks} weeks</p>`);
    $("#trip-details").append(`<p>${details.about} </p>`);
    $("#trip-details").append(`<p>$${details.cost} </p>`);
    $("#trip-details").append(`<h2>Register for ${details.name}</h2>`);
    generateRegistrationForm("#trip-details");
  })
  .catch((error) => {
    reportStatus(`There was an error while loading the trip details: ${error.message}`);
    console.log(error);
  });
}

$(document).ready ( () => {
  $("#see-trips").click(displayAllTrips);

  $("#all-trips-list").on("click", "li", displayTripDetails);
});




