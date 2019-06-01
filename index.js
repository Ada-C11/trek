
const tripAPI = "https://trektravel.herokuapp.com/trips";

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

// const displayTripList = (tripList) => {
//     const target = $('#trip-list');
//     target.empty();
//     let i = 1;
//     tripList.forEach(trip => {
//         target.append(`<button id="trip-${trip.id}">${trip.name}</button>`);
//         i += 1;
//     });
// }


const displayTripList = () => {
    const target = $('#trip-list');
    target.empty();
    axios.get(tripAPI)
        .then((response) => {
            response.data.forEach((trip) => {
                target.append(`<button id="trip-${trip.id}">${trip.name}</button>`);
                $(`#trip-${trip.id}`).click(showTripDetails(trip.id));
            });
        })
        .catch((error) => {
            if (error.response.data && error.response.data.errors) {
                reportError(
                    `Encountered an error: ${error.message}`,
                    error.response.data.errors
                );
            } else {
                reportStatus(`Encountered an error: ${error.message}`);
            }
        })
}

const showTripDetails = (tripID) => {
    const loadOneTrip = () =>
        axios.get(`${tripAPI}` + `/` + `${tripID}`)
            .then((response) => {
                const trip = response.data;
                const target = $('.trip-details');
                const otherTarget = $('.trip-reservation-form')
                target.empty();
                target.html(`<section id="trip-name">Name: ${trip.name}</section> <section id="trip-continent">Continent: ${trip.continent}</section> <section id="trip-category">Category: ${trip.category}</section> <section id="trip-weeks">Weeks: ${trip.weeks}</section><section id="trip-category">Cost: $${trip.cost}</section>`);
                otherTarget.empty();
                otherTarget.html(`<h3>Reserve a Spot on ${trip.name}</h3> <form id="reservation-form">
                <div>
                <label for="name">Name</label>
                <input type="text" name="name" />
                </div>

                <div>
                <label for="email">Email</label>
                <input type="text" name="email" />
                </div>

                <input type="submit" name="add-reservation" value="Reserve"/>
                </form>`)

                const reserve = createReservation(tripID);
                $('#trip-reservation-form').submit(reserve);
            })
            .catch((error) => {
                if (error.response.data && error.response.data.errors) {
                    reportError(
                        `Encountered an error: ${error.message}`,
                        error.response.data.errors
                    );
                } else {
                    reportStatus(`Encountered an error: ${error.message}`);
                }
            })
    return loadOneTrip;
}



const readFormData = () => {
    const parsedFormData = {};

    const nameFromForm = $(`#reservation-form input[name="name"]`).val();
    parsedFormData['name'] = nameFromForm ? nameFromForm : undefined;

    const emailFromForm = $(`#reservation-form input[name="email"]`).val();
    parsedFormData['email'] = emailFromForm ? emailFromForm : undefined;

    return parsedFormData;
};

const clearForm = () => {
    $(`#name-form input[name="name"]`).val('');
    $(`#email-form input[name="email"]`).val('');
}

const createReservation = (tripID) => {
    const reserveTrip = (event) => {
        event.preventDefault();

        const reservationData = readFormData();
        reportStatus('Sending reservation data...');
        axios.post(tripAPI + tripID + "/reservations", reservationData)
            .then((response) => {
                reportStatus(`Successfully added a reservation with ID ${response.data.id}!`);
                clearForm();
            })
            .catch((error) => {
                if (error.response.data && error.response.data.errors) {
                    reportError(
                        `Encountered an error: ${error.message}`,
                        error.response.data.errors
                    );
                } else {
                    reportStatus(`Encountered an error: ${error.message}`);
                }
            });
    };
    return reserveTrip;
};


$(document).ready(() => {
    $('#trip-list-button').on('click', displayTripList);
});