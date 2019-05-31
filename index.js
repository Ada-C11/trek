$(document).ready(() => {
  listTrips();
  loadTripDetails();
});

const getURL = "https://trektravel.herokuapp.com/trips";

const reportStatus = message => {
  $("#status-message").html(message);
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

// This loads the trip
const getTrips = () => {
  reportStatus("Loading trips...");

  const tripList = $("#trip-list");
  tripList.empty();

  axios
    .get(getURL)
    .then(response => {
      reportStatus(`Successfully loaded ${response.data.length} trips`);
      response.data.forEach(trip => {
        tripList.append(`<li class='${trip.id}'>${trip.name}</li>`);
      });
    })
    .catch(error => {
      reportStatus(
        `Encountered an error while loading trips: ${error.message}`
      );
      console.log(error);
    });
};

// This gets the trip details given the id as a parameter
const detailsTrips = const detailsTrips = (id) => {
  reportStatus("Loading details...");

  const tripDetailsList = $("#trip-details");
  tripDetailsList.empty();

  axios
    .get(getURL)
    .then(response => {
      reportStatus(`Successfully loaded ${response.data.length} trips`);
      // callback function which takes the id passed to it and finds the trip associated with that id
      const trip = response.data.find((item) => {
        // returns true when that id matches the id passed to this method
        return item.id.toString() === id;
      });
      loadForm(trip.name);
      tripDetailsList.append(
        `<h2>TRIP DETAILS</h2>`,
        `<li>ID: ${trip.id}</li>`,
        `<li>NAME: ${trip.name}</li>`,
        `<li>CONTINENT: ${trip.continent}</li>`,
        `<li>CATEGORY: ${trip.category}</li>`,
        `<li>DURATION ${trip.weeks} weeks</li>`,
        `<li>COST $${trip.cost.toFixed(2)}</li>`,
        `<li>ABOUT: Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. '</li>`
      );
    })
    .catch(error => {
      reportStatus(
        `Encountered an error while loading trips: ${error.message}`
      );
      console.log(error);
    });
};

// Loads the form and calls the submit fuction
const loadForm = (trip) => {
  reportStatus("Loading details...");
  const tripReservation = $(".reserve-trip-area");
  tripReservation.empty();

  tripReservation.append(
    `<h2>Reserve a Spot on ${trip}</h2>
    <form class="reservation-form"> Name:<br />
      <input class="text-input" type="text" name="name" value="Mickey" />
      <br />
      Email:<br />
      <input class="email-input" type="text" name="email" value="mickey@mouse.com" />
      <br /><br />
      <input class="submit-click" type="button" value="Submit" />
    </form>`
  );
  setUpFormSubmission(trip);
}

const postURL = "https://trektravel.herokuapp.com/trips/1/reservations";

// Posts the data submitted in the form
const postForm = (name, email, id) => {
  event.preventDefault();
  axios({
    method: "post",
    url: postURL,
    data: {
      name: name,
      email: email
    }
  }).catch(error => {
    if (error.response.data && error.response.data.errors) {
      reportError(
        `Encountered an error while loading trips: ${error.message}`,
        error.response.data.errors
      );
    } else {
      reportStatus(`Encountered an error: ${error.message}`);
    }
  });
}

// Loads all available trips on click
const listTrips = () => {
  $("#load").click(getTrips);
}

// On clicking a specific trip give the details of that trip
const loadTripDetails = () => {
  $("#trip-list").click((event) => {
    const selected = event.target;
    const tripId = selected.classList[0];
    // Id is passed to the details function
    detailsTrips(tripId);
  });
}

// Submits the form with your input on click
const setUpFormSubmission = (trip) => {
  $(".reservation-form").submit((event) => {
    event.preventDefault();
    const name = $(`.text-input`).val();
    const email = $(`.email-input`).val();
    postForm(name, email, trip.id);
    clearForm();
  });
}

// Clears the form after submission
const clearForm = () => {
  $(`.text-input`).val(" ");
  $(`.email-input`).val(" ");
};
