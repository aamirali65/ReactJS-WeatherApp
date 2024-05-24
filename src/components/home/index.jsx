import React, { useState } from "react";
import "./home.css";
import axios from "axios";

const Home = () => {
  const [search, setSearch] = useState("");
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const searchCity = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const apiKey = "344b8b67978954fc995048eb3945a333";

    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${search}&appid=${apiKey}&units=metric`
      );
      setWeather(response.data);
      setLoading(false);
    } catch (err) {
      setError("City not found or Invalid API key");
      setLoading(false);
    }
  };

  return (
    <>
      <div id="main" className="flex justify-center text-center py-10">
        <div id="content" className="z-10 mx-96">
          <h1 className="text-3xl sm:text-5xl font-bold">Weather App</h1>
          <a
            className="text-[20px] block mt-3"
            href="https://github.com/aamirali65/"
            target="_blank"
            rel="noopener noreferrer"
          >
            github.com/aamirali65
          </a>
          <form onSubmit={searchCity}>
            <div
              id="search"
              className="mt-10 w-full flex justify-center items-center rounded-lg"
            >
              <input
                type="text"
                placeholder="search city..."
                name="search"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="border px-2 py-1 rounded-l-lg"
              />
              <button className="px-4 py-1 bg-blue-500 text-white rounded-r-lg">
                Check
              </button>
            </div>
          </form>
          <div id="result" className="mt-10">
            {loading && <p>Loading...</p>}
            {error && <p>{error}</p>}
            {weather && (
              <div id="weather" className="flex gap-3 flex-col">
                <h1 className="text-2xl font-semibold">
                  {weather.name}, {weather.sys.country}
                </h1>
                <h1 className="text-7xl font-bold">
                  {weather.main.temp} °C
                </h1>
                <div id="side-weather" className="flex flex-col gap-6 mt-10">
                  <div className="inner flex justify-between text-[20px] font-medium sm:text-2xl">
                    <h1>
                      <i className="fa fa-wind mx-3"></i>WIND
                    </h1>
                    <h1>{weather.wind.speed} m/s</h1>
                  </div>
                  <div className="inner flex justify-between text-[20px] font-medium sm:text-2xl">
                    <h1>
                      <i className="fa fa-cloud mx-3"></i>PRESSURE
                    </h1>
                    <h1>{weather.main.pressure} hPa</h1>
                  </div>
                  <div className="inner flex justify-between text-[20px] font-medium sm:text-2xl">
                    <h1>
                      <i className="fa fa-water mx-3"></i>HUMIDITY
                    </h1>
                    <h1>{weather.main.humidity}%</h1>
                  </div>
                </div>
              </div>
            )}
            <div className="py-10">
                <h1 className="text-2xl font-bold">Designed & Built by Aamir Almani</h1>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
