const URL = 'https://trektravel.herokuapp.com/trips';

const reportStatus = (message) => {
    $('#status-message').html(message);
};

const loadTrips = () => {
    reportStatus('Loading trips...');

    const tripList = $('#trips-list');
    tripList.empty();

    $('#load').addClass('hidden');

    axios.get(URL)
        .then((response) => {
            reportStatus(`Successfully loaded ${response.data.length} trips`);
            response.data.forEach((trip) => {
                tripList.append(`<li id='${trip.id}'>${trip.name}</li>`);
            });
        })
        .catch((error) => {
            reportStatus(`Encountered an error while loading trips: ${error.message}`);
            console.log(error);
        });
};

const showTrip = (index) => {
    $('#status-message').html('');
    console.log(index);
    axios.get(URL + `/${index}`)
        .then((response) => {
            $('#trip-details').removeClass('hidden');
            $('#name').html(`Trip ${response.data.id}: ${response.data.name}`);
            $('#continent').html(`<strong>Continent:</strong> ${response.data.continent}`)
            $('#category').html(`<strong>Category:</strong> ${response.data.category}`)

            let weeksString = 'week';
            if (response.data.weeks !== 1) {
                weeksString += 's';
            }
            $('#weeks').html(`<strong>Duration:</strong> ${response.data.weeks} ${weeksString}`)
            $('#cost').html(`<strong>Cost:</strong> $${response.data.cost}`)
            $('#about').html(`<strong>Description:</strong> ${response.data.about}`)
        })
        .catch((error) => {
            reportStatus(`Encountered an error while loading trip: ${error.message}`);
            console.log(error);
        });
};

$(document).ready(() => {
    $('#load').click(loadTrips);
    $('#trips-list').on('click', 'li', function (event) {
        showTrip(event.target.id);
    });

});