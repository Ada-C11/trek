const TRIPS = 'https://trektravel.herokuapp.com/trips';

const reportStatus = (message) => {
    $('#status-message').html(message);
  };

const reportError = (message, errors) => {
    let content = `<p>${message}</p><ul>`;
        for (const field in errors) {
            for (const problem of errors[field]) {
                content += `<li>${field}: ${problem}</li>`;
                }
        }
    content += "</ul>";
    reportStatus(content);
  };

const loadTrips = () => {
    reportStatus('Loading all trips...');
  
    const tripList = $('#trip-list');
        tripList.empty();
  
        axios.get(TRIPS)
            .then((response) => {
            reportStatus(`Loaded ${response.data.length} trips.`);
            response.data.forEach((trip) => {
            console.log(response);
            tripList.append(`<li>${trip.name}</li>`);
            });
            })

        .catch((error) => {
            reportStatus(`Error while loading: ${error.message}`);
            console.log(error);
        });
  };
  
  
  
  
  
  
  
   $(document).ready(() => {
    $('#load').click(loadTrips);
  });