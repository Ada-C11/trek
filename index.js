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

const loadTreks = () => {
  const trekList = $('#trek-list');
  trekList.empty();

  let URL = 'https://trektravel.herokuapp.com/trips'
  axios.get(URL)
    .then((response) => {
      const theTreks = response.data;

      theTreks.forEach((trek) => {
        trekList.append(`<li id="trek">${trek.name}</li>`);

        const showTrekDetails = (trip) => {
          const trekDetail = () => {
            let detailsURL = `https://trektravel.herokuapp.com/trips/${trip.id}`
            

            axios.get(detailsURL)
            .then((response) => {
              const trekDeets = $('.indiv-trek');
              trekDeets.empty(); 

              trekDeets.html(
                `<h1>${trip.name}</h1>
                <h3>Continent: ${trip.continent}</h3>
                <h3>Category: ${trip.category}</h3>
                <h3>Weeks: ${trip.weeks}</h3>
                <h3>Cost: $${trip.cost}</h3>
                <h3>About: </h3>
                <p>${response.data.about}</p>`
              )
              // console.log(trip)
              // console.log(response)
            })

            .catch((error) => {
              reportStatus(error);
            });
          }
          return trekDetail;
        };
        const clickedTrek = showTrekDetails(trek);
        $("li").click(clickedTrek);
      });
    })

    .catch((error) => {
      reportStatus(`Encountered an error while loading treks: ${error.message}`);
      console.log(error);
    });
    };

$(document).ready(() => {
  $('#load').click(loadTreks)
});


// const showTrekDetails = (trip) => {
//   let detailsURL = `https://trektravel.herokuapp.com/trips/${trip.id}`
//   const trekDeets = $('#"trek-deets"');

//   axios.get(detailsURL)
//     .then((response) => {
//       trekDeets.append(`<h1>Trek Details</h1>`);
//         trekDeets.append(`<li>${response.data[0].name}</li>`);
//         console.log(response.data.name)
//     })
//     .catch((error) => {
//       reportStatus(`Encountered an error while loading treks: ${error.message}`);
//       console.log(error);
//     });
// };

// .catch((error) => {
// if (error.response.data && error.response.data.errors) {
//reportError('Encountered an errro while loading oets: ${error.message},
// error.response.data.errors)
// }
// })
// reportError('Encountered an errro while loading oets: ${error.message},
// error.response.data.errors)


// https://picsum.photos/id/477/500/500