const URL = 'https://trektravel.herokuapp.com/trips';

const reportStatus = (message) => {
  $('#status-message').html(message);
};

const reportApiError = (error) => {
  console.log("encountered error when posting", error);

  let errorHtml = `<p>${error.message}</p><ul>`;

  const fieldProblems = error.response.data.errors;

  Object.keys(fieldProblems).forEach(field => {
    const problems = fieldProblems[field];
    problems.forEach(problem => {
      errorHtml += `<li><strong>${field}:</strong> ${problem}</li>`;
    });
  });

  errorHtml += '</ul>';
  reportStatus(errorHtml);
}

const loadTrips = () => {
  reportStatus('Loading trips...');

  const tripsList = $('#trips-list');
  tripsList.empty();

  axios.get(URL)
    .then((response) => {
      reportStatus(`Successfully loaded ${response.data.length} trips`);
      response.data.forEach((trip) => {
        tripsList.append(`<li class=${trip.id}>${trip.name}</li>`);
        // tripsList.append(`<li class=${trip.id}><a href=${URL}/${trip.id}>${trip.name}</a></li>`);
      });
    })
    .catch((error) => {
      reportStatus(`Encountered an error while loading trips: ${error.message}`);
      console.log(error);
    });
};

// add event listener to each link and capture the id to use in the get request
// make the names in the list name a link using the id of the trip
const loadIndividualTrip = (id)=> {
    reportStatus('Loading trip...');
    const tripDetails = $('.trip-details');
    tripDetails.empty();

    axios.get(`${URL}/${id}`)
     .then((trip) => {
         console.log(trip);
       
            tripDetails.append(`<li class="name">${trip.data.name}</li>`);
            tripDetails.append(`<li class="continent">${trip.data.continent}</li>`);
            tripDetails.append(`<li class="category">${trip.data.category}</li>`);
            tripDetails.append(`<li class="weeks">${trip.data.weeks}</li>`);
            tripDetails.append(`<li class="cost">${trip.data.cost}</li>`);
            tripDetails.append(`<li class="about">${trip.data.about}</li>`);

     })

     
    .catch((error) => {
            reportStatus(`Encountered an error while loading trips: ${error.message}`);
            console.log(error);
 

     });


    
}

// const readPetForm = () => {
//   return {
//     // name: "dan's ports pet don't use this name please I need it for debugging",
//     age: 14,
//     owner: "ports"
//   };
// }

// const addPet = () => {
//   const petData = readPetForm();

//   reportStatus("About to post pet data...");
//   console.log("About to post pet data", petData);

//   axios.post(URL, petData)
//     .then((response) => {
//       console.log("successfully posted pet data", response);

//       const petId = response.data.id;
//       reportStatus(`Successfully created a new pet with ID ${petId}`);
//     })
//     .catch((error) => {
//       reportApiError(error);
//     })
// };

// OK GO!!!!!
$(document).ready(() => {
  $('#load').click(loadTrips);

  $('.current-trips').on('click', 'li', function(event){
    let tripClass = this.className;
    loadIndividualTrip(tripClass);
  });
//   $()loadIndividualTrip();

  $('#reserve-form').submit((event) => {
    event.preventDefault();
    // addPet();

  });
});