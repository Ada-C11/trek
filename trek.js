TRIP_URL = "https://trektravel.herokuapp.com/trips"

const loadTrips = () => {
  
  const tripList = $('#trip-list')

  axios.get(TRIP_URL)
    .then((response) => {
      response.data.forEach((trip) => {
        tripList.append(`<li class="trip-name">${trip.name}</li>`)
        
      }) 
      // $("#trip-details").append(`<li>${trip.id}</li>`) 
      $(".trip-name").append('<ul id="trip-details">')
      $('#trip-details').append("<li>Hello</li>")
    })
      
  

    
}


$(document).ready(() => {
  $('#load-trips').click(loadTrips);

});
