/*
=========================================
Kashmir AgroMet Dashboard
dashboard.js
=========================================
Reads weather data and updates cards   
=========================================
*/


/*

/*
-----------------------------------------
Show Loading State
-----------------------------------------
*/
function setLoadingState(id) {

    ["temp", "rh", "rain", "wind"].forEach(metric => {

        const element =
            document.getElementById(
                `${id}-${metric}`
            );

        if (element) {

            element.textContent =
                "Loading...";

            element.classList.add(
                "loading"
            );

            element.classList.remove(
                "error"
            );
        }
    });
}


/*
-----------------------------------------
Show Error State
-----------------------------------------
*/
function setErrorState(id) {

    ["temp", "rh", "rain", "wind"].forEach(metric => {

        const element =
            document.getElementById(
                `${id}-${metric}`
            );

        if (element) {

            element.textContent =
                "N/A";

            element.classList.remove(
                "loading"
            );

            element.classList.add(
                "error"
            );
        }
    });
}
-----------------------------------------
Update one district card
-----------------------------------------
function updateDistrictCard(id, weather) {

    if (!weather) {

        setErrorState(id);
        return;
    }

    const tempElement =
        document.getElementById(
            `${id}-temp`
        );

    const rhElement =
        document.getElementById(
            `${id}-rh`
        );

    const rainElement =
        document.getElementById(
            `${id}-rain`
        );

    const windElement =
        document.getElementById(
            `${id}-wind`
        );


    if (tempElement) {

        tempElement.textContent =
            `${weather.temperature.toFixed(1)} °C`;

        tempElement.classList.remove(
            "loading",
            "error"
        );
    }

    if (rhElement) {

        rhElement.textContent =
            `${weather.humidity}%`;

        rhElement.classList.remove(
            "loading",
            "error"
        );
    }

    if (rainElement) {

        rainElement.textContent =
            `${weather.rainfall} mm`;

        rainElement.classList.remove(
            "loading",
            "error"
        );
    }

    if (windElement) {

        windElement.textContent =
            `${weather.wind} km/h`;

        windElement.classList.remove(
            "loading",
            "error"
        );
    }
}
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
            setLoadingState(districtId);

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
