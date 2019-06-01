const baseURL = "https://trektravel.herokuapp.com/trips";

const displayStatus = (message) => {
  $('#status').html(message);
}

const handleApiError = (error) => {
  console.log("Encountered error when posting:", error);

  let content = `<p>${error.message}</p><ul>`;

  const fieldProblems = error.response.data.errors;

  Object.keys(fieldProblems).forEach(field => {
    const problems = fieldProblems[field];
    problems.forEach(problem => {
      content += `<li><strong>${field}:</strong> ${problem}</li>`;
    });
  });
  content += '</ul>';
  displayStatus(content);

}

const loadTrips = () => {
  displayStatus("loading trips...");

  const tripList = $('#trip-list');
  tripList.empty();

  axios.get(baseURL)
    .then((response) => {
      displayStatus(`Successfully loaded ${response.data.length} trips`);
      response.data.forEach((trip) => {
        tripList.append(`<li><a href="#" data-trip-id=${trip.id}> ${trip.name}</a></li>`);
      });
      $("#trip-list li").on('click', showTripDetails);
    })
    .catch((error) => {
      displayStatus(`Encountered an error while loading trips: ${error.message}`);
      console.log(error);
    });
}

const formatTripDetails = (tripDetails) => {
  const target = $('#trip-details-list');
  target.empty();

  Object.keys(tripDetails).forEach(function (detail) {
    target.append(`<li id="${detail}"><strong>${detail}:</strong> ${tripDetails[detail]}</li>`);
  });
}

// const showTripDetails = (event) => {
//   event.preventDefault();

//   console.log("showing details for trip", $(event.target).html());
//   const byIdUrl = (baseURL + '/' + `${$(event.target).data("trip-id")}`);

// axios.get(byIdUrl)
//   .then((response) => {
//     formatTripDetails(response.data);
//     $("#reserve-trip").show();
//     $('#reserve-trip-form').addClass(`${response.data.id}`).submit(reserveTrip);
//   })
//   .catch((error) => {
//     console.log(error);
//   });

const readFormData = () => {
  const parsedFormData = {};

  const nameFromForm = $(`#reserve-trip-form input[name="name"]`).val();
  parsedFormData['name'] = nameFromForm ? nameFromForm : undefined;

  const emailFromForm = $(`#reserve-trip-form input[name="email"]`).val();
  parsedFormData['email'] = emailFromForm ? emailFromForm : undefined;

  return parsedFormData;
};

const clearForm = () => {
  $(`#reserve-trip-form input[name="name"]`).val('');
  $(`#reserve-trip-form input[name="email"]`).val('');
}

const reserveTrip = (event) => {
  event.preventDefault();

  const tripID = parseInt($('#reserve-trip-form').attr('class'));

  const reservationParams = readFormData();

  displayStatus('Reserving your spot...');

  const reservationUrl = (baseURL + '/' + tripID + '/reservations');

  axios.post(reservationUrl, { params: reservationParams })
    .then((response) => {
      const resId = response.data.id;
      displayStatus(`Successfully reserved your spot! Your reference number is ${resId}!`);
      clearForm();
    })
    .catch((error) => {
      console.log(error.response);
      if (error.response.data && error.response.data.errors) {
        handleApiError(
          `Encountered an error: ${error.message}`,
          error.response.data.errors
        );
      } else {
        displayStatus(`Encountered an error: ${error.message}`);
      }
    });
  $("#reserve-trip-form")[0].reset();
}

$(document).ready(() => {
  $('#load-trips').click(loadTrips);
  $(`#reserve-trip`).hide();
  $(`#submitRes`).submit(reserveTrip);
});
// }