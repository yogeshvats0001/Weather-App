const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric";
const cityName = document.querySelector(".city");
const cityTemp = document.querySelector(".temp");
const cityHumidity = document.querySelector(".humidity");
const cityWind = document.querySelector(".wind");
const cityIcon = document.querySelector('.weather-icon');
const weatherDetail = document.querySelector('.weather');

function hideDetails(){
    weatherDetail.style.display = 'none';
}
hideDetails();

function showDetails(){
    weatherDetail.style.display = 'block';
}

function fillIcon(iconDesc){
    // function for selecting the image as per the data
    if(iconDesc === 'Mist'){
        cityIcon.src = './images/mist.png';
    }else if(iconDesc === 'Clouds'){
        cityIcon.src = './images/clouds.png';
    }else if(iconDesc === 'Clear'){
        cityIcon.src = './images/clear.png';
    }else if(iconDesc === 'Drizzle'){
        cityIcon.src = './images/drizzle.png';
    }else if(iconDesc === 'Rain'){
        cityIcon.src = './images/rain.png';
    }else if(iconDesc === 'Snow'){
        cityIcon.src = './images/snow.png';
    }
}

function fillData(result) {
    //function for filling the data
//   console.log(typeof result.name);
  if (cityName) {
    cityName.textContent = result.name;
  }

//   console.log(result.main.temp);
  if (cityTemp) {
    cityTemp.textContent = result.main.temp + "°C";
  }

//   console.log(result.main.humidity);
  if (cityHumidity) {
    cityHumidity.textContent = result.main.humidity + "%";
  }

//   console.log(result.wind);
  if (cityWind) {
    cityWind.textContent = result.wind.speed + "km/hr";
  }

  const iconDesc = result.weather[0].main;
//   console.log(iconDesc);
  fillIcon(iconDesc);

}

async function checkTemp() {
  const inCity = document.getElementById("inputCity")?.value;
//   console.log(inCity);

  if (inCity) {
    const response = await fetch(apiUrl + `&q=${inCity}` + `&appid=${API_KEY}`);
    const result = await response.json();
    // console.log(result);

    if (result.cod === "404") {
        hideDetails();
        alert(result.message.toUpperCase());
    } else {
        showDetails();
        fillData(result);
    }

    document.getElementById("inputCity").value = null;
  } else {
        hideDetails();
        alert("Please enter the city first.");
  }
}
