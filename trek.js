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

  let loadTripHtml = "<h2>All Trips</h2><ul>"

  axios.get(baseURL)
    .then((response) => {
      displayStatus(`Successfully loaded ${response.data.length} trips`, "#status");
      response.data.forEach((trip) => {
        loadTripHtml += `<li class="list-group-item"><a href="#" data-trip-id=${trip.id}> ${trip.name}</a></li>`;
      });
      loadTripHtml += "</ul>";
      tripList.append(loadTripHtml);
      $(`#trip-list li`).click(showTripDetails);
    })
    .catch((error) => {
      console.log(error);
    });
}

const formatTripDetails = (tripDetails) => {
  const target = $("#trip-details-list");
  target.empty();

  let tripDetailsHtml = "<h2>Trip Details</h2><ul>"

  Object.keys(tripDetails).forEach(function (detail) {
    tripDetailsHtml += `<li id="${detail}"><strong>${detail}:</strong> ${tripDetails[detail]}</li>`;
  });
  tripDetailsHtml += "</ul>"
  target.append(tripDetailsHtml);
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
  parsedFormData["name"] = nameFromForm ? nameFromForm : undefined;

  const emailFromForm = $(`#reserve-trip-form input[name="email"]`).val();
  parsedFormData["email"] = emailFromForm ? emailFromForm : undefined;

  return parsedFormData;
};

const clearForm = () => {
  $(`#reserve-trip-form input[name="name"]`).val("");
  $(`#reserve-trip-form input[name="email"]`).val("");
}

const reserveTrip = (event) => {
  event.preventDefault();

  displayStatus("Reserving your spot...", "#reservation-status");

  const tripID = parseInt($("#reserve-trip-form").attr("class"));
  const reservationUrl = (baseURL + "/" + tripID + "/reservations");
  const reservationParams = readFormData();

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
  $(`#submitRes`).click(reserveTrip);
});
