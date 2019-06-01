
const url = 'https://trektravel.herokuapp.com/'

const reportStatus = (message) => {
    $('#status-message').html(message);
};


const reportApiError = (error) => {
console.log("encountered error when posting", error);

let errorHtml = `<p>${error.message}</p><ul>`;

// Based on our exploration, we determined that
// fieldProblems will be of form:
// {
//   field: [problem, problem, problem],
//   field: [problem...],
//   ...
// }
const fieldProblems = error.response.data.errors;

// JavaScript is weird about looping through a hash
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
  return {
    'name': name,
    'email': email 
  };
}

const addRegistration = (id) => {

  postUrl = `https://trektravel.herokuapp.com/trips/${id}/reservations`
  console.log(postUrl)
  const tripData = readRegForm();

  reportStatus("About to post registration data...");
  console.log("lets check to be sure we're doing this right", tripData);

  axios.post(postUrl, tripData)
    .then((response) => {
      console.log("successfully posted registration data", response);

      // its creating an id, right?
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
    console.log('MADE IT HERE');
    axios.get(getTrips)
      .then((response) => {
        reportStatus(`Successfully loaded ${response.data.length} trips`);
 
        response.data.forEach((trip) => {

          let holderName = `<li>${trip.name}`;
          let id = `load_info_${trip.id}`;
          // almsot all the fucking data is here
          // how can I add it from here
          // alert(id);
          // this just runs alert non stop CAUSE I CALLED ALERT
          // $(`#` + id).click(alert(id));
          // when you have something in parans, the things in parens RUNS RIGHT AWAY
          // CALLED A CONTINUATION OR A THUNK
          holderName += `<div class="${id}"></div><button type="button" id="${id}" class="btn btn-info">more info</button>`;
          // const holderNode = $(holderName)
          // holderNode.click(function is the thing that displays it)
          tripList.append(holderName);
          
          $(`#` + id).click(() => {
            alert(id);
            let deets = `<li>trip id: ${trip.id}, trip name: ${trip.name}, continent: ${trip.continent}, category: ${trip.category}, duration: ${trip.weeks}, cost: ${trip.cost} <div class="trip-registration">
            <h1>register for trip</h1>
            <form id="trip-form">
              <div>
                <label for="name">Name</label>
                <input type="text" name="name" />
              </div>
              <div>
                <label for="email">Email</label>
                <input type="text" name="email" />
              </div>
              <input type="submit" name="add-registration" value="Add Registration" />
            </form>
          </div></li>`;
            $(`.` + id).html(deets);
            $('#trip-form').submit((event) => {
              event.preventDefault();
              addRegistration(trip.id);
            });
          })
        });
        // $(`#` + id).click(alert(id));
      })
      .catch((error) => {
        reportStatus(`Encountered an error while loading trips: ${error.message}`);
        console.log(error);
      });
      // $(`#` + id).click(alert(id));
  };




  $(document).ready(() => {
    $('#load').click(loadTrips);


  });

//   lots of credit goes to Dan's Aweosme live coding