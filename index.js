
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
      console.log(response.data);
      response.data.forEach(trip => {
        tripList.append(`<li id="${trip.id}" class="trip">${trip.name}</li>`);
        const element = $(`#${trip.id}`);

        element.click(() => tripDetails(trip.id));

      });
    })
    .catch(error => {
      console.log(error);
      reportStatus(`Encountered an error: ${error.message}`);
    });
}

const tripDetails = (id) => {
  const url = baseURL + 'trips/';

  const tripDetails = $('#trip-info-list');
  tripDetails.empty();
  axios.get(url + id)
    .then((response) => {
      reportStatus(`Successfully loaded trip ${id}`);
      console.log(response.data);
      const keys = Object.keys(response.data);
      console.log(keys);
      keys.forEach(key => {
        console.log(key);
        console.log(response.data[key]);
        tripDetails.append(`<li>${key}: ${response.data[key]}</li>`)
      });
      $('#trip-form').submit(() => reserveTrip(id));
    })
    .catch((error) => {
      reportStatus(`Encountered an error while loading trips: ${error.message}`);
      console.log(error);
    });
}

const reserveTrip = (id) => {
  console.log("inside reserve trip")
  const url = baseURL + 'trips/' + id + '/reservations';
  event.preventDefault();
  const tripDetails = readFormData();
  reportStatus('Sending trip data...');
  // const tripDetails = {
  //   name: "Mudkip",
  //   email: "kats>dogs@cat4life.com"
  // };
  console.log("reset trip form");
  $('#trip-form').trigger('reset');

  axios.post(url, tripDetails)
    .then((response) => {
      reportStatus(`Successfully added a trip to ${response.data}!`)
    })
    .catch((error) => {
      console.log(error.response);
      reportStatus(`Encountered an error while reserving trip: ${error.message}`)
    });
  console.log("reset trip form")
  // $('#trip-form').reset();
}


const readFormData = () => {
  const tripData = $('#trip-form').serializeArray();
  const parsedFormData = {};
  console.log(tripData);
  for (let field in tripData) {
    console.log(field.name)
    parsedFormData[tripData[field].name] = tripData[field].value
  }
  console.log(parsedFormData);
  return parsedFormData;
};

$(document).ready(() => {
  $('#load-trips').click(loadTrips);
  // $('#trip-form').submit(reserveTrip);

});
