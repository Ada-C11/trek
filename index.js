const baseURL = "https://trektravel.herokuapp.com/trips";

const getAllTrips = () => {
  let allTrips = [];
  axios.get(baseURL)
  .then((response) => {
    response.data.forEach((trip) =>
    allTrips.push(trip)
  )})
  return allTrips;
}

const tripList = getAllTrips();

const displayAllTrips = () => {
    tripList.forEach((trip) =>
    $("#all-trips-list").append(`<button id="${trip.id}">${trip.name}</button>`)
  )
};

const displayTripDetails = (event) => {

  // const getTripDetails = () => {
  axios.get(baseURL + `/${event.target.id}`)
  .then((response) => {
    let details = response.data;
    $("#trip-details").empty();
    $("#trip-details").append(`<h2>${details.name}</h2>`);
    $("#trip-details").append(`<p>ID: ${details.id}</p>`);
    $("#trip-details").append(`<p>${details.continent}</p>`);
    $("#trip-details").append(`<p>${details.category}</p>`);
    $("#trip-details").append(`<p>${details.weeks} weeks</p>`);
    $("#trip-details").append(`<p>${details.about} </p>`);
    $("#trip-details").append(`<p>$${details.cost} </p>`);
  });

  // return getTripDetails;
}

$(document).ready ( () => {
  $("#see-trips").click(displayAllTrips);

  $("#all-trips-list").on("click", "button", displayTripDetails);
});




