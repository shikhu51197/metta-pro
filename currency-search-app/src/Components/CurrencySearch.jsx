// src/components/CurrencySearch.js
import React, { useState } from "react";
import "./CurrencySearch.css";
import errorGif from "./error.gif";
import Gif from "./load.gif";

const CurrencySearch = () => {
  const [searchValue, setSearchValue] = useState("");
  const [countries, setCountries] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showErrorGif, setShowErrorGif] = useState(false);
  const [showGif, setShowGif] = useState(false);

  const handleSearch = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setShowErrorGif(false);
    setShowGif(true);

    try {
      const response = await fetch(
        `https://restcountries.com/v3.1/currency/${searchValue}`
      );
      const data = await response.json();

      if (response.ok) {
        setCountries(data);
      } else {
        setError(`Error: ${response.status}`);
        setShowErrorGif(true);
      }
    } catch (error) {
      setError("Error fetching data");
      setShowErrorGif(true);
    } finally {
      setLoading(false);
      setShowGif(false);
    }
  };

  return (
    <>
      <div className="bg-gradient-to-r from-yellow-100 to-green-200  p-10   items-center justify-center ">
        <div className="container border border-solid border-black mx-auto mt-10  p-5 bg-gray-100 rounded-md shadow-md">
          <h1 className="text-3xl font-bold  text-center">
            Currency to Country Search
          </h1>
        </div>
        <form
          className="flex items-center justify-center space-x-4  mt-10 mb-20"
          onSubmit={handleSearch}
        >
          <input
            className="w-96 px-4 py-2 border border-black rounded-md focus:outline-none focus:ring focus:border-blue-300"
            type="search"
            placeholder="Enter currency code (e.g., SEK)"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
          />
          <button
            className="px-6 py-2 bg-blue-800 text-white rounded-md focus:outline-none hover:bg-blue-600"
            type="submit"
            disabled={loading}
          >
            Search 
          </button>
        </form>
        {loading && (
          <div className="mt-3 text-center">
            {showGif && (
              <img src={Gif} alt="Loading GIF" className="mt-3 mx-auto w-4/5" />
            )}
          </div>
        )}

        {error && (
          <div className="mt-3 text-center">
            {showErrorGif && (
              <img
                src={errorGif}
                alt="Error GIF"
                className="mt-3 mx-auto max-w-full"
              />
            )}
          </div>
        )}
        <div className="container border border-solid border-black mx-auto  p-5 bg-gray-100 rounded-md shadow-md">
          <h2 className="text-2xl font-bold mb-5 text-center text-pink-600">
            Country Information
          </h2>
          {/* <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 rounded-md gap-4 border border-solid border-black"> */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 mt-5">
              {countries.map((country, index) => (
                <div
                  key={index}
                  className="bg-white p-4 h-100  rounded-md shadow-md transition duration-300 transform hover:scale-105"
                >
                 {/* <h2 className="text-xl font-semibold mb-2">General Information</h2> */}
                  <img
                    src={`https://flagsapi.com/${country.cca2}/flat/64.png`}
                    alt={country.altSpellings[1]}
                    className="w-full mb-2 "
                  />
                   
                  <h3 className="text-xl font-semibold">
                    {country.altSpellings[1] || "Country Name"}
                  </h3>
                  <p>Official Name:{country.name.official}</p>
                  <p className="text-gray-600">
                    Capital: {country.capital ? country.capital[0] : "N/A"}
                  </p>
                  <p className="text-gray-600">
                    Region: {country.region ? country.region[0] : "N/A"}
                  </p>
                  <p className="text-gray-600">
                    Population:{" "}
                    {country.population
                      ? country.population.toLocaleString()
                      : "N/A"}
                  </p>
                  <p className="text-gray-600">
                    NativeName:{" "}
                    {country.nativeName ? country.nativeName[0] : "N/A"}
                  </p>
                  <p className="text-gray-600">
                    Currencies:
                    {/* {country.currencies ? country.currencies.SEK.name : "N/A"} */}
                  </p>
                  
                  
                </div>
              ))}
            </div>
          </div>{" "}
        </div>
     
    </>
  );
};

export default CurrencySearch;
