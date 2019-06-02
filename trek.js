$('document').ready(()=>{

    const handleReserveTrip = (tripID, continent)=>{
        const endpoint = `https://trektravel.herokuapp.com/trips/${tripID}/reservations`;
        const name = $('#name-field').val();
        const email = $('#email-field').val();
        axios.post(endpoint,{
                name: name,
                email: email
            })
        .then((response)=>{
            const name = $('#name-field').val();
            $('#reserve-form')[0].reset();
            console.log('name');
            const messageHTML = `<h4>Congrats, ${name}! You're going to ${continent}!</h4><p>Your reservation ID is ${response.data.id}.</p>`
            $('#reserve-message').html(messageHTML);
            $('#reserve-message').removeClass('hidden');
        })
        .catch((error)=>{
        });
    };
    
    const buildTripClickHandler = (trip) => {
        const changeSelected = () => {
            $('.selected').removeClass('selected');
            $(`#trip-${trip.id}`).addClass('selected');
        }

        const displayTripDescription = () => {
            axios.get('https://trektravel.herokuapp.com/trips/' + trip.id)
            .then((response) => {
                $(`#trip-details`).append(`<details>${response.data.about}</details>`);
            })
            .catch((error) => {
                $(`#trip-details`).append(`Failed to load trip details:  ${error.message}`);
            });
        };

        const displayReservationForm = () => {
            $('#reserve-heading').text(`Reserve a Spot on ${trip.name}`);
            $('#reserve-message').empty();
            $('#reserve-trip').removeClass('hidden');
        }

        const setReservationButtonHandler = () => {
            $('#reserve-button').off();
            $('#reserve-button').click((event)=>{
                event.preventDefault();
                handleReserveTrip(trip.id, trip.continent);
            });
        }

        const tripDetails = (
            `<h3>${trip.name}</h3>` +
            `<p>Continent: ${trip.continent}</p>` +
            `<p>Category: ${trip.category}</p>` +
            `<p>${trip.weeks} ${(trip.weeks === 1) ? "week" : "weeks"}</p>` +
            `<p>$${trip.cost.toFixed(2)}</p>`
        );

        const handler = () => {
            changeSelected();
            $(`#trip-details`).html(tripDetails);
            displayTripDescription();
            displayReservationForm();
            setReservationButtonHandler();
        };
        return handler;
    };


    const loadTrips= (tripData) => {
        $('button').removeClass('centered');
        $('.selected').removeClass('selected');
        $('#reserve-trip').addClass('hidden');
        $('#trip-details').empty();
        $('button').text('Reload Trips');
        $('#trips-list').empty();
        for (let trip of tripData){
            $('#trips-list').append(`<div id=trip-${trip.id}><h3>${trip.name}</h3></div>`);
            const handleTripClick = buildTripClickHandler(trip);
            $(`#trip-${trip.id}`).click(()=>{handleTripClick()});
        }
    }

    $('#reserve-button').click(()=>{ handleReserveTrip() })

    const handleButtonClick = () =>{
        axios.get('https://trektravel.herokuapp.com/trips')
        .then((response) => { 
            loadTrips(response.data);
        })
        .catch((error)=> {
            console.log(error.message);
        })
    };
    $('button').click(()=>{ handleButtonClick()} );
});
