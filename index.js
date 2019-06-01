
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
            let deets = `<li>trip id: ${trip.id}, trip name: ${trip.name}, continent: ${trip.continent}, category: ${trip.category}, duration: ${trip.weeks}, cost: ${trip.cost} </li>`;
            $(`.` + id).html(deets);
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