const url = 'https://trektravel.herokuapp.com/'

const reportStatus = (message) => {
    $('#status-message').html(message);
};


const makeFormInputBox = function makeFormInputBox(name) {
  let inputField = 
  `<div class="input-group input-group-sm mb-3">
    <div class="input-group-prepend">
      <span class="input-group-text" id="inputGroup-sizing-sm">${name}</span>
    </div>
    <input type="text" class="form-control" aria-label="${name}" aria-describedby="inputGroup-sizing-sm">
  </div>`;
  return inputField;
}

const registerHTML = function registerHTML(input1, input2) {
  let inputField = 
  `<div class="trip-registration">
    <h4>register for trip</h4>
      <form id="trip-form">` + 
      makeFormInputBox(input1) +
      makeFormInputBox(input2) +
      `<input class="btn btn-info btn-sm" type="submit" value="Add Your Registration"></input>
    </form>
  </div></li>`;
  return inputField;
}


const reportApiError = (error) => {
console.log("encountered error when posting", error);

let errorHtml = `<p>${error.message}</p><ul>`;
const fieldProblems = error.response.data.errors;

// JavaScript is weird about looping through a hash
// All Dan + Dee's from Ports Pets, thank you
Object.keys(fieldProblems).forEach(field => {
    const problems = fieldProblems[field];
    problems.forEach(problem => {
    errorHtml += `<li><strong>${field}:</strong> ${problem}</li>`;
    });
});

errorHtml += '</ul>';
reportStatus(errorHtml);
}
const readRegForm = () => {
  let name = $("#trip-form input[name=name]").val();
  let email = $("#trip-form input[name=email]").val();
  console.log(name);
  console.log(email);
  // is there a way to do the thing below running the jQuery in the K/V pairing?
  return {
    'name': name,
    'email': email
  };
}

const addRegistration = (id) => {
  let postUrl = url + id + '/reservations';
  console.log(postUrl)
  const tripData = readRegForm();

  reportStatus("About to post registration data...");
  console.log("lets check to be sure we're doing this right", tripData);

  axios.post(postUrl, tripData)
    .then((response) => {
      console.log("successfully posted registration data", response);

      const regId = response.data.id;
      reportStatus(`Successfully created a new registration with ID ${regId}`);
    })
    .catch((error) => {
      reportApiError(error);
    })
};

const loadTrips = () => {
    reportStatus('Loading trips...');
  
    const tripList = $('#trip-list');
    tripList.empty();
  
    let getTrips = url + 'trips';
    axios.get(getTrips)
      .then((response) => {
        reportStatus(`Successfully loaded ${response.data.length} trips`);
 
        response.data.forEach((trip) => {
          let holderName = `<li><h4>${trip.name}</h4>`;
          let id = `load_info_${trip.id}`;
          holderName += 
          `<div class="${id}">
          </div><button type="button" id="${id}" class="btn btn-info btn-sm">more info</button>`;
          tripList.append(holderName);
          
          $(`#` + id).click(() => {
            // really should probably do a second api call
            const deets = `
            <h4>trip id: ${trip.id}</h4>
            <h5>trip name: ${trip.name}</h5>
            <h5>continent: ${trip.continent}</h5>
            <h5>duration: ${trip.weeks}</h5>
            <h5>cost: ${trip.cost}</h5>` + 
            registerHTML("name", "email");
            $(`.` + id).html(deets);
            $(`#` + id).remove();
            $('#trip-form').submit((event) => {
              event.preventDefault();
              addRegistration(trip.id);
            });
          })
        });
      })
      .catch((error) => {
        reportStatus(`Encountered an error while loading trips: ${error.message}`);
        console.log(error);
      });
  };


  $(document).ready(() => {
    $('#load').click(loadTrips);




    console.log(makeFormInputBox("name"));
  });

//   lots of credit goes to Dan's Aweosme live coding


//    Notes from stuff that I got stuck on
// this just runs alert non stop CAUSE I CALLED ALERT
// $(`#` + id).click(alert(id));
// when you have something in parans, the things in parens RUNS RIGHT AWAY
// CALLED A CONTINUATION OR A THUNK