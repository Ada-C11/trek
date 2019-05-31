const URL = 'https://trektravel.herokuapp.com/trips';

const reportStatus = (message) => {
  $('#status-message').html(message);
};

const reportApiError = (error) => {
  console.log("encountered error when posting", error);

  let errorHtml = `<p>${error.message}</p><ul>`;

  const fieldProblems = error.response.data.errors;

  Object.keys(fieldProblems).forEach(field => {
    const problems = fieldProblems[field];
    problems.forEach(problem => {
      errorHtml += `<li><strong>${field}:</strong> ${problem}</li>`;
    });
  });

  errorHtml += '</ul>';
  reportStatus(errorHtml);
}

const loadPets = () => {
  reportStatus('Loading trips...');

  const tripsList = $('#trips-list');
  tripsList.empty();

  axios.get(URL)
    .then((response) => {
      reportStatus(`Successfully loaded ${response.data.length} trips`);
      response.data.forEach((trip) => {
        tripsList.append(`<li>${trip.name}</li>`);
      });
    })
    .catch((error) => {
      reportStatus(`Encountered an error while loading pets: ${error.message}`);
      console.log(error);
    });
};

const readPetForm = () => {
  return {
    // name: "dan's ports pet don't use this name please I need it for debugging",
    age: 14,
    owner: "ports"
  };
}

const addPet = () => {
  const petData = readPetForm();

  reportStatus("About to post pet data...");
  console.log("About to post pet data", petData);

  axios.post(URL, petData)
    .then((response) => {
      console.log("successfully posted pet data", response);

      const petId = response.data.id;
      reportStatus(`Successfully created a new pet with ID ${petId}`);
    })
    .catch((error) => {
      reportApiError(error);
    })
};

// OK GO!!!!!
$(document).ready(() => {
  $('#load').click(loadPets);

  $('#pet-form').submit((event) => {
    event.preventDefault();
    addPet();
  });
});