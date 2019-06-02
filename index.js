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

        axios.get(ALL_URL + `/${tripId}`)
            .then((response) => {
                reportStatus('See details for your selected trip.');

                const singleTrip = response.data;

                showTrip.append(`<li>Name: ${singleTrip['name']}</li>`);
                showTrip.append(`<li>Continent: ${singleTrip['continent']}</li>`);
                showTrip.append(`<li>About: ${singleTrip['about']}</li>`);
                showTrip.append(`<li>Category: ${singleTrip['category']}</li>`);
                showTrip.append(`<li>
                Duration (weeks): ${singleTrip['weeks']}</li>`);
                showTrip.append(`<li>Cost: $${singleTrip['cost'].toFixed(2)}</li>`);

            })
            .catch((error) => {
                reportStatus('Details for this trip are not currently avialable.');
            });

            $('#reservation form').removeClass();
            $('#reservation form').addClass(`${tripId}`);

    }

    $('#trip-list').on('click', 'li', oneTrip);

}


const reservationData = () => {
    // return new FormData(document.querySelector('#reservation form'));
    const reservationTripId = $('#reservation form').attr('class');
    return {
        trip_id: `${reservationTripId}`,
        name: $('#form-name').val(),
        email: $('#form-email').val(),
    };
}

const makeReservation = function makeReservation() {

    const dataForReservation = reservationData();
    console.log(dataForReservation)

    const reservationTripId = $('#reservation form').attr('class');

    axios.post(ALL_URL + `/${reservationTripId}/reservations`, dataForReservation)

        .then((response) => {
            console.log("successfully posted reservation", response);

            const reservationId = response.data.id;
            reportStatus(`Successfully reserved spot ${reservationId}`);
        })
        .catch((error) => {
            console.log("there has been a reservation error")
            
        })

}



$('#reservation').on('click', 'input', makeReservation);


$(document).ready(() => {

    $('#load').click(() => {
        loadTrips();
    });

    $('#reservation form').submit(() => {
        event.preventDefault();
        makeReservation();
    });

    $('#trip-list').on('click', 'li', function () {
        $('#trip-details').show();
        $('#reservation').show();
    });

   
    })