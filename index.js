
const tripsUrl = 'https://trektravel.herokuapp.com/trips';

const displayStatus = (message) => {
    $('#status').html(message);
  }
  
  const handleApiError = (error) => {
    console.log(error);
    // TODO: politely report this error to the user
  }
  
//   const loadTrips = () => {
//     displayStatus("loading trips...");
  
//     axios.get(https://trektravel.herokuapp.com/trips)
//     .then((response) => {
//       response.data.forEach((pet) => {
//         petList.append(`<li>${pet.name}</li>`);
//       });
//     })
//     .catch((error) => {
//       console.log(error);
//     });
// };

const loadTrips = () => {
    const tripList = $('#trip-list');
    tripList.empty();
    
    axios.get(tripsUrl)
      .then(function (response) {
        response.data.forEach((trip) => {
            tripList.append(`<li>${trip.name}</li>`);
          });
    
          console.log(response);
        // resultElement.innerHTML = generateSuccessHTMLOutput(response);
      })
      .catch(function (error) {
          console.log(error);
        // resultElement.innerHTML = generateErrorHTMLOutput(error);
      });   
  }
    // TODO: Wave 1
    // make an axios call to the trips index and display the results
  
  const showTripDetails = (trip) => {
    console.log("showing details for trip", trip);
  
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
  });