/*
=========================================
Kashmir Apple Agro-Meteorological Dashboard
weather.js  
=========================================
*/

const WEATHER_VARIABLES =
    "temperature_2m,relative_humidity_2m,precipitation,wind_speed_10m";
  

/*
-------------------------------------------------
Get current weather for a single location
-------------------------------------------------
*/
async function getCurrentWeather(latitude, longitude) {

    const url =
        `https://api.open-meteo.com/v1/forecast` +
        `?latitude=${latitude}` +
        `&longitude=${longitude}` +
        `&current=${WEATHER_VARIABLES}` +
        `&timezone=Asia/Kolkata`;

    try {

        const response = await fetch(url);

        if (!response.ok) {
            throw new Error(
                `API Error: ${response.status}`
            );
        }

        const data = await response.json();

        return {

            temperature:
                data.current.temperature_2m,

            humidity:
                data.current.relative_humidity_2m,

            rainfall:
                data.current.precipitation,

            wind:
                data.current.wind_speed_10m,

            time:
                data.current.time
        };

    } catch (error) {

        console.error(
            "Weather fetch failed:",
            error
        );

        return null;
    }
}


/*
-------------------------------------------------
Get weather for all districts
-------------------------------------------------
*/
async function getAllDistrictWeather() {

    const results = [];

    for (const district of districts) {

        console.log(
            `Fetching ${district.name}`
        );

        const weather =
            await getCurrentWeather(
                district.latitude,
                district.longitude
            );

        results.push({

            district:
                district.name,

            latitude:
                district.latitude,

            longitude:
                district.longitude,

            weather:
                weather
        });
    }

    return results;
}
