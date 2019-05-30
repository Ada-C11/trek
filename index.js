  const ListURL = 'https://trektravel.herokuapp.com/trips'
  const DetailURL = 'https://trektravel.herokuapp.com/trips'

  
  const displayStatus = (message) => {
    $('#status-message').html(message);
  };
  const handleApiError = (message, errors) => {
    let content = `<p>${message}</p><ul>`;
    for (const field in errors) {
      for (const problem of errors[field]) {
        content += `<li>${field}: ${problem}</li>`;
      }
    }
    content += "</ul>";
    displayStatus(content);
  };
  
  const loadTrips = () => {
    displayStatus("loading trips...");

    const tripList = $('#trip-list');
    tripList.empty();

    axios.get(ListURL)

      .then((response) => {
        displayStatus(`Successfully loaded ${response.data.length} trips`);
        response.data.forEach((trip) => {
        //   tripList.append(`<li>${trip.name}</li>`);
        const tripHTML = $(`<li><a href="#">${trip.name}</a></li>`);
        tripList.append(tripHTML);
  
        tripHTML.click(() => {
            showTripDetails(trip.id);
        })
        });
      })
      .catch((error) => {
        displayStatus(`Encountered an error while loading trips: ${error.message}`);
        console.log(error);
      });
};

const showTripDetails = (id) => {

    const tripdetail = $('#trip-details');
    tripdetail.empty();
    axios.get(DetailURL + "/" + id)
      .then((response) => {
          let trip = response.data;
          displayStatus(`Successfully loaded ${response.data}`);
          tripdetail.append(`
          <p>Trip Name: ${trip.name}</p>
          <p>Continent: ${trip.continent}</p>
          <p>Cost: ${trip.cost}</p>
          <p>Weeks: ${trip.weeks} week('s)</p>
          <p>About: ${trip.about}</p>
          `);
      })
      .catch((error) => {
        displayStatus(`Encountered an error while loading trips: ${error.message}`);
        console.log(error);
      });
    }


   
   
   
   
   
   
   
   
   
   
   
   
   
   
   
    const reserveTrip = (trip) => {
        console.log("reserving trip", trip)
      
        // TODO: Wave 2
        // reserve a spot on the trip when the form is submitted
      }

    







$(document).ready(() => {
    $('#load').click(loadTrips);
    // $('#trip-list').on('click', 'li', function(event) {
    //    let trip = $(this);
    //     showTripDetails(trip)
    //   });
    

  });