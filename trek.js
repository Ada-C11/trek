const baseURL = "https://trektravel.herokuapp.com/trips";

const displayStatus = (message, element) => {
  $(element).html(message);
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
  content += "</ul>";
  displayStatus(content, "#status");
}

const loadTrips = () => {
  displayStatus("Loading trips...", "#status");

  const tripList = $("#trip-list");
  tripList.empty();

  axios.get(baseURL)
    .then((response) => {
      displayStatus(`Successfully loaded ${response.data.length} trips`, "#status");
      response.data.forEach((trip) => {
        tripList.append(`<li><a href="#" data-trip-id=${trip.id}> ${trip.name}</a></li>`);
      });
      $(`#trip-list li`).click(showTripDetails);
    })
    .catch((error) => {
      console.log(error);
    });
}

const formatTripDetails = (tripDetails) => {
  const target = $("#trip-details-list");
  target.empty();

  Object.keys(tripDetails).forEach(function (detail) {
    target.append(`<li id="capitalize"><strong>${detail}:</strong> ${tripDetails[detail]}</li>`);
  });
};

const showTripDetails = (event) => {
  event.preventDefault();

  console.log("showing details for trip", $(event.target).html());
  const byIdUrl = (baseURL + "/" + `${$(event.target).data("trip-id")}`);

  axios.get(byIdUrl)
    .then((response) => {
      formatTripDetails(response.data);
      $("#reserve-trip-form").addClass(`${response.data.id}`)
        .submit(reserveTrip);
      $("#reserve-trip").show();
    })
    .catch((error) => {
      console.log(error);
    });
}

const readFormData = () => {
  const parsedFormData = {};

  const nameFromForm = $(`#reserve-trip-form input[name="name"]`).val();
  parsedFormData['name'] = nameFromForm ? nameFromForm : undefined;

  const emailFromForm = $(`#reserve-trip-form input[name="email"]`).val();
  parsedFormData['email'] = emailFromForm ? emailFromForm : undefined;

  return parsedFormData;
};

const clearForm = () => {
  $(`#reserve-trip-form input[name="name"]`).val("");
  $(`#reserve-trip-form input[name="email"]`).val("");
}

const reserveTrip = (event) => {
  const tripID = parseInt($("#reserve-trip-form").attr("class"));

  displayStatus("Reserving your spot...", "#status");

  const reservationUrl = (baseURL + "/" + tripID + "/reservations");
  const reservationParams = readFormData();
  event.preventDefault();

  axios.post(reservationUrl, reservationParams)
    .then((response) => {
      const resId = response.data.id;
      displayStatus(`Successfully reserved your spot! Your reference number is ${resId}!`, "#reservation-status");
      clearForm();
    })
    .catch((error) => {
      console.log(error.response);
      if (error.response.data && error.response.data.errors) {
        handleApiError(error);
      }
    });
}

$(document).ready(() => {
  $(`#reserve-trip`).hide();
  $(`#load-trips`).click(loadTrips);
  $(`#submitRes`).submit(reserveTrip);
});
