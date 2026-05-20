export default function KashmirAgroMetDashboard() {
  const districts = [
    "Srinagar",
    "Shopian",
    "Pulwama",
    "Budgam",
    "Anantnag",
    "Kulgam",
    "Baramulla",
    "Sopore",
    "Kupwara",
    "Bandipora",
  ];

  const mockData = districts.map((district) => ({
    district,
    temp: "--",
    rh: "--",
    rain: "--",
    wind: "--",
    gdd: "--",
  }));

  return (
    <div className="min-h-screen bg-slate-100 p-6">
      <div className="mx-auto max-w-7xl space-y-6">
        {/* Header */}
        <div className="rounded-3xl bg-white p-6 shadow-sm">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <h1 className="text-3xl font-bold text-slate-800">
                Kashmir Apple Agro-Meteorological Dashboard
              </h1>
              <p className="mt-2 text-sm text-slate-500">
                Realtime weather comparison across major apple-growing districts of Kashmir
              </p>
            </div>

            <div className="rounded-2xl bg-slate-100 px-4 py-3 text-sm text-slate-600">
              Last Updated: --
            </div>
          </div>
        </div>

        {/* Controls */}
        <div className="flex flex-wrap gap-3">
          <button className="rounded-2xl bg-slate-800 px-5 py-3 text-sm font-medium text-white shadow-sm transition hover:scale-[1.02]">
            Current Weather
          </button>

          <button className="rounded-2xl bg-white px-5 py-3 text-sm font-medium text-slate-700 shadow-sm transition hover:bg-slate-50">
            Forecast
          </button>

          <button className="rounded-2xl bg-white px-5 py-3 text-sm font-medium text-slate-700 shadow-sm transition hover:bg-slate-50">
            Previous 5 Days
          </button>
        </div>

        {/* Dashboard Table */}
        <div className="overflow-hidden rounded-3xl bg-white shadow-sm">
          <div className="overflow-x-auto">
            <table className="min-w-full border-collapse">
              <thead>
                <tr className="bg-slate-800 text-left text-sm uppercase tracking-wide text-white">
                  <th className="px-6 py-4 font-semibold">District</th>
                  <th className="px-6 py-4 font-semibold">Temp (°C)</th>
                  <th className="px-6 py-4 font-semibold">RH (%)</th>
                  <th className="px-6 py-4 font-semibold">Rain (mm)</th>
                  <th className="px-6 py-4 font-semibold">Wind (km/h)</th>
                  <th className="px-6 py-4 font-semibold">GDD</th>
                </tr>
              </thead>

              <tbody>
                {mockData.map((row, index) => (
                  <tr
                    key={row.district}
                    className={`border-b border-slate-100 text-sm transition hover:bg-slate-50 ${
                      index % 2 === 0 ? "bg-white" : "bg-slate-50/50"
                    }`}
                  >
                    <td className="px-6 py-4 font-semibold text-slate-800">
                      {row.district}
                    </td>

                    <td className="px-6 py-4 text-slate-700">
                      {row.temp}
                    </td>

                    <td className="px-6 py-4 text-slate-700">
                      {row.rh}
                    </td>

                    <td className="px-6 py-4 text-slate-700">
                      {row.rain}
                    </td>

                    <td className="px-6 py-4 text-slate-700">
                      {row.wind}
                    </td>

                    <td className="px-6 py-4 text-slate-700">
                      {row.gdd}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Footer Notes */}
        <div className="rounded-3xl bg-white p-5 text-sm text-slate-500 shadow-sm">
          <p>
            Prototype dashboard for comparative agro-meteorological monitoring of apple-growing districts in Kashmir.
          </p>

          <p className="mt-2">
            Future modules may include forecast visualization, historical weather trends, pest emergence models,
            disease risk prediction, chill accumulation, and phenological stage estimation.
          </p>
        </div>
      </div>
    </div>
  );
}
