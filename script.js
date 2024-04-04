


// https://api.openweathermap.org/data/2.5/weather?q=karachi&appid=1c4561fa0bc0e9e457738c18cd09b7e2

function display(city,temp,humidity,wind,image){
    let displayElement=document.querySelector('.display')
    let innerHtml=`<img class="weather-image" src=${image} alt="">
    <h1 >${temp}°C</h1>
    <h3 >${city}</h3>
    <div class="details">
        <div class="col">
            <img src="humidity.png" alt="">
            <div>
                <p class="humidity">${humidity}%</p>
                <p class="col-text">Humidity</p>
            </div>
        </div>
        <div class="col">
            <img src="wind.png" alt="">
            <div>
                <p class="wind">${wind} Km/h</p>
                <p class="col-text">Wind Speed</p>
            </div>
        </div>
    </div>`
    displayElement.innerHTML=innerHtml;
}

async function checkWeather(cityName){
    const response=await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=1c4561fa0bc0e9e457738c18cd09b7e2&units=metric`)
    
    if(response.status==404){
        let element=document.querySelector('.city').classList
        element.add('error')
        return
    }
    else{
        let element=document.querySelector('.city').classList
        element.remove('error')
    }
    let data =await response.json()
    if(data){

        let city=data.name;
        let temperature=data.main.temp
        let humidity=data.main.humidity
        let wind=data.wind.speed
        let image;
        console.log(data)
        if(data.weather[0].main=='Clouds'){
            image="clouds.png"
        }
        else if(data.weather[0].main=='Clear'){
            image="sunny.png"
        }
        else if(data.weather[0].main=='Rain'){
            image="rain.png"
        }
        else if(data.weather[0].main=='Mist'){
            image="mist.png"
        }
       else if(data.weather[0].main=='Haze'){
            image="mist.png"
        }
       else if(data.weather[0].main=='Drizzle'){
            image="drizzle.png"
        }
       else if(data.weather[0].main=='Snow'){
            image="snowy.png"
        }
        display(city,temperature,humidity,wind,image)
    }
    
}
let cityName;
let btn=document.querySelector('#searchBtn')
btn.addEventListener('click',()=>{city=document.querySelector('.city')
cityName=city.value
checkWeather(cityName)
city.value=""
})


