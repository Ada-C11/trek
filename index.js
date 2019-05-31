const URL = 'https://trektravel.herokuapp.com/trips';

const reportStatus = (message) => {
  $('#status-message').html(message);
};

const displayTripList = (tripList) => {
  const target = $('#trip-list');
  target.empty();
  tripList.forEach((trip) => {
    target.append(`<li>${trip.name}</li>`);
  });
}

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

$(document).ready(() => {
  $('#load').click(loadTrips);
});