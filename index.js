const baseURL = "https://trektravel.herokuapp.com/trips";

$("button").click( function() {
  axios.get(baseURL)
  .then((response) => {
    response.data.forEach((trip) =>
    $(".trips").append(`<li>${trip.name}</li>`)
  )})
}) 