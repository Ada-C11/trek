const TRIPSURL = 'https://trektravel.herokuapp.com/trips'
// const RESERVEURL = 'https://trektravel.herokuapp.com/trips/1/reservations'


const reportStatus = (message) => {
    const statusContainer = $('#status-message');
    statusContainer.empty();
    statusContainer.append(`<p>${message}</p>`);
  };

const loadTrips = () => {
    const tripsList = $('#trip-list')
    tripsList.empty();
    tripsList.append('<h1>All Trips</h1>');
    tripsList.addClass('border')
    // $('main').addClass('background')


    axios.get(TRIPSURL)
        .then((response) => {
            reportStatus(`Successfully loaded ${response.data.length} trips!`);
            response.data.forEach((trip) => {
                tripsList.append(`<li><button class='${trip.id}'>${trip.name}</button></li>`)
                // $('li').addClass('border')
            })
        })
        .catch((error) => {
            reportStatus(`Encountered an error while loading trips: ${error.message}`);
            console.log(error)
        });
}

const loadDetails = (id) => {
    const tripDetail = $('.trip-details');
    tripDetail.empty();
    tripDetail.append('<h1>Trip Details</h1>')
    tripDetail.addClass('border')

    // const reserveTrip = $('.reserve-trip')
    // reserveTrip.empty()
    $('#reserve-trip').addClass('border')

    axios.get(TRIPSURL + `/${id}`)
        .then((response) => {
            let tripInfo = response.data
            reportStatus(`Successfully loaded ${tripInfo.name} trips!`);
            tripDetail.append(`<h3>Name: ${tripInfo.name}</h3>`)
            tripDetail.append(`<h3>Continent: ${tripInfo.continent}</h3>`)
            tripDetail.append(`<h3>Category: ${tripInfo.category}</h3>`)
            tripDetail.append(`<h3>Weeks: ${tripInfo.week}</h3>`)
            tripDetail.append(`<h3>Cost: $${tripInfo.cost}</h3>`)
            tripDetail.append(`<p><h3>About:</h3> ${tripInfo.about}</p>`)

            // reserveTrip.append(`<h1>Reserve a Spot on ${tripInfo.name} Trip!</h1>`)
        })
        .catch((error) => {
            reportStatus(`Encountered an error while loading trips: ${error.message}`);
            console.log(error)
        })
}

// const readUserForm = () => {
//     return {
//         name: 'angela', 
//         age: 4,
//         email: 'angela@angela.org'
//     }
// }

  $(document).ready(() => {
    $('#load').on('click', loadTrips);
    $('ul#trip-list').on('click', 'button', function() {
        const tripId = this.className
        loadDetails(tripId)
        $('#reserve-trip').show();
    });
  });