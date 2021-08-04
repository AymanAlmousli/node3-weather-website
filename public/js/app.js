
console.log('Hello from client side ')

// const url = 'http://localhost:3000/weather?address='
// fetch(url).then((response) => {
//     response.json().then((data) => {
//         if(data.error){
//             return console.log(data.error)
//         }
//         return console.log(data)
//     })
// })

const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')

weatherForm.addEventListener('submit',(e) => {
    e.preventDefault()

    const location = search.value

    messageOne.textContent = 'Loading ...'
    messageTwo.textContent = ''

    const url = 'http://localhost:3000/weather?address=' + location
    fetch(url).then((response) => {
        response.json().then((data) => {
            if(data.error){
                //return console.log(data.error)
                messageOne.textContent = data.error
                messageTwo.textContent = ''
            } else {
                messageOne.textContent = 'Location is : ' + data.location
                messageTwo.textContent = 'Weather : ' + data.weather
            }
            //return console.log(data)
        })
    })
    //console.log(location)
})