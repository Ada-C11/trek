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

  axios.get(url)
    .then(response => {
      reportStatus(`Successfully loaded ${response.data.length} trips`);
      console.log(response.data);
      response.data.forEach(trip => {
        tripList.append(`<li id="${trip.id}" class="trip">${trip.name}</li>`);
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

  axios.get(url + id)
    .then((response) => {
      // reportStatus(`Successfully loaded ${response.data.length} pets`);
      console.log(response.data);
      const keys = Object.keys(response.data);
      console.log(keys);
      keys.forEach(key => {
        console.log(key);
        console.log(response.data[key]);
        tripDetails.append(`<li>${key}: ${response.data[key]}</li>`)
      });
      // console.log(field);
      //   tripDetails.append(`<li>${field.name}: ${field.value}</li>`);

    })
    .catch((error) => {
      reportStatus(`Encountered an error while loading trips: ${error.message}`);
      console.log(error);
    });


  // let id = $(this).attr('id');
  // let id = target.id;
  console.log(id);
  console.log("inside trip details ")
}

$(document).ready(() => {
  $('#load-trips').click(loadTrips);
  $('#trip-list').on('click', 'li', function (event) {
    let id = $(this).attr('id');
    console.log("trip pressed");
    tripDetails(id);
  });
});