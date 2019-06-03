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

const baseTripsURL = axios.defaults.baseURL = "https://trektravel.herokuapp.com/trips/"

const loadTrips = () => {
  const tripList = $("#trips-list");
  const tripListContainer = $('#all-loc');
  tripList.empty('');

  axios.get(baseTripsURL)
    .then((response) => {
      response.data.forEach(location => {
        tripList.append(`<li><a class="show-loc" href="${baseTripsURL}${location.id}">${location.name}</a></li>`)
      })
      
    })
    .catch((error) => {
      console.log(error)
      if (error.response.data && error.response.data.errors) {
        reportError(
          `Encountered an error: ${error.message}`,
          error.response.data.errors
        );
      } else {
        reportStatus(`Encountered an error: ${error.message}`);
      }
    } 
  )
  tripListContainer.prepend("<h2>All Locations</h2>")  
}

const buildDetails = (data) => {
  
  $("#show-details").removeClass()
  $("#trip-details")
    .html(`
    <li id="res-id">${data.id}</li>
    <li>${data.name}</li>
    <li>${data.category}</li>
    <li>${data.continent}</li>
    <li>${data.about}</li>
    <li>${data.weeks}</li>
    <li>${data.cost}</li>
  `);

}
const showLocation = (event) => {
  event.preventDefault()
  axios.get(event.target.href)
    .then((response) => {
      console.log(response.data);
      buildDetails(response.data);
    })
    .catch((error) => {
      console.log(error)
      if (error.response.data && error.response.data.errors) {
        reportError(
          `Encountered an error: ${error.message}`,
          error.response.data.errors
        );
      } else {
        reportStatus(`Encountered an error: ${error.message}`);
      }
    })
}  
  
const readFormData = (event) => {
  let parsedFormData = {}
  let arrayData = event.serializeArray();
  parsedFormData.name = arrayData[0].value;
  parsedFormData.email = arrayData[1].value;

  return parsedFormData;
}
const clearTripForm = () => {
  $('#trip-form input[name="full-name"]').val('');
  $('#trip-form input[name="email"]').val('');
}

const makeReservation = (event) => {
  event.preventDefault();

  let resID = $('#res-id').html()
  // console.log(`${reserveURL}${resID}/reservations`)
  reportStatus('Sending trip reservation...');
  let reserveData = readFormData($('#reserveDeets'))

  axios.post(`${baseTripsURL}${resID}/reservations`, reserveData)
    .then((response) => {
      console.log(response);
      reportStatus(`Successfully added a reservation with ID ${response.data.id}!`);
      clearTripForm();
    })
    .catch((error) => {
      console.log(error)
      if(error.response.data && error.response.data.errors) {
        reportError(
          `Encountered an error: ${error.message}`,
          error.response.data.errors
        );
      } else {
        reportStatus(`Encountered an error: ${error.message}`);
      }
  })
}
  
$(document).on('click', '.show-loc', showLocation)
$(document).on('click', '#res-button', makeReservation)

$(document).ready(() => {
  $("#trips-button").click(loadTrips)
  $("form").submit(readFormData);
});
