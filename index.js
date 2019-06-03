const tripsUrl = 'https://trektravel.herokuapp.com/trips';

const displayStatus = (message) => {
    $('#status').html(message);
  };
  
  // const handleApiError = (error) => {
  //   console.log(error);

  // const reportError = (message, errors) => {
  //   let content = `<p>${message}</p><ul>`;
  //   for (const field in errors) {
  //     for (const problem of errors[field]) {
  //       content += `<li>${field}: ${problem}</li>`;
  //     }
  //   }
  //   content += "</ul>";
  //   reportStatus(content);
  // };

  const showTripDetails = id => {
    const detailsUrl = tripsUrl + `/${id}`;
    axios.get(detailsUrl)
      .then(function(response) {
          const trip = response.data;
          let info = `<h3> ${trip.name}</h2>
          <p>${trip.about}</p>
          <ul>
          <li><b>Continent</b>: ${trip.continent}</li>
          <li><b>Category</b>: ${trip.category}</li>
          <li><b>Duration</b>: ${trip.weeks} weeks</li>
          <li><b>Cost</b>: $${trip.cost}</li>
          <li><b>Trip ID</b>: ${trip.id}</li>
          </ul>`;
          $("#trip-info").append(info);
        })
      .catch(function(error) {
        console.log(error);
      });
  };


// makes an axios call to the trips index and display the results
const loadTrips = () => {
    const tripList = $('#trip-list');
    tripList.empty();
    $("#trip-info").empty();

    axios.get(tripsUrl)
      .then(function (response) {
        response.data.forEach((trip) => {
            tripList.append(`<li><a href="" class="trip-link" id="${trip.id}">${trip.name}</a></li>`);
        });
        console.log(response);
        })
        // resultElement.innerHTML = generateSuccessHTMLOutput(response);
      .catch(function (error) {
          console.log(error);
        // resultElement.innerHTML = generateErrorHTMLOutput(error);
      });   
  }


  const reserveTrip = (trip) => {
    console.log("reserving trip", trip)
  }

  $(document).on("click", "a", event => {
    event.preventDefault();
    $("#trip-info").empty();
    const id = $(event.target).attr("id");
    console.log("loading " + id);
    showTripDetails(id);
    $('.trip-details').show();
  });

  $(document).on("click", "#load-trips", event => {
    $('.trip-details').hide();
    loadTrips();
  });
  
  $(document).ready(() => {  
    $('.trip-details').hide();
    $('#load-trips').click(loadTrips);
}) 