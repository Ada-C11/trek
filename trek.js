// solution that's working without closures - see closures attempt below.

const BASE_URL = 'https://trektravel.herokuapp.com/trips'

const reportStatus = (message) => {
    $('#status').html(message);
}

const reportApiError = (error) => {
    console.log("encountered error when posting:", error);
  
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

const loadTrips = () => {
    reportStatus('Loading trips...');
    
    axios.get(BASE_URL)
    .then((response) => {
        $('#trek-list').empty();
        reportStatus(`Successfully loaded ${response.data.length} trips`);
        $('#trek-list').append(`<h2>Trip List:</h2>`);
        response.data.forEach((trek) => {
          $('#trek-list').append(`<li><a href="#" data-trek-id=${trek.id}> ${trek.name} </a></li>`);  
        });
        $('#trek-list li').click(showTrip);
    })

    .catch((error) => {
        console.log(error);
    });
};

const showTrip = (event) => {
    $('#reservation-form').off();
    axios.get(BASE_URL + '/' + $(event.target).data("trek-id"))
    .then((response) => {
        $('#trek-details').html(
        `<h2>Trip details:</h2>
        <p><strong>Name:</strong> ${response.data.name}</p>
        <p id="trek-id"><strong>ID:</strong> ${response.data.id}</p>
        <p><strong>Continent:</strong> ${response.data.continent}</p>
        <p><strong>Category:</strong> ${response.data.category}</p>
        <p><strong>Weeks:</strong> ${response.data.weeks}</p>
        <p><strong>Cost:</strong> $${response.data.cost}</p>
        <p><strong>About:</strong> ${response.data.about}</p>`);
        $('#reservation').show();
        $('#reservation-form').removeClass().addClass(`${response.data.id}`).submit(addRes);
    })
    .catch((error) => {
        console.log(error);
    });
};

const readResForm = () => {
    const parsedFormData = {};
  
    const nameFromForm = $(`#reservation-form input[name="name"]`).val();
    parsedFormData['name'] = nameFromForm ? nameFromForm : undefined;
  
    const emailFromForm = $(`#reservation-form input[name="email"]`).val();
    parsedFormData['email'] = emailFromForm ? emailFromForm : undefined;
  
    return parsedFormData;
  };
  
const addRes = (event) => {
    const resData = readResForm();
    let id = parseInt($('#reservation-form').attr('class'));
    event.preventDefault();
    axios.post(BASE_URL + '/' + id + '/reservations', resData)
      .then((response) => {
        console.log("successfully posted reservation data", response);
        const resId = response.data.id;
        reportStatus(`Successfully created a new reservation with ID ${resId}`);
      })
      .catch((error) => {
        reportApiError(error);
      })    
    $('#reservation-form')[0].reset();
};

$(document).ready(() => {
    $('#reservation').hide();
    $('.trips__button').click(loadTrips);
});