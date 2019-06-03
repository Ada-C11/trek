const tripsURL = 'https://trektravel.herokuapp.com/trips';
//
// Status Management
//
const reportStatus = (message) => {
  $('#status-message').html(message);
};

const reportError = (message, errors) => {
  let content = `<p>${message}</p><ul>`;
  for (const field in errors) {
    for (const problem of errors[field]) {
      content += `<li>${field}: ${problem}</li>`;
    }
  }
  content += "</ul>";
  reportStatus(content);
};

const showTrip = (trip) => {
  const target = $('#trip-details');
  target.empty();
  target.append(
    `<li>ID: ${trip.id}</li>
    <li>Name: ${trip.name}</li>
    <li>Category: ${trip.category}</li>
    <li>Continent: ${trip.continent}</li>
    <li>Cost: ${trip.cost}</li>
    <li>Duration in weeks: ${trip.weeks}</li>`
  )
}

const callTrip = (id) => {
  
  const loadTrip = () => {
    axios.get(tripsURL+`/${id}`)
      .then((response) => {
        showTrip(response.data);
      })
      .catch((error) => {
        reportStatus(`Encountered an error while loading trips: ${error.message}`);
        console.log(error);
      });
  }
  return loadTrip;
};

//
const loadTrips = () => {
  const target = $(`#trip-list`);
  target.empty();
  
  reportStatus('Loading trips...');

  axios.get(tripsURL)
  .then((response) => {
    const trips = response.data;

    reportStatus(`Successfully loaded ${trips.length} trips`);

    trips.forEach((trip) => {
      target.append(`<li class='trip-item'><a href='#'>${trip.name}</a></li>`);
      
      const tripClickHandler = callTrip(trip.id);
      // console.log(`${trip.id}`)
      $(`.trip-item`).on('click', tripClickHandler);
    })
    
  })

  .catch((error) => {
    reportStatus(`Encountered an error while loading trips: ${error.message}`);
    console.log(error);
  });
};

//
// Creating trips
//
const readFormData = () => {
  const parsedFormData = {};

  const nameFromForm = $(`#trip-form input[name="name"]`).val();
  parsedFormData['name'] = nameFromForm ? nameFromForm : undefined;

  const emailFromForm = $(`#trip-form input[name="email"]`).val();
  parsedFormData['email'] = emailFromForm ? emailFromForm : undefined;

  return parsedFormData;
};

const clearForm = () => {
  $(`#trip-form input[name="name"]`).val('');
  $(`#trip-form input[name="email"]`).val('');
}

const createTrip = (event) => {
  // Note that createTrip is a handler for a `submit`
  // event, which means we need to call `preventDefault`
  // to avoid a page reload
  event.preventDefault();

  const tripData = readFormData();
  console.log(tripData);

  reportStatus('Sending trip data...');

  axios.post(tripsURL, tripData)
    .then((response) => {
      reportStatus(`Successfully added a trip with ID ${response.data.id}!`);
      clearForm();
    })
    .catch((error) => {
      console.log(error.response);
      if (error.response.data && error.response.data.errors) {
        reportError(
          `Encountered an error: ${error.message}`,
          error.response.data.errors
        );
      } else {
        reportStatus(`Encountered an error: ${error.message}`);
      }
    });
};



$(document).ready(() => {
  $('#load').click(loadTrips);
  $('#trip-form').submit(createTrip);
});
