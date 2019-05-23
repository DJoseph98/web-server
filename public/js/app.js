const weatherForm = document.querySelector('form') //selectionne le formulaire form
const locationInput = document.querySelector('input') // selectionne l'input du formulaire
const messageOne = document.querySelector('#paragraphe1') // selectionne paragrahpe1
const messageTwo = document.querySelector('#paragraphe2') // selectionne paragrahpe2

// messageOne.textContent = 'dzadza' // Set text content to paragraphe1

const fecthForecast = (location) => {
    const locationEncode = encodeURI(location)
    messageOne.textContent = 'Fetching...'
    messageTwo.textContent = ''
    fetch('/weather?adress=' + locationEncode).then((response) => {
        response.json().then( (data) => {
            if(data.error){
                messageOne.textContent = data.error
            }else{
                messageOne.textContent = data.location
                messageTwo.textContent = data.forecast
            }

        })
    })
}

weatherForm.addEventListener( 'submit', (e) => { // creation evenement submit form
    e.preventDefault()      //permet de ne pas réactualiser la page après submit
    const location = locationInput.value

    fecthForecast(location)

})