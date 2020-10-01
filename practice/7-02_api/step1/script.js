'use stricts';

function success(pos) {
  ajaxRequest(pos.coords.latitude, pos.coords.longitude);
}

function fail(error) {
  alert('位置情報の取得に失敗しました。エラーコード' + error.code);
}

navigator.geolocation.getCurrentPosition(success, fail);

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
    console.log(data);
  })
  .fail(function(){
    console.log('$.ajax failed');
  })
}
