const loadTrips = () => {
  // reportStatus('Loading trips...');

  // Prep work
  const URL = 'https://trektravel.herokuapp.com/trips'
  const tripsList = $('#trips');
  tripsList.empty();

  // setTimeout(() => {
    axios.get(URL)
    .then((response) => {
      // reportStatus(`Successfully loaded ${response.data.length} Trips`);
      tripsList.append('<tr><th>All Trips</th></tr>')
      response.data.forEach((trip) => {
            const loadOneTrip = () => {
              const URL = `https://trektravel.herokuapp.com/trips/${trip.id}` 
              axios.get(URL)
              .then((response) => {
                $(`#${trip.id}`).append(`<ul id="info"><li>Name: ${trip.name}</li><li>Continent: ${trip.continent}</li><li>Category: ${trip.category}</li><li>Weeks: ${trip.weeks}</li><li>Cost: $${trip.cost}</li><li>About: Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit...</li></ul>`);

              })
              .catch((error) => {
                // reportStatus(`Encountered an error while loading pets: ${error.message}`);
                console.log(error);
              });
            }
        tripsList.append(`<tr><td id='${trip.id}'>${trip.name}</td></tr>`);
        $(`#${trip.id}`).one('click', loadOneTrip);
      });

      // tripsList.append(`<li>${response.data[0].display_name}: ${response.data[0].lat}, ${response.data[0].lon}</li>`);
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

