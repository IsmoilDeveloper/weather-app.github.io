const key = 'c70099d7a82ca8143162c534f2174be9';
const formEl = document.querySelector('form');
const details = document.querySelector('.details');

formEl.addEventListener('submit', (e) => {
  e.preventDefault();
  details.innerHTML = '<h1>Loading...</h1>';
  const location = e.target.location.value;
  weatherApp(location);
  console.log(location);
});

async function weatherApp(location){
  const data = await fetchAPI(location);
  generateHTML(data);
}

async function fetchAPI(location){
  const baseURL = `https://cors-anywhere.herokuapp.com/http://api.weatherstack.com/current?access_key=${key}&query=${location}`;
  const resp = await fetch(baseURL);
  const data = await resp.json();
  console.log(data);
  return data;
}
function generateHTML(data){
  const html = `
  <h1 class="temp">${data.current.temperature}&deg;c</h1>
  <h1 class="status">${data.current.weather_descriptions.map(item => item).join('')}</h1>
  <div class="more-info">
    <p>Humidity- ${data.current.humidity}%</p>                 
    <p>Wind Speed-${data.current.wind_speed}km/h</p>                 
    <p>Wind Dir-${data.current.wind_dir}</p>                                 
    <p>Pressure-${data.current.pressure}MB</p>                 
  </div>
  <div class="query">${data.request.query}</div>
  `;

  details.innerHTML = html;
}