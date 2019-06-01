const URL = 'https://trektravel.herokuapp.com/trips';

const reportStatus = (message) => {
  $('#status-message').html(message);
};

const loadTrips = () => {
  reportStatus('Loading trips...');
  
  axios.get(URL)
    .then((response) => {
      reportStatus(`Successfully loaded ${response.data.length} trips`);
      const trips = response.data;
      displayTripList(trips);
    })
    .catch((error) => {
      reportStatus(`Encountered an error while loading trips: ${error.message}`);
      console.log(error);
    });
};

const displayTripList = (tripList) => {
  const target = $('#trip-list');
  target.empty();
  tripList.forEach((trip) => {
    target.append(`<li id="${trip.id}">${trip.name}</li>`);
    const getDetails = showTripDetails(trip)
    $(`#${trip.id}`).click(getDetails);
  });
}

const showTripDetails = (trip) => {
  console.log("showing details for trip", trip.name);

  const getTripDetails = () => {
    axios.get(URL + '/' + trip.id)
    .then((response) => {
      reportStatus(`Successfully loaded trip ${response.data.name}`);
      const target = $('#trip-details');
      target.empty();
      target.append(`<li>ID: ${response.data.id}</li>`);
      target.append(`<li>Name: ${response.data.name}</li>`);
      target.append(`<li>Continent: ${response.data.continent}</li>`);
      target.append(`<li>About: ${response.data.about}</li>`);
      target.append(`<li>Category: ${response.data.category}</li>`);
      target.append(`<li>Weeks: ${response.data.weeks}</li>`);
      target.append(`<li>Cost: ${response.data.cost}</li>`);
    })
    .catch((error) => {
      reportStatus(`Encountered an error while loading trips: ${error.message}`);
      console.log(error);
    });
  }
  return getTripDetails;
}

$(document).ready(() => {
  $('#load').click(loadTrips);
});