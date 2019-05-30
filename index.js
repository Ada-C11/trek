const baseURL = "https://trektravel.herokuapp.com/"

$(document).ready(() => {
  $('#load-trips').click(loadTrips);

  // $('.trip').click(tripDetails);

  $('#trip-list').on('click', 'li', function (event) {
    let id = $(this).attr('id');
    console.log("trip pressed");
    tripDetails(id);

  });

  // $(document).on('click', 'file999', function() {
  //   var i = $(this).attr('id');
  //   alert(i);
  // });


});

const loadTrips = () => {
  const url = baseURL + 'trips';
  const tripList = $('#trip-list')

  axios.get(url)
    .then(response => {
      // reportStatus(`Successfully loaded ${response.data.length} trips`);
      console.log(response.data);
      response.data.forEach(trip => {
        tripList.append(`<li id="${trip.id}" class="trip">${trip.name}</li>`);
      });
    })
    .catch(error => {
      console.log(error);
    });
}

const tripDetails = (id) => {
  const url = baseURL + 'trips/';
  // let id = $(this).attr('id');
  // let id = target.id;
  console.log(id);
  console.log("inside trip details ")
}

// const tripDetails = () => {
//   const url = baseURL + 'trips/';
//   // let id = $(this).attr('id');
//   let id = event.target.id;
//   console.log(id);
//   console.log("inside trip details ")
// }