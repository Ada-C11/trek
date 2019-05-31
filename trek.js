TRIP_URL = "https://trektravel.herokuapp.com/trips/"


const loadTrips = () => {
  
  const tripList = $('#trip-list');
  tripList.empty();
  
  axios.get(TRIP_URL)
    .then((response) => {
      response.data.forEach((trip) => {
        tripList.append(`<li>${trip.name}</li>`)
        // $(`#${trip.id}`).append(`<ul id="trip-details-${trip.id}">`)
        const showDetails = () => {

          const tripDetail = () => {
            axios.get(TRIP_URL + trip.id)
            .then((response) => {
              const detail = $('.details')
              detail.empty();
              
              detail.html(`<h1>Trek Trip Details<h1> 
                <h2>Trip Name: ${response.data.name}</h2>
                <h3>Continent: ${response.data.continent}</h3>
                <h3>Category: ${response.data.category}</h3>
                <h3>Weeks: ${response.data.weeks}</h3>
                <h3>Cost: $${response.data.cost}</h3>
                <h3>About: </h3>
                <p>${response.data.about}</p>`)
          // $(`#trip-details-${trip.id}`).append(`
          //     <li class="detail">${trip.id}</li>
          //     <li class="detail">${trip.name}</li>
          //     <li class="detail">${trip.continent}</li>
          //     <li class="detail">${trip.category}</li>
          //     <li class="detail">${trip.weeks}</li>
          //     <li class="detail">${trip.cost}</li>`
          //   )
          }) 
          
          }
          return tripDetail;
          
        };
        const selectedTrip = showDetails(trip);
       
          $('li:last').click(selectedTrip);
        
      }) 
   
    })
}




// const showDetails = () => {
//   let detail = $('.detail');

  // $('.trip-name').click( function() {
  //   // console.log($(this))
  //   $(this).toggleClass('hide');
  // });

  // if (detail.addClass('show')) {
  //   detail.removeClass('show');
  //   detail.addClass('hide');
  // } else {
  //   detail.removeClass('hide')
  //   detail.addClass('show');
  // }
// }

$(document).ready(() => {
  $('#load-trips').click(loadTrips);

  //  $('#trip-list').on('click', function(event) {
  //    console.log(event.target)
  //   alert(`Got a click on an <li> containing "${$(event.target).html()}"`);
  // }); 

  // $("ul#trip-list").on("click","li", function(){

  //   let element = $(this).find(`#trip-details${this.id}`)
  //   console.log(element)
    
  //   element.toggleClass('hide')
    // .find("span.t").text());
//  });
  
});
