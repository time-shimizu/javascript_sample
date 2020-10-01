'use stricts';

function success(pos) {
  ajaxRequest(pos.coords.latitude, pos.coords.longitude);
}

function fail(error) {
  alert('位置情報の取得に失敗しました。エラーコード' + error.code);
}

navigator.geolocation.getCurrentPosition(success, fail);

function utcToJSTime(utcTime){
  return utcTime * 1000;
}

function ajaxRequest(lat, long){
  const url ='https://api.openweathermap.org/data/2.5/forecast';
  const appId = '93191bbcc32dc90f5f345f68b30f6abf';

  $.ajax({
    url: url,
    data: {
      appid: appId,
      lat: lat,
      lon: long,
      units: 'metric',
      lang: 'ja'
    }
  })
  .done(function(data){
    console.log(data.city.name);
    console.log(data.city.country);

    data.list.forEach(function(forecast, index){
      const dateTime = new Date(utcToJSTime(forecast.dt));
      const month = dateTime.getMonth() + 1;
      const date = dateTime.getDate();
      const hours = dateTime.getHours();
      const min = String(dateTime.getMinutes()).padStart(2,'0');
      const temperature = Math.round(forecast.main.temp);
      const description = forecast.weather[0].description
      const iconPath = `images/${forecast.weather[0].icon}.svg`;

      console.log('日時' + `${month}/${date} ${hours}:${min}`);
      console.log(temperature);
      console.log(description);
      console.log(iconPath);
    })
  })
  .fail(function(){
    console.log('$.ajax failed');
  })
}
