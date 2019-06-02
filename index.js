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
    $("#all-trips-card").addClass("card");

    tripList.forEach((trip) =>
    $("#all-trips-list").append(`<li id="${trip.id}" class="list-group-item">${trip.name}</li>`)
  )
};

const generateRegistrationForm = (element) => {
  $(element).empty();
  $(element).append(`<h2>Register</h2>`);
  $(element).append(
    `<form><label for='name'>Name:</label> <input type='text' id='name' name='name'><label for='email'>Email address:</label> <input type='text' id='email' name='email'><button type='submit' id=${element.id}>Submit Registration</button></form>`
  );
}

const displayTripDetails = (event) => {
  axios.get(baseURL + `/${event.target.id}`)
  .then((response) => {
    let details = response.data;
    $("#trip-details-card").addClass("card");
    $("#trip-form-card").addClass("card");
    $("#trip-details").empty();
    $("#trip-details").append(`<h2 class='card-title'>${details.name}</h2>`);
    $("#trip-details").append(`<h6 class='card-subtitle'><b>Continent:</b> ${details.continent}</h6>`);
    $("#trip-details").append(`<h6 class='card-subtitle'><b>Category:</b> ${details.category}</h6>`);
    $("#trip-details").append(`<h6 class='card-subtitle'><b>ID:</b> ${details.id}</h6>`);
    $("#trip-details").append(`<h6 class='card-subtitle'><b>Price:</b> $${details.cost}</h6>`);
    $("#trip-details").append(`<h6 class='card-subtitle'><b>Number of weeks:</b> ${details.weeks}</h6>`);
    $("#trip-details").append(`${details.about}`);
    $("#trip-form").empty();
    $("#trip-form").append(`<h2>Register</h2>`);
    $("#trip-form").append(
    `<form id=${event.target.id}><label for='name'>Name:</label> <input type='text' id='name' name='name'><label for='email'>Email address:</label> <input type='text' id='email' name='email'><button type='submit'>Submit Registration</button></form>`
  );;
  })
  .catch((error) => {
    reportStatus(`There was an error while loading the trip details: ${error.message}`);
    console.log(error);
  });
}

const submitRegistration = (event) => {
  event.preventDefault();

  let registrationInfo = { 
    name: $("input[name=name]").val(),
    email: $("input[name=email]").val(),
    };
  
    axios.post(baseURL + `/${event.target.id}` + `/reservations`, registrationInfo)
    .then((response) => {
      reportStatus(`Congratulations ${response.data.name}, you've registered for the trip!`);
    })
    .catch((error) => {
      reportStatus(`There was an error while registering for the trip: ${error.message}`);
      console.log(error);
    });


}

$(document).ready ( () => {
  $("#see-trips").click(displayAllTrips);

  $("#all-trips-list").on("click", "li", displayTripDetails);

  $(document).on("submit", "form", submitRegistration);
});




