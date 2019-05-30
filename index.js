const onClick = function(action, listener) {
  listener.click(() => {
    action();
    console.log('click');
  });
};

const getTrips = () => {
  $(`#trekList`).append(`<ul id="tripList">`);
  const allTrips = $('#tripList');
  allTrips.append(`<h2>All Trips</h2>`);
  axios
    .get('https://trektravel.herokuapp.com/trips')
    .then(response => {
      response.data.forEach(trip => {
        allTrips.append(`<li id="${trip.id}">${trip.name}</li>`);
      });
    })
    .catch(error => {});
};

// const getTrip(trip)
$(document).ready(() => {
  onClick(getTrips, $('#tripBtn'));
  console.log($('li'));
  $('li').click(function(event) {
    console.log(event, 'asdfasdfasdfasdfasdf');
  });
});
