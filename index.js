const ALL_URL = "https://trektravel.herokuapp.com/trips";


const reportStatus = (message) => {
    const statusContainer = $('#status-message');
    statusContainer.empty();
    statusContainer.append(`<p>${message}</p>`);
};

const loadTrips = () => {
    reportStatus('Loading trips...');

    const tripList = $('#trip-list');
    tripList.empty();

    axios.get(ALL_URL)
        .then((response) => {
            reportStatus(`Successfully loaded ${response.data.length} trips`);

            const trips = response.data;
            trips.forEach((trip) => {
                const tripNode = $(`<li>${trip.name}</li>`);
                tripNode.attr("data-id", trip.id);
                tripList.append(tripNode);
            });
        })
        .catch((error) => {
            reportStatus(`Encountered an error while loading trips: ${error.message}`);

        });

    const oneTrip = function oneTrip(event) {
        reportStatus('Loading trip...');

        const showTrip = $('#trip-details ul');
        showTrip.empty();
        const tripId = $(event.currentTarget).attr('data-id');
        axios.get(`https://trektravel.herokuapp.com/trips/${tripId}`)
            .then((response) => {
                reportStatus('Retrieving trip details.');

                const singleTrip = response.data;
                
                showTrip.append(`<li>Name: ${singleTrip['name']}</li>`);
                showTrip.append(`<li>Continent: ${singleTrip['continent']}</li>`);
                showTrip.append(`<li>About: ${singleTrip['about']}</li>`);
                showTrip.append(`<li>Category: ${singleTrip['category']}</li>`);
                showTrip.append(`<li>
                Duration (weeks): ${singleTrip['weeks']}</li>`);
                showTrip.append(`<li>Cost: $${singleTrip['cost']}</li>`);

            })
            .catch((error) => {
                reportStatus('Details for this trip are not currently avialable.');
            });

    }

    $('#trip-list').on('click', 'li', oneTrip)
}


$(document).ready(() => {

    $('#load').click(() => {
        loadTrips();
    });

    // $('button#load').click(function () {
    //     $(this).hide();
    // });
});