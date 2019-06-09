const url = 'https://trektravel.herokuapp.com/trips';

const reportStatus = (message) => {
    $('#status-message').html(message);
};

const loadTrips = () => {
    reportStatus('...Loading all trips...');

    const tripList = $('#trip-list');
    tripList.empty();

    axios.get(url)
        .then((response) => {
            reportStatus(`Successfully loaded ${response.data.length} trips`);
            console.log('successfully loaded trips');
            $('#all-trips h4').append('All Trips:');
            response.data.forEach((trip) => {
                let tripListItem = $(`<li>${trip.name}</li>`);
                tripListItem.addClass(`${trip.id}`);
                
                tripList.append(tripListItem);
            })
        })
        .catch((error) => {
            reportStatus(`We're sorry, we encountered an error while loading all trips: ${error.message}`);
            console.log('there was an issue loading some or all of the trips');
        })

        const loadIndividualTrip = (event) => {
            const tripInfo = $('#trip-details');
            tripInfo.empty();
        
            let tripId = event.target.className;
            let tripUrl = url + `/${tripId}`;
            
            axios.get(tripUrl)
                .then((response) => {
                    reportStatus(`Successfully loaded trip ${tripId}`);
                    console.log('successfully loaded trip!');
                        
                    tripInfo.append($(`<h4>Trip Details (id: ${tripId})</h4>`));
                    tripInfo.append($(`<p>Name: ${response.data.name}</p>`));
                    tripInfo.append($(`<p>Continent: ${response.data.continent}</p>`));
                    tripInfo.append($(`<p>Category: ${response.data.category}</p>`));
                    tripInfo.append($(`<p>Duration: ${response.data.weeks} weeks</p>`));
                    tripInfo.append($(`<p>Cost: $${response.data.cost}</p>`));
                    tripInfo.append($(`<p>Details:</p>`));
                    tripInfo.append($(`<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.</p>`));
        
                    $('#reserve-trip').show();
                })
                .catch((error) => {
                    reportStatus(`Something went wrong with loading trip ${tripId}: ${error}`);
                    console.log(`Something went wrong with loading trip ${tripId}: ${error}`);
                })
          
            console.log(tripId);
        }
    
    $('#trip-list').on('click', 'li', loadIndividualTrip);
}

$(document).ready(() => {
    $('#load-trips').click(loadTrips);
});

