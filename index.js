
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
          tripList.append(`<li>${trip.name}</li>`);
        });
      })
      .catch((error) => {
        reportStatus(`Encountered an error while loading trips: ${error.message}`);
        console.log(error);
      });
  };


  $(document).ready(() => {
    $('#load').click(loadTrips);
  });

//   lots of credit goes to Dan's Aweosme live coding