const ALL_URL = "https://trektravel.herokuapp.com/trips";
const TRIP_URL = `https://trektravel.herokuapp.com/trips/${this.id}`

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
            tripList.append(`<li>${trip.name}</li>`);
        });
    })
    .catch((error) => {
        // reportStatus(`Encountered an error while loading trips: ${error.message}`);
        console.log('we made an api request, and it came back as "failure"!');
        console.log('The error was this:', error);
    });
    }

    const oneTrip = () => {
        reportStatus('Loading trip...');
      
        const showTrip = $('.trip-details');
        showTrip.empty();
      
        
        // axios.get(ALL_URL, {
        //     params: {
        //       ID: 70
        //     }
        //   })
        
        
        axios.get(ALL_URL)
          .then((response) => {
            reportStatus(`Successfully loaded ${response.data.length} trips`);
      
            const singleTrip = response.data;
            showTrip.append(`<li>${singleTrip['about']}</li>`);
           
        })
        .catch((error) => {
            // reportStatus(`Encountered an error while loading trips: ${error.message}`);
            console.log('we made an api request, and it came back as "failure"!');
            console.log('The error was this:', error);
        });
        }




  $(document).ready(() => {
  
    $('#load').click(() => {
      loadTrips();
    });

    $('#trip-list').on('click', 'li', function(event) {
        oneTrip();
      });
    

    // $('h1').click(() => {
    //     // oneTrip(this.id);
    //     oneTrip();
    // });

    $('button#load').click(function(){
        $(this).hide();
      });
  
  });