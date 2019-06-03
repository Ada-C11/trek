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
      reportStatus(`Successfully loaded ${response.data.length} trips`);
      console.log('successfully loaded trips');

      const theTreks = response.data;

      theTreks.forEach((trek) => {
        let thisTrek = $(`<li>${trek.name}</li>`);
        thisTrek.addClass(`${trek.id}`);
        trekList.append(thisTrek);
      })
    })

    .catch((error) => {
      reportStatus(`Encountered an error while loading treks: ${error.message}`);
      console.log(error);
    })

      const showTrekDetails = (event) => {
          let trekId = event.target.className;
          let detailsURL = `https://trektravel.herokuapp.com/trips/${trekId}`;
          console.log(trekId)
          console.log(detailsURL)

          const detailSection = $('#details');
          detailSection.empty();
          
          axios.get(detailsURL)
            .then((response) => {
              reportStatus(`Successfully loaded trip ${trekId}`);
              console.log('successfully loaded trip!');

              detailSection.html(
                `<h1>${response.data.name}</h1>
                <h3>Continent: ${response.data.continent}</h3>
                <h3>Category: ${response.data.category}</h3>
                <h3>Weeks: ${response.data.weeks}</h3>
                <h3>Cost: $${response.data.cost}</h3>
                <h3>About: </h3>
                <p>${response.data.about}</p>`
              )
             
            })

          .catch((error) => {
            reportStatus(`Something went wrong with loading trip ${trekId}: ${error}`);
            console.log(`Something went wrong with loading trip ${trekId}: ${error}`);
          });
      };

      $("#trek-list").on('click', 'li', showTrekDetails);
    };

$(document).ready(() => {
  $('#load').click(loadTreks);
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