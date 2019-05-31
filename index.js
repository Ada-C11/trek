const reportStatus = (message) => {
  $('#status-message').html(message);
};

const tripsURL = "https://trektravel.herokuapp.com/trips"
const detailsURL = "https://trektravel.herokuapp.com/trips/"

const loadTrips = () => {
  axios.get(tripsURL)
    .then((response) => {
      console.log(response)
      response.data.forEach( location => {
        $("#trips-list").append(`<li><a class="show-loc" href="${detailsURL}${location.id}">${location.name}</a></li>`)
      })
      
    })
    .catch((error) => {
      console.log(error)
      reportStatus(`An error occurred: ${error.message}`)
    }    
  )
}

const showLocation = (event) => {
  event.preventDefault()

  console.log(event.target)
  console.log(event.target.href)
  axios.get(event.target.href)
    .then((response) => {
      console.log(response.data)
    
      $("#trip-details").append(`
      <thead>
        <tr>
          <td scope="col">ID</td>
          <td scope="col">Name</td>
          <td scope="col">Category</td>
          <td scope="col">Continent</td>
          <td scope="col">About</td>
          <td scope="col">Weeks</td>
          <td scope="col">Cost</td>
        </tr>
      </thead>
        <tr>
        <td>${response.data.id}</td>
        <td>${response.data.name}</td>
        <td>${response.data.category}</td>
        <td>${response.data.continent}</td>
        <td>${response.data.about}</td>
        <td>${response.data.weeks}</td>
        <td>${response.data.cost}</td>
        </tr>`)
    })
    .catch((error) => {
      console.log(error)
      reportStatus(`An error occurred: ${error.message}`)
    })
  }  

$(document).on('click', '.show-loc', showLocation)

$(document).ready(() => {
  $("#trips-button").click(loadTrips)
})