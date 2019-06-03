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
        
      });
    })
    .catch((error) => {
      reportStatus(`Encountered an error while loading trips: ${error.message}`);
      console.log(error);
    });
};


const loadIndividualTrip = (id)=> {
    reportStatus('Loading trip...');
    const tripDetails = $('.trip-details');
    tripDetails.empty();


    axios.get(`${URL}/${id}`)
     .then((trip) => {
         console.log(trip);
            reportStatus('');
            tripDetails.append(`<li class="name"><strong>Name: </strong> ${trip.data.name}</li>`);
            tripDetails.append(`<li class="continent"><strong>Constinent: </strong> ${trip.data.continent}</li>`);
            tripDetails.append(`<li class="category"><strong>Category: </strong> ${trip.data.category}</li>`);
            tripDetails.append(`<li class="weeks"><strong>Weeks: </strong> ${trip.data.weeks}</li>`);
            tripDetails.append(`<li class="cost"><strong>Cost: </strong> ${trip.data.cost}</li>`);
            tripDetails.append(`<li class="about"><strong>About: </strong> ${trip.data.about}</li>`);
     })

     
    .catch((error) => {
            reportStatus(`Encountered an error while loading trips: ${error.message}`);
            console.log(error);
     });
}

const readtripForm = (name, email) => {
  return {
    name: name,
    email: email,
  };
}


const createReservation = (id, name, email) => {
  const reservationData = readtripForm(name, email);


  reportStatus("Submitting reservation request");
  console.log("reservation request", reservationData);

  axios.post(`${URL}/${id}/reservations`, reservationData)
    .then((response) => {
      console.log("Successfully reserved", response);

      const reservationId = response.data.id;
      reportStatus(`Successfully created a new reservation with ID ${reservationId}`);

    })
    .catch((error) => {
      reportApiError(error);
    })
};

let submitHandler;

// OK GO!!!!!
$(document).ready(() => {
  $('#load').click(loadTrips);

  $('.current-trips').on('click', 'li', function(event){
    let tripClass = this.className;
    console.log(tripClass)
    loadIndividualTrip(tripClass);
    
    if (submitHandler) {
      $('#reserve-form').off("submit", submitHandler );
    }

    submitHandler = (event) => {
      event.preventDefault();
      let name = $('.j').val();
      let email = $('.i').val();
      console.log(name, email);
      createReservation(tripClass, name, email); 
    }
    $('#reserve-form').submit(submitHandler);
  });

});