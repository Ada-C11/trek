TRIP_URL = "https://trektravel.herokuapp.com/trips/"

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

const loadTrips = () => {
  
  const tripList = $('#trip-list');
  tripList.empty();
  
  axios.get(TRIP_URL)
    .then((response) => {
      response.data.forEach((trip) => {
        tripList.append(`<li>${trip.name}</li>`)
        const showDetails = () => {

          const tripDetail = () => {
            axios.get(TRIP_URL + trip.id)
            .then((response) => {
              const detail = $('.details')
              detail.empty();
              
              detail.html(`<h1>Trek Trip Details<h1> 
                <h2>Trip Name: ${response.data.name}</h2>
                <h3>Continent: ${response.data.continent}</h3>
                <h3>Category: ${response.data.category}</h3>
                <h3>Weeks: ${response.data.weeks}</h3>
                <h3>Cost: $${response.data.cost}</h3>
                <h3>About: </h3>
                <p>${response.data.about}</p>`)

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
        
                          <input type="submit" name="add-trek" value="Add Trek" />
                        </form>`)


                        const addTrek = (event) => {

                          event.preventDefault();
                        
                          const trekData = readFormData();
                        
                          reportStatus("About to book your trip!");
                          
                          axios.post(`${TRIP_URL}${trip.id}/reservations`, trekData)
                            .then((response) => {
                              console.log("Congrats! Your trip has been booked.", response);
                        
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
            reportStatus(`Encountered an error while loading treks: ${error.message}`);
            console.log(error);
          });
          
          };
          return tripDetail;
          
        };
        const selectedTrip = showDetails(trip);
       
        $('li:last').click(selectedTrip);


        
        
      }) 
   
    })
}


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

const clearForm = () => {
  $(`#trek-form input[name="name"]`).val('');
  $(`#trek-form input[name="age"]`).val('');
  $(`#trek-form input[name="email"]`).val('');
}


// const addTrek = (event) => {

//   event.preventDefault();

//   const trekData = readFormData();

//   reportStatus("About to book your trip!");
//   // console.log("About to book your trip!", trekData);

//   // need to get trip id and append it to the url
//   axios.post(TRIP_URL, trekData)
//     .then((response) => {
//       console.log("Congrats! Your trip has been booked.", response);

//       const trekID = response.data.id;
//       reportStatus(`Successfully booked a new trip with ID ${trekID}`);
//     })
//     .catch((error) => {
//       reportApiError(error);
//     })
// };



$(document).ready(() => {
  $('#load-trips').click(loadTrips);
});
