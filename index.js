const reportStatus = (message) => {
  $('#status').html(message);
}

const loadTrips = () => {
  reportStatus('Loading trips...');

  const URL = 'https://trektravel.herokuapp.com/trips'
  $('#table').empty();

    axios.get(URL)
    .then((response) => {
      reportStatus(`Successfully loaded ${response.data.length} Trips`);
      $('#table').append('<table id="trips"><tr><th>All Trips</th></tr></table>')

      response.data.forEach((trip) => {
            const loadOneTrip = () => {
              if ($('#trip').children().length > 0) {
                $('#trip').empty();
                $('#form').empty();
              }
              const URL = `https://trektravel.herokuapp.com/trips/${trip.id}` 
              axios.get(URL)
              .then((response) => {
                $('#trip').append(`<table>
                  <tr><th>Trip Details</th></tr>
                  <tr><td><b>Name:</b> ${trip.name}</td></tr>
                  <tr><td><b>Continent:</b> ${trip.continent}</td></tr>
                  <tr><td><b>Category:</b> ${trip.category}</td></tr>
                  <tr><td><b>Weeks:</b> ${trip.weeks}</td></tr>
                  <tr><td><b>Cost:</b> $${trip.cost}</td></tr>
                  <tr><td><b>About:</b> Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit...</td></tr>
                </table>`);
                $('#form').append(
                  `<h1>Reserve this Trip</h1>
                  <form id='reservation-form'>
                  <label for='name'>Name</label>
                  <input type='text' name='name'/>
                  <label for='email'>Email</label>
                  <input type='text' name='email'/>
                  <input type='submit' name='reserve' value='Reserve'/>
                </form>`
                );

                // https://github.com/Ada-Developers-Academy/textbook-curriculum/blob/master/10-JavaScript/reference/axios/index.js credit to these notes

                const readFormData = () => {
                  const parsedFormData = {};

                  const nameFromForm = $(`#reservation-form input[name='name']`).val();
                  parsedFormData['name'] = nameFromForm ? nameFromForm : undefined;

                  const emailFromForm = $(`#reservation-form input[name='email']`).val();
                  parsedFormData['email'] = emailFromForm ? emailFromForm : undefined;

                  return parsedFormData;
                };

                const clearForm = () => {
                  $(`#reservation-form input[name='name']`).val('');
                  $(`#reservation-form input[name='email']`).val('');
                }

                const createReservation = (event) => {
                  event.preventDefault();

                  const reservationData = readFormData();
                  console.log(reservationData);

                  reportStatus('Sending reservation data...');
                  const URL = `https://trektravel.herokuapp.com/trips/${trip.id}/reservations`

                  axios.post(URL, reservationData)
                    .then((response) => {
                      reportStatus(`Successfully added a reservation with ID ${response.data.id} for ${trip.name}!`);
                      clearForm();
                    })
                    .catch((error) => {
                      console.log(error.response);
                      if (error.response.data && error.response.data.errors) {
                        reportStatus(
                          `Encountered an error: ${error.message}`,
                          error.response.data.errors
                        );
                      } else {
                        reportStatus(`Encountered an error: ${error.message}`);
                      }
                    });
                };
                $('#reservation-form').submit(createReservation);
              })
              .catch((error) => {
                reportStatus(`Encountered an error while loading s: ${error.message}`);
                console.log(error);
              });
            }

        $('#trips').append(`<tr><td id='${trip.id}'>${trip.name}</td></tr>`);

        $(`#${trip.id}`).one('click', loadOneTrip);

        $(`#${trip.id}`).hover(() => {
          $(`#${trip.id}`).css({'color': '#ff4949', 'font-weight': 'bold'});
        }, () => {
          $(`#${trip.id}`).css({'color': 'black', 'font-weight': 'normal'});
        });
      });
    })
    .catch((error) => {
      reportStatus(`Encountered an error while loading reservations: ${error.message}`);
      console.log(error);
    });
}


$(document).ready(() => {
  $('#load').click(loadTrips);
})