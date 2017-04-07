$(document).ready(function () {

	var api = "http://api.openweathermap.org/data/2.5/weather?q="
	var key = "&appid=433df42b9ecedf0bab729d4e045e83f6"
	var labelTemp = '<span id="temp-info" class="label label-success ">';

	var label = ['<button id="weather-btn-info" class="btn btn-info ">',
				 '<button id="weather-btn-danger" class="btn btn-danger ">',
				 '<button id="weather-btn-temp-min" class="btn btn-warning ">',
				 '<button id="weather-btn-temp-max" class="btn btn-warning ">'];

	var labelEnd = '</span>';

	var weatherType = {
		'Clear': 'sunny',
		'Rain': 'rain',
		'Clouds': 'cloudy',
		'Haze': 'haze',
		'Thunderstorm': 'thunderstorm',
		'Lightning': 'lightning',
		'Snow': 'snow',
		'Mist': 'fog',
		'Dust': 'dust'
	}

	$.getJSON('http://freegeoip.net/json/', function (data) {
		displayWeather(data.city);
	});


	$('#display-btn').click(function (event) {
		event.preventDefault();
		var city = $('input').val().trim();
		if (city.length !== 0){
			displayWeather(city);
			$('input').val('');
		}
		else {
			$('input').css('border', '2px solid red').fadeOut(200).fadeIn(200);
		}
	});

	var displayWeather = function (city) {
		var url = api + city + key;
		$.getJSON(url, function (data) {
			$('body').css('backgroundImage', 'url("images/background/' + weatherType[data.weather[0].main] + '.jpg")');

			$('#place').html('<span id = "place-label" class="label label-danger">' + data.name + ', ' + data.sys.country + '</span>');
			$('#celsius').html(labelTemp + kelvinToCelsius(data.main.temp) + '&degC' + labelEnd);
			$('#farhenheit').html(labelTemp + celsiusToFarhenheit(kelvinToCelsius(data.main.temp)) + '&degF' + labelEnd);
			if (weatherType[data.weather[0].main] === 'dust')
				$('#weather-type').html('<i class="wi wi-' + weatherType[data.weather[0].main] + '"></i>');
			else
				$('#weather-type').html('<i class="wi wi-day-' + weatherType[data.weather[0].main] + '"></i>');
			$('#min-temp').html('<i class="wi wi-thermometer-exterior"></i>');
			$('#max-temp').html('<i class="wi wi-thermometer"></i>');
			$('#pressure').html('<i class="wi wi-barometer"></i>');
			$('#humidity').html('<i class="wi wi-humidity"></i>');
			$('#wind-speed').html('<i class="wi wi-strong-wind"></i>');

			$('#weather-type-info').html(label[1] + data.weather[0].main + '</button>');
			$('#min-temp-info').html(label[2] + kelvinToCelsius(data.main.temp_min) + '&degC</button>');
			$('#max-temp-info').html(label[3] + kelvinToCelsius(data.main.temp_max) + '&degC</button>');
			$('#pressure-info').html(label[0] + data.main.pressure + ' hpa' + '</button>');
			$('#humidity-info').html(label[0] + data.main.humidity + '%' + '</button>');
			$('#wind-speed-info').html(label[1] + data.wind.speed + ' m/s' + '</button>');

			$('#min-temp-info').click(changeMin);
			$('#max-temp-info').click(changeMax);

			var minFlag = true;

			function changeMin(event) {
				var tempMin = event.target.id.substr(event.target.id.length - 3);
				if (minFlag) {
					$('#' + tempMin + '-temp-info').html(label[2] + celsiusToFarhenheit(kelvinToCelsius(data.main['temp_' + tempMin])) + '&degF</button>');
				} else
					$('#' + tempMin + '-temp-info').html(label[2] + kelvinToCelsius(data.main['temp_' + tempMin]) + '&degC</button>');
				minFlag = !minFlag;
			};

			var maxFlag = true;

			function changeMax(event) {
				var tempMax = event.target.id.substr(event.target.id.length - 3);

				if (maxFlag) {
					$('#' + tempMax + '-temp-info').html(label[3] + celsiusToFarhenheit(kelvinToCelsius(data.main['temp_' + tempMax])) + '&degF</button>');
				} else
					$('#' + tempMax + '-temp-info').html(label[3] + kelvinToCelsius(data.main['temp_' + tempMax]) + '&degC</button>');
				maxFlag = !maxFlag;
			};

		}); // end of getJSON
	}; // end of displayWeather()

	var kelvinToCelsius = function (temp) {
		return (temp - 273.15).toFixed(2);
	};

	var celsiusToFarhenheit = function (temp) {
		return (9 / 5 * temp + 32).toFixed(2);
	};

	$('#detect-btn').click(function (event) {
		event.preventDefault();
		$.getJSON('http://freegeoip.net/json/', function (data) {
			displayWeather(data.city);
		});
	});
});
