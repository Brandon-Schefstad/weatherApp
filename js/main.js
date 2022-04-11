// async function fetchWeather(){
//   let url = 'https://api.openweathermap.org/data/2.5/weather?lat=27.9477595&lon=-82.458444&appid=a6211e4c7a048dd89e23d0e4ef2c9326&units=imperial'
//   try{
//     let response = await fetch(url)
//     return await response.json();
//   }catch(error){
//     console.log(error)
//   }
// }
document.querySelector('.submit').addEventListener('click', updateDOM);

// User input city/state
async function userFetchWeather() {
	const city = document.querySelector('#city').value;
	const state = document.querySelector('#state').value;
	let url = `https://api.openweathermap.org/geo/1.0/direct?q=${city},${state},US&appid=a6211e4c7a048dd89e23d0e4ef2c9326&units=imperial`;
	try {
		let response = await fetch(url);
		return await response.json();
	} catch (error) {
		console.log(error);
	}
}
// Uses city/state input to get lat/lon for weather data
async function getWeatherData() {
	let information = await userFetchWeather();
	document.querySelector(
		'.maindisplay__text'
	).innerText = `City Name: ${information[0].name}`;
	let url = `https://api.openweathermap.org/data/2.5/weather?lat=${information[0].lat}&lon=${information[0].lon}&appid=a6211e4c7a048dd89e23d0e4ef2c9326&units=imperial`;
	try {
		let data = await fetch(url);
		data = await data.json();
		document.querySelector(
			'.temperature'
		).innerHTML = `Temperature:<br>${data.main.temp} °F`;
		document.querySelector(
			'.feels_like'
		).innerText = `That feels like:\n ${data.main.feels_like}°F`;
		const visibility = data.visibility / 100;
		document.querySelector(
			'.visibility'
		).innerText = `Visibility: \n ${visibility}%`;
		document.querySelector(
			'.description'
		).innerText = `Description: \n ${data.weather[0].description}`;
	} catch (error) {
		console.error(error);
	}
}
// Uses city name to get image
async function getImage() {
	let city = document.querySelector('#city').value;
	city = city.toLowerCase();
	let url = `https://api.teleport.org/api/urban_areas/slug:${city}/images/`;
	console.log(`url for ${city} ${url}`);
	try {
		document.querySelector('img').classList.remove('hidden');
		let response = await fetch(url);
		response = await response.json();
		let source = response.photos[0].image.mobile;
		console.log(source);
		document.querySelector('img').src = response.photos[0].image.mobile;
	} catch (error) {
		console.error(error);
		document.querySelector('img').classList.add('hidden');
	}
}
async function updateDOM() {
	getWeatherData();
	getImage();
}
