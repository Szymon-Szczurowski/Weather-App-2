let lat
let long
const apiKey = '0229f22aac3fdfb14cb60098798fd057'
const units = 'metric'
// const img = document.querySelector('img')

// wywołanie kiedy aplikacja się załaduje // event dodany do body
const startApp = () => {
    // pobranie geolokalizacji
	if (navigator.geolocation) {
		navigator.geolocation.getCurrentPosition(position => {
			lat = position.coords.latitude
			long = position.coords.longitude
			console.log(`latitude: ${lat} longitude: ${long}`)
            getWeatherData()
		})
	}
}



const getWeatherData = () => {
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&units=${units}&appid=${apiKey}`

    fetch(url)
    .then(response => response.json())
    .then(data => updateWeatherData(data))
}

const updateWeatherData = (data) => {
    console.log(data);

    const city = data.name
    const temp = data.main.temp
    const humidity = data.main.humidity
    const pressure = data.main.pressure
    const cloudiness = data.clouds.all
    const windSpeed = data.wind.speed
    const sunrise = data.sys.sunrise
    const sunset = data.sys.sunset

    const sunriseToLocalTime = new Date(sunrise * 1000).toLocaleTimeString();
    const sunsetToLocalTime = new Date(sunset * 1000).toLocaleTimeString();

    let imgUrl = "http://openweathermap.org/img/wn/"+data.weather[0].icon+"@2x.png";
    // photoSetup(data.weather[0].id)

    document.querySelector('.img').setAttribute('src', imgUrl)
    document.querySelector('.city').setAttribute('href', `https://openstreetmap.org/#map=12${lat}/${long}`)
    document.querySelector('.city').textContent = city
    document.querySelector('.temperature').textContent = temp
    document.querySelector('.humidity').textContent = humidity
    document.querySelector('.pressure').textContent = pressure
    document.querySelector('.cloudiness').textContent = cloudiness
    document.querySelector('.wind-speed').textContent = windSpeed
    document.querySelector('.sunrise').textContent = sunriseToLocalTime
    document.querySelector('.sunset').textContent = sunsetToLocalTime
}

// const photoSetup = (weatherId) => {

//     if(weatherId >= 200 && weatherId < 300){
//         img.setAttribute('src','https://openweathermap.org/img/wn/11d@2x.png')
//     }else if(weatherId >= 300 && weatherId < 400){
//         img.setAttribute('src','https://openweathermap.org/img/wn/09d@2x.png')
//     }else if(weatherId >= 500 && weatherId < 600){
//         img.setAttribute('src','https://openweathermap.org/img/wn/10d@2x.png')
//     }else if(weatherId >= 600 && weatherId < 700){
//         img.setAttribute('src','https://openweathermap.org/img/wn/13d@2x.png')
//     }else if(weatherId >= 700 && weatherId < 800){
//         img.setAttribute('src','https://openweathermap.org/img/wn/50d@2x.png')
//     }else if(weatherId === 800){
//         img.setAttribute('src','https://openweathermap.org/img/wn/01d@2x.png')
//     }else if(weatherId > 800){
//         img.setAttribute('src','https://openweathermap.org/img/wn/02n@2x.png')
//     }
// }