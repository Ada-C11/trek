TRIP_URL = "https://trektravel.herokuapp.com/trips"

TRIP_BY_ID = "https://trektravel.herokuapp.com/trips/"

const loadTrips = () => {
  
  const tripList = $('#trip-list');
  
  axios.get(TRIP_URL)
    .then((response) => {
      response.data.forEach((trip) => {
        // console.log(response.data)
        tripList.append(`<li class="trip-name" id="${trip.id}">${trip.name}</li>`)
        $(`#${trip.id}`).append(`<ul id="trip-details-${trip.id}">`)
        $(`#trip-details-${trip.id}`).append(`<li>${trip.id}</li>`)
        $(`#trip-details-${trip.id}`).append(`<li>${trip.name}</li>`)
        $(`#trip-details-${trip.id}`).append(`<li>${trip.continent}</li>`)
        $(`#trip-details-${trip.id}`).append(`<li>${trip.category}</li>`)
        $(`#trip-details-${trip.id}`).append(`<li>${trip.weeks}</li>`)
        $(`#trip-details-${trip.id}`).append(`<li>${trip.cost}</li>`)
      }) 
      // $("#trip-details").append(`<li>${trip.id}</li>`) 
      // $(".trip-name").append(`<ul id="trip-details-${trip.id}">`)
      // $(`#trip-details-${trip.id}`).append(`<li>${trip.id}</li>`)
    })
}


// const showDetails = () => {

//   const tripDetails = $('#trip.details');

//   axios.get("https://trektravel.herokuapp.com/trips/${})
//     .then((response) => {
//       response.d
//     })
// }


$(document).ready(() => {
  $('#load-trips').click(loadTrips);

  // $('.trip-name').click(showDetails);
});
