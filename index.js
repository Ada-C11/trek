const loadTrips = () => {
  // reportStatus('Loading trips...');

  // Prep work
  const URL = 'https://trektravel.herokuapp.com/trips'
  // const tripsList = $('#trips');
  // tripsList.empty();
  $('section').empty();

  // setTimeout(() => {
    axios.get(URL)
    .then((response) => {
      // reportStatus(`Successfully loaded ${response.data.length} Trips`);
      $('section').append('<table id="trips"><tr><th>All Trips</th></tr></table>')

      response.data.forEach((trip) => {
            const loadOneTrip = () => {
              const URL = `https://trektravel.herokuapp.com/trips/${trip.id}` 
              axios.get(URL)
              .then((response) => {
                $(`#${trip.id}`).append(`<table class="info"><tr><td>Name: ${trip.name}</td></tr><tr><td>Continent: ${trip.continent}</td></tr><tr><td>Category: ${trip.category}</td></tr><tr><td>Weeks: ${trip.weeks}</td></tr><tr><td>Cost: $${trip.cost}</td></tr><tr><td>About: Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit...</td></tr></table>`);
                // $(`#${trip.id}`).unbind('click', loadOneTrip);
              })
              .catch((error) => {
                // reportStatus(`Encountered an error while loading pets: ${error.message}`);
                console.log(error);
              });
            }
        $('#trips').append(`<tr><td id='${trip.id}'>${trip.name}</td></tr>`);

        $(`#${trip.id}`).hover(() => {
          $(`#${trip.id}`).css({'color': '#ff4949', 'font-weight': 'bold'});
        }, () => {
          $(`#${trip.id}`).css({'color': 'black', 'font-weight': 'normal'});
        });
        $(`#${trip.id}`).one('click', loadOneTrip);
      });
    })
    .catch((error) => {
      // reportStatus(`Encountered an error while loading pets: ${error.message}`);
      console.log(error);
    });
  // }, i*1000);
}

$(document).ready(() => {
  $('#load').click(loadTrips);
})