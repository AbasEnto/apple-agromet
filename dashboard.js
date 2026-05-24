/*
=========================================
Kashmir AgroMet Dashboard
dashboard.js
=========================================
Reads weather data and updates cards 
=========================================
*/


/*
-----------------------------------------
Update one district card
-----------------------------------------
*/
function updateDistrictCard(id, weather) {

    if (!weather) return;

    const tempElement =
        document.getElementById(`${id}-temp`);

    const rhElement =
        document.getElementById(`${id}-rh`);

    const rainElement =
        document.getElementById(`${id}-rain`);

    const windElement =
        document.getElementById(`${id}-wind`);


    if (tempElement)
        tempElement.textContent =
            `${weather.temperature.toFixed(1)} °C`;

    if (rhElement)
        rhElement.textContent =
            `${weather.humidity}%`;

    if (rainElement)
        rainElement.textContent =
            `${weather.rainfall} mm`;

    if (windElement)
        windElement.textContent =
            `${weather.wind} km/h`;
}


/*
-----------------------------------------
Update timestamp
-----------------------------------------
*/
function updateTimestamp() {

    const timestampElement =
        document.getElementById(
            "last-updated"
        );

    if (!timestampElement) return;

    const now = new Date();

    timestampElement.textContent =
        now.toLocaleString(
            "en-IN",
            {
                dateStyle: "medium",
                timeStyle: "short"
            }
        );
}


/*
-----------------------------------------
Main Dashboard Refresh
-----------------------------------------
*/
async function refreshDashboard() {

    console.log(
        "Loading district weather..."
    );

    try {

        const results =
            await getAllDistrictWeather();

        results.forEach(item => {

            const districtId =
                item.district
                    .toLowerCase()
                    .replace(/\s+/g, "-");

            updateDistrictCard(
                districtId,
                item.weather
            );
        });

        updateTimestamp();

        console.log(
            "Dashboard updated"
        );

    } catch (error) {

        console.error(
            "Dashboard update failed:",
            error
        );
    }
}


/*
-----------------------------------------
Start dashboard
-----------------------------------------
*/
document.addEventListener(
    "DOMContentLoaded",
    () => {

        refreshDashboard();

        /*
         refresh every 30 minutes
        */
        setInterval(
            refreshDashboard,
            30 * 60 * 1000
        );
    }
);
