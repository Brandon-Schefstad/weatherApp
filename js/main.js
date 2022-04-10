//Make an api request using async await

async function fetchWeather(){
  let url = 'https://api.openweathermap.org/data/2.5/weather?lat=27.9477595&lon=-82.458444&appid=a6211e4c7a048dd89e23d0e4ef2c9326&units=imperial'
  try{
    let response = await fetch(url)
    return await response.json();
  }catch(error){
    console.log(error)
  }
}
async function updateDOM() {
  let information = await fetchWeather();
  document.querySelector('div').innerHTML = `${JSON.stringify(information)}`;
}
updateDOM()