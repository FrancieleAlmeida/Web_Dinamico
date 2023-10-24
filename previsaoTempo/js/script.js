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
            console.log(`${json.main.temp}`)    
            console.log(`${json.weather[0].description}`)
            console.log(`${json.main.humidity}`)
            console.log(`${json.wind.speed}`)

            container.style.height = '600px'

            temperature.innerText = json.main.temp
            description.innerText = json.weather[0].description 
            humidity.innerText = json.main.humidity
            wind.innerText = json.wind.speed
            console.log(json.weather[0].main == 'Rain' )


            if(json.weather[0].main == 'Clear'){
                console.log('entre clear')
                imagem.style.backgroundImage = 'url(/previsaoTempo/img/clear.png))'
            }
            else if(json.weather[0].main == 'Rain' ){
                console.log('entre rain')
                imagem.style.backgroundImage = 'url(/previsaoTempo/img/rain.png))'
            }
            else if(json.weather[0].main == 'Cloud' ){
                console.log('entrei cloud')
                imagem.style.backgroundImage = 'url(/previsaoTempo/img/cloud.png))'
            }
            else if(json.weather[0].main == 'Mist' ){
                console.log('entre mist')
                imagem.style.backgroundImage = 'url(/previsaoTempo/img/mist.png))'
            }
            else if(json.weather[0].main == 'Snow' ){
                console.log('entre snow')
                imagem.style.backgroundImage = 'url(/previsaoTempo/img/snow.png))'
            }


        }
    })

})
})