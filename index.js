const ALLTRIPS = 'https://trektravel.herokuapp.com/trips';
const CONTINENTS = 'https://trektravel.herokuapp.com/trips/continent?query=Asia'
const TRIPID = 'https://trektravel.herokuapp.com/trips/1'
//
// Status Management
//
const reportStatus = (message) => {
  $('#status-message').html(message);
};

//
// Loading Pets
//
const loadTrips = () => {
  reportStatus('Loading trips...');

  const tripList = $('#trip-list');
  tripList.empty();

  axios.get(ALLTRIPS)
    .then((response) => {
      reportStatus(`Successfully loaded ${response.data.length} trips`);
      response.data.forEach((trip) => {
        tripList.append(`<li>${trip.name}</li>`);
      });
    })
    .catch((error) => {
      reportStatus(`Encountered an error while loading trips: ${error.message}`);
      console.log(error);
    });
};



// const createPet = (event) => {
//   event.preventDefault();

//   //WE START HERE!!!

//   reportStatus('Sending pet data...');

//   axios.post(URL, petData)
//     .then((response) => {
//       reportStatus(`Successfully added a pet with ID ${response.data.id}!`);
//       clearForm();
//     })
//     .catch((error) => {
//       console.log(error.response);
//       reportStatus(`Encountered an error while loading pets: ${error.message}`)
//     });
// };

//
// OK GO!!!!!
//
$(document).ready(() => {
  $('#load-trips').click(loadTrips);
  // $('#pet-form').submit(createPet);
});