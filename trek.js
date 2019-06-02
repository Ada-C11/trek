TRIP_URL = "https://trektravel.herokuapp.com/trips/"

// error reporting so the user knows what went wrong
const reportStatus = (message) => {
  $('#status-message').html(message);
};

const reportApiError = (error) => {
  console.log("We've encountered the following error:", error);

  let errorHtml = `<p>${error.message}</p><ul>`;

  const allProblems = error.response.data.errors;

 
  Object.keys(allProblems).forEach(key => {
    const issues = allProblems[key];
    issues.forEach(problem => {
      errorHtml += `<li><strong>${key}:</strong> ${problem}</li>`;
    });
  });

  errorHtml += '</ul>';
  reportStatus(errorHtml);
}

// load all trips
const loadTrips = () => {
  
  const tripList = $('#trip-list');
  tripList.empty();
  
  axios.get(TRIP_URL)
    .then((response) => {
      response.data.forEach((trip) => {
        tripList.append(`<li>${trip.name}</li>`)

        // within the first GET request response, nested function that shows details of a specific trip
        const showDetails = () => {

          const tripDetail = () => {
            axios.get(TRIP_URL + trip.id)
            .then((response) => {
              const detail = $('.details')
              detail.empty();

              // populating HTML with details from the second GET request response
              detail.html(`<h1>Is This the Trip of Your Dreams?<h1> 
                <h2>Excursion Name: <span>${response.data.name}</span></h2>
                <h3>Continent: <span>${response.data.continent}</span></h3>
                <h3>Excursion Category: <span>${response.data.category}</span></h3>
                <h3>Weeks of Travel: <span>${response.data.weeks}</span></h3>
                <h3>Cost: <span>$${response.data.cost}</span></h3>
                <h3>Why This Trek Is Amazing: </h3>
                <p>${response.data.about}</p>`)

                // displays the form only when a specific trip is clicked
                const form = $('#trek-form')
                form.html(`<h1>Book Your Trip Now!</h1>
                          <form id="trek-form">
                          <div>
                            <label for="name">Name</label>
                            <input type="text" name="name" />
                          </div>
        
                          <div>
                            <label for="age">Age</label>
                            <input type="number" name="age" />
                          </div>
  
                          <div>
                              <label for="email">Email</label>
                              <input type="text" name="email" />
                            </div>
        
                          <input type="submit" name="add-trek" value="Book My Trek" />
                        </form>`)

                  // function to perform the addTrek function on a click event.
                  const addTrek = (event) => {

                    event.preventDefault();
                        
                    const trekData = readFormData();
                        
                    reportStatus("About to book your trip!");
                    // uses the trip.id from our previous response     
                    axios.post(`${TRIP_URL}${trip.id}/reservations`, trekData)
                    .then((response) => {
                       
                      const trekID = response.data.id;
                      reportStatus(`Successfully booked a new trip with ID ${trekID}`);
                      clearForm();
                    })
                    .catch((error) => {
                      reportApiError(error);
                    })
                    };

                    $('#trek-form').submit(addTrek);
          })
          .catch((error) => {
            reportStatus(`Houston, we have a problem: ${error.message}`);
            console.log(error);
          });
          
          };
          return tripDetail;
          
        };
        const selectedTrip = showDetails(trip);
       
        $('li:last').click(selectedTrip);   
        
      }) 
   
    })
    .catch((error) => {
      reportStatus(`Houston, we have a problem: ${error.message}`);
      console.log(error);
    });
}

// reads the form data and turns it into a readable format for the addTrek function
const readFormData = () => {
  const parsedFormData = {};

  const nameFromForm = $(`#trek-form input[name="name"]`).val();
  parsedFormData['name'] = nameFromForm ? nameFromForm : undefined;

  const ageFromForm = $(`#trek-form input[name="age"]`).val();
  parsedFormData['age'] = ageFromForm ? ageFromForm : undefined;

  const emailFromForm = $(`#trek-form input[name="email"]`).val();
  parsedFormData['email'] = emailFromForm ? emailFromForm : undefined;

  return parsedFormData;
};

// clears the form after submission
const clearForm = () => {
  $(`#trek-form input[name="name"]`).val('');
  $(`#trek-form input[name="age"]`).val('');
  $(`#trek-form input[name="email"]`).val('');
}

$(document).ready(() => {
  $('#load-trips').click(loadTrips);
});
