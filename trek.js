const BASE_URL = 'https://trektravel.herokuapp.com/trips'
const ID_URL = 'https://trektravel.herokuapp.com/trips/'

const displayStatus = (message) => {
    $('#status').html(message);
}

const loadTrips = () => {
    axios.get(BASE_URL)
    .then((response) => {
        displayStatus(`Successfully loaded ${response.data.length} trips`);
        response.data.forEach((trek) => {
            $('#trek-list').append(`<li><a href="#" data-trek-id=${trek.id}> ${trek.name} </a></li>`);  
        });
        $('#trek-list li').click(showTrip);
    })

    .catch((error) => {
        console.log(error);
    });
};

const showTrip = (event) => {
    axios.get(ID_URL + $(event.target).data("trek-id"))
    .then((response) => {
        console.log("showing details for trip", response);
        $('#trek-details').html(`<p><strong>Name:</strong> ${response.data.name}</p><p><strong>ID:</strong> ${response.data.id}</p>
        <p><strong>Continent:</strong> ${response.data.continent}</p><p><strong>Category:</strong> ${response.data.category}</p>
        <p><strong>Weeks:</strong> ${response.data.weeks}</p><p><strong>Cost:</strong> $${response.data.cost}</p>
        <p><strong>About:</strong> ${response.data.about}</p>`);
        $('.reservation').show();
    })
    .catch((error) => {
        console.log(error);
    });
};

// const readPetForm = () => {
//     const parsedFormData = {};
  
//     const nameFromForm = $(`#pet-form input[name="name"]`).val();
//     parsedFormData['name'] = nameFromForm ? nameFromForm : undefined;
  
//     const ageFromForm = $(`#pet-form input[name="age"]`).val();
//     parsedFormData['age'] = ageFromForm ? ageFromForm : undefined;
  
//     const ownerFromForm = $(`#pet-form input[name="owner"]`).val();
//     parsedFormData['owner'] = ownerFromForm ? ownerFromForm : undefined;
  
//     return parsedFormData;
//   };
  
//   const addPet = () => {
//     const petData = readPetForm();
  
//     reportStatus("About to post pet data...");
//     console.log("About to post pet data", petData);
  
//     axios.post(URL, petData)
//       .then((response) => {
//         console.log("successfully posted pet data", response);
  
//         const petId = response.data.id;
//         reportStatus(`Successfully created a new pet with ID ${petId}`);
//       })
//       .catch((error) => {
//         reportApiError(error);
//       })
//   };

$(document).ready(() => {
    
    $('.reservation').hide();
    $('.trips__button').click(loadTrips);
    // $('#trek-list').on('click', 'li', function() {
    //     // let trekId = parseInt(this.innerHTML);
    //     showTrip(trekId);
    // });
});
  


// As a user on the home page, after I've selected a specific trip, I want to see a form I can use to fill out details, so that I can submit a reservation to this trip
// As a user on the home page, after I've selected a specific trip, I want to use the form to fill out the following details, so that I can submit my information with this reservation:
// name
// email