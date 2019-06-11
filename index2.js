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

const loadTreks = () => {
  const trekList = $('#trek-list');
  trekList.empty();

  let URL = 'https://trektravel.herokuapp.com/trips'
  axios.get(URL)
    .then((response) => {
      reportStatus(`Successfully loaded ${response.data.length} trips`);
      console.log('successfully loaded all trips');

      const theTreks = response.data;

      theTreks.forEach((trek) => {
        let thisTrek = $(`<li>${trek.name}</li>`);
        thisTrek.addClass(`${trek.id}`);
        trekList.append(thisTrek);
      })
    })

    .catch((error) => {
      reportStatus(`Encountered an error while loading treks: ${error.message}`);
      console.log(error);
    })

    const showTrekDetails = (event) => {
        let trekId = event.target.className;
        let detailsURL = `https://trektravel.herokuapp.com/trips/${trekId}`;

        const detailSection = $('#details');
        detailSection.empty();
        
        axios.get(detailsURL)
          .then((response) => {
            reportStatus(`Successfully loaded trip ${trekId}`);
            console.log('successfully loaded trip!');

            detailSection.html(
              `<h1>${response.data.name}</h1>
              <h3>Continent: ${response.data.continent}</h3>
              <h3>Category: ${response.data.category}</h3>
              <h3>Weeks: ${response.data.weeks}</h3>
              <h3>Cost: $${response.data.cost}</h3>
              <h3>About: </h3>
              <p>${response.data.about}</p>`
              // <button class=${trekId}> Make reservation </button>`
            )
            reservationForm();
            $('#reservation-form').on('submit', makeReservation); 
          })

        .catch((error) => {
          reportStatus(`Something went wrong with loading trip ${trekId}: ${error}`);
          console.log(`Something went wrong with loading trip ${trekId}: ${error}`);
        });

        const makeReservation = (event) => {
          event.preventDefault();
          // const trekId = event.target.className;
          console.log(`trek id: ${trekId}`)
          let reservationURL = `https://trektravel.herokuapp.com/trips/${trekId}/reservations`
        
          const trekData = readFormData();
        
          reportStatus('Sending trek data...');
        
          axios.post(reservationURL, trekData)
            .then((response) => {
            console.log(response);
            reportStatus('Successfully reserved a trek!');
            clearForm();
            })
        
            .catch((error) => {
            console.log(error.response);
            // Make sure the server actually sent us errors. If
            // there's a different problem, like a typo in the URL
            // or a network error, the response won't be filled in.
            if (error.response.data && error.response.data.errors) {
              // User our new helper method
              reportError(`Encountered an error: ${error.message}`,
                error.response.data.errors
              );
            } else {
              // This is what we had before
              reportStatus(`Encountered an error: ${error.message}`);
            }
          });
        };

      
    };

      const reservationForm = () => {
        const detailSection = $('#details');
        detailSection.append('<h1>Make a Reservation</h1>')
        detailSection.append('<form id="reservation-form">')
        $('#reservation-form').append('<div>')
        $('#reservation-form').append('<label for="name"> Name </label>')
        $('#reservation-form').append('<input type="text" name="name"  />')
        // detailSection.append('</div>')
        $('#reservation-form').append('<div>')
        $('#reservation-form').append('<label for="email">Email</label>')
        $('#reservation-form').append('<input type="text" name="email"  />')
        // detailSection.append('</div>')
        $('#reservation-form').append('<div>')
        $('#reservation-form').append('<label for="age">Age</label>')
        $('#reservation-form').append('<input type="number" min="0" name="age" />')
        // detailSection.append('</div>')
        $('#reservation-form').append('<br>')
        $('#reservation-form').append('<input type="submit" name="make-reservation" value="Reserve!!" />');
        // detailSection.append('</form>')
        // $('#reservation-form').submit(makeReservation); 
      }
      
      $("#trek-list").on('click', 'li', showTrekDetails);
      // $("#details").on('click', 'button', reservationForm);
    };

const readFormData = () => {
  let parsedFormData = {};

  const nameFromForm = $(`#reservation-form input[name="name"]`).val();
  parsedFormData['name'] = nameFromForm ? nameFromForm : undefined;

  const ageFromForm = $(`#reservation-form input[name="age"]`).val();
  parsedFormData['age'] = ageFromForm ? ageFromForm : undefined;

  const emailFromForm = $(`#reservation-form input[name="email"]`).val();
  parsedFormData['email'] = emailFromForm ? emailFromForm : undefined;

  return parsedFormData;
};

const clearForm = () => {
  $(`#reservation-form input[name="name"]`).val('');
  $(`#reservation-form input[name="email"]`).val('');
  $(`#reservation-form input[name="age"]`).val('');
}



    $(document).ready(() => {
      $('#load').click(loadTreks);
      // $('#reservation-form').submit(makeReservation);
});

console.log('dee is here!');

// https://picsum.photos/id/477/500/500