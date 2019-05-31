const baseURL = "https://trektravel.herokuapp.com/trips";

$("#see-trips").click( function() {
  axios.get(baseURL)
  .then((response) => {
    response.data.forEach((trip) =>
    $(".trips").append(`<li>${trip.name}</li>`)
  )})
}) 