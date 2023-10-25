document.addEventListener('DOMContentLoaded', function() {

const search = document.querySelector(".search-box > button")
const container = document.querySelector('.container')
const weatherBox = document.querySelector('.weather-box')
const weatherDetail = document.querySelector('.weather-details')
const erro404 = document.querySelector('.not-found')
const temperature = document.querySelector(' .temperature')
const description = document.querySelector('.description')
const humidity = document.querySelector('.weather-details .humidity span')
const wind = document.querySelector('.wind .text span')
const imagem = document.querySelector('.weather-box img')

search.addEventListener("click", () =>{
    console.log("carregar dados")

    const APIKey = '2a919cdf7e3f8b16d24a21a0611cb5c1'
    const city = document.querySelector('.search-box > input').value
    console.log(city)


    if(city === ''){
        return
    }

    fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${APIKey}`
    )

    .then((response) => response.json())
    .then((json) => {
        console.log(json)
        if(json.cod === '404'){
            container.style.height = '400px'
            weatherBox.style.display = 'none'
            weatherDetail.style.display = 'none'
            erro404.style.display = 'block'
            erro404.classList.add("fadeIn")
            return
        }
        else{

            container.style.height = '550px'
            weatherBox.style.display = ''
            weatherDetail.style.display = ''
            erro404.style.display = 'none'
            weatherDetail.classList.add("fadeIn")
            weatherBox.classList.add("fadeIn")

            
            temperature.innerHTML = `${parseInt(json.main.temp)}<span>ºC</span>`
            description.innerText = json.weather[0].description 
            humidity.innerText = json.main.humidity + "% " 
            wind.innerText = json.wind.speed + " km/h"


            if(json.weather[0].main == 'Clear'){
                imagem.src= './img/clear.png'
            }
            else if(json.weather[0].main == 'Rain' ){
                imagem.src= './img/rain.png'
            }
            else if(json.weather[0].main == 'Clouds' ){
                imagem.src= './img/cloud.png'
            }
            else if(json.weather[0].main == 'Haze' ){
                imagem.src= './img/mist.png'
            }
            else if(json.weather[0].main == 'Snow' ){
                imagem.src= './img/snow.png'

            }


        }
    })

})
})