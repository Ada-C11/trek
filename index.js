
const baseURL = "https://trektravel.herokuapp.com/"

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

const loadTrips = () => {
  const url = baseURL + 'trips';
  const tripList = $('#trip-list')
  tripList.empty();

  axios.get(url)
    .then(response => {
      reportStatus(`Successfully loaded ${response.data.length} trips`);
      response.data.forEach(trip => {
        tripList.append(`<li id="${trip.id}" class="trip">${trip.name}</li>`);
        const element = $(`#${trip.id}`);
        element.click(() => tripDetails(trip.id));
      });
    })
    .catch(error => {
      reportError(`Encountered an error: ${error.message}`);
    });
}

const tripDetails = (id) => {
  $('.trip-form').show();
  const url = baseURL + 'trips/';
  const tripDetails = $('#trip-info-list');
  tripDetails.empty();

  axios.get(url + id)
    .then((response) => {
      reportStatus(`Successfully loaded trip ${id}`);
      const keys = Object.keys(response.data);
      keys.forEach(key => {
        tripDetails.append(`<li>${key}: ${response.data[key]}</li>`)
      });
      const reserve = () => reserveTrip(id)
      $('#trip-form').off('submit');
      $('#trip-form').submit(reserve);
      // $('#trip-form').submit(() => reserveTrip(id));
      console.log("inside get trip details");
    })
    .catch((error) => {
      reportError(`Encountered an error while loading trips: ${error.message}`, error.response.data.errors);
    });
}

const reserveTrip = (id) => {
  console.log("inside reserve trip");
  const url = baseURL + 'trips/' + id + '/reservations';
  event.preventDefault();
  const tripDetails = readFormData();
  reportStatus('Sending trip data...');
  // $('#trip-form').trigger('reset');

  axios.post(url, tripDetails)
    .then((response) => {
      console.log(response)
      reportStatus(`Successfully reserved trip! Your trip confirmation number is ${response.data.id}!`)

    })
    .catch((error) => {
      console.log(error);
      console.log(error.message)
      reportError(`Encountered an error while reserving trip: ${error.message}`, error.response.data.errors)
    });
  $('#trip-form').trigger('reset');

}


const readFormData = () => {
  const tripData = $('#trip-form').serializeArray();
  const parsedFormData = {};
  for (let field in tripData) {
    parsedFormData[tripData[field].name] = tripData[field].value
  }
  return parsedFormData;
};

$(document).ready(() => {

  $('#load-trips').click(loadTrips);
});
