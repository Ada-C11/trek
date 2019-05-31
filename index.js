
const tripsUrl = 'https://trektravel.herokuapp.com/trips';

const displayStatus = (message) => {
    $('#status').html(message);
  };
  
  // const handleApiError = (error) => {
  //   console.log(error);
  //   // TODO: politely report this error to the user
  // }

  // const reportError = (message, errors) => {
  //   let content = `<p>${message}</p><ul>`;
  //   for (const field in errors) {
  //     for (const problem of errors[field]) {
  //       content += `<li>${field}: ${problem}</li>`;
  //     }
  //   }
  //   content += "</ul>";
  //   reportStatus(content);
  // };

// makes an axios call to the trips index and display the results
const loadTrips = () => {
    const tripList = $('#trip-list');
    tripList.empty();

    axios.get(tripsUrl)
      .then(function (response) {
        response.data.forEach((trip) => {
            tripList.append(`<li><a href="" class="trip-link" id="${trip.id}">${trip.name}</a></li>`);
          });

          console.log(response);
        // resultElement.innerHTML = generateSuccessHTMLOutput(response);
      })
      .catch(function (error) {
          console.log(error);
        // resultElement.innerHTML = generateErrorHTMLOutput(error);
      });   
  }

  const showTripDetails = (trip) => {
    console.log("showing details for trip", trip);

    const tripDetails = $('#trip-details');
    tripDetails.empty();

    axios.get(tripsUrl)
      .then(function (response) {
        response.data.forEach((trip) => {
          tripDetails.append(`<li>${trip.id}</li>`);
        });
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });   
    } 
  
    // TODO: Wave 2
    // display trip details and the trip reservation form
  // }
  
  const reserveTrip = (trip) => {
    console.log("reserving trip", trip)
  
    // TODO: Wave 2
    // reserve a spot on the trip when the form is submitted
  }
  
  $(document).ready(() => {
    $('#load-trips').click(loadTrips);
  });