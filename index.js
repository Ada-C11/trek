// index.js
const URL = "https://trektravel.herokuapp.com/trips"

let tripIDs = []

const loadTrips = () => {

  tripList = $('#trip-list');
  tripList.empty();


  axios.get(URL)
    .then((response) => {
      response.data.forEach((trip) => {
        tripList.append(`<li id="${trip.id}"><a href="#">${trip.name}</a></li>`);
        // tripIDs.push(trip.id)
        $("#" + trip.id).click( () => {loadDetails(trip.id)})
        })
    })
    .catch((error) => {
      console.log(error);
    });

};


const loadDetails = (id) => {
  const tripDetails = $('#detail-list');
  tripDetails.empty()

  axios.get(URL+"/"+ id)
  .then((response) => {
      let titles = ["name", "continent", "about", "category", "weeks", "cost"]
      titles.forEach((title) => {
        tripDetails.append(`<li>${title}: ${response["data"][title]}</li>`);
      })

  })
  .catch((error) => {
    console.log(error);
  });
  
};

$(document).ready(() => {
  // $("#current-trips").on('click', "li", function(event) {
  //   alert(`Got a click on an <li> containing "${$(this).html()}"`);
  // })
  $('#load').click(loadTrips);

});


  // tripIDs.forEach((id) => {
  //   $("#" + id).click(loadDetails);
  // })


  // $("#detail-button").click(loadDetails);


// tripList.forEach((trip) => {
//   $("#view-trip").click(loadTrips);
// })

// const loadDetails = (id) => {
//   console.log("made it")
//   const tripDetails = $('detail-list');
//   tripDetails.empty()
//   tripDetails.append(`<li>made it</li>`)

//   axios.get(URL+"id")
//   .then((response) => {
//       tripDetails.append(`<li>made it</li>`);
//   })
//   .catch((error) => {
//     console.log(error);
//   });
  
// };