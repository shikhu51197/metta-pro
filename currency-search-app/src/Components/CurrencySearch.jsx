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
  const [showDetails, setShowDetails] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState(null);

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
  const handleShowDetails = (country) => {
    setShowDetails(true);
    setSelectedCountry(country);
  };
  return (
    <>
      <div className="items-center justify-center ">
        <div className=" border border-solid border-gray-700  w-full   bg-black rounded-md shadow-md">
          <h1 className="text-3xl font-bold p-5 text-white text-center">
            Currency to Country Search
          </h1>
        </div>
        <form
          className="flex items-center justify-center space-x-4  mt-10 mb-20"
          onSubmit={handleSearch}
        >
      
          <input
            className="w-2/5 px-4 py-2 border border-black rounded-md focus:outline-none focus:ring focus:border-blue-300"
            type="search"
            placeholder="Enter CurrencyCode (e.g.,SEK) & Name (e.g.,India)"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
          />
          <button
            className="px-6 py-2 bg-zinc-300  rounded-md focus:outline-none hover:bg-zinc-600 hover:text-white"
            type="submit"
            disabled={loading}
          >
            Search🔍
          </button>
        </form>
        {loading && (
  <div className="mt-3 text-center">
    {showGif && (
      <img src={Gif} alt="Loading GIF" className="mt-3 mx-auto w-2/5 mb-10" />
    )}
  </div>
)}
{error && (
  <div className="mt-3 text-center">
    {showErrorGif && (
      <img
        src={errorGif}
        alt="Error GIF"
        className="mt-3 mx-auto h-1/6 w-2/6 mb-10"  
      />
    )}
  </div>
)}


{showErrorGif && showErrorGif ? null :<div className="container border border-solid border-gray-700 mx-auto p-5  bg-gradient-to-r from-teal-500 to-indigo-500 rounded-md shadow-md">
  <h2 className="text-2xl font-bold mb-20 text-center p-5 bg-black text-white">
   Each Country Info
  </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 mt-5">
            {countries.map((country, index) => (
              <div
                key={index}
                className="bg-white p-4 h-100  rounded-md shadow-md transition duration-300 transform hover:scale-105"
              >
                <h3 className="text-xl text-blue-700 p-5 bg-pink-100 rounded-md text-center font-semibold mb-2">General Information</h3>
                <img
                  src={`https://flagsapi.com/${country.cca2}/flat/64.png`}
                  alt={country.altSpellings[1]}
                  className="w-full mb-2 "
                />

                <h4 className="text-lg font-semibold text-center">
                Country  Name: {country.altSpellings[1] || "Country Name"}
                </h4>

                <p className="text-gray-600 text-center">
                Country  Capital: {country.capital ? country.capital[0] : "N/A"}
                </p>

                <button
                  onClick={() => handleShowDetails(country)}
                  className="mt-10 mx-auto w-full bg-purple-700 text-white rounded-md px-4 py-2 focus:outline-none hover:bg-blue-600"
                >
                  Show More Details  ⬆️
                </button>
              </div>
            ))}
          </div>
        </div>}

      </div>
      
      {showDetails && selectedCountry && (
        <div className="fixed inset-0 z-10 overflow-y-auto bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-8 max-w-2xl mx-auto rounded-md shadow-md">
            <h2 className="text-2xl font-bold mb-4">
              More Details for {selectedCountry.altSpellings[1]}
            </h2>
            <p className="text-gray-600">
              <strong>Currency Name:</strong>{" "}
              {selectedCountry.currencies?.SEK?.name || "N/A"}
            </p>
            <p className="text-gray-600">
              <strong>Currency Symbol:</strong>{" "}
              {selectedCountry.currencies?.SEK?.symbol || "N/A"}
            </p>
            <p className="text-gray-600">
            <strong>Region:{" "} </strong>
              {selectedCountry.region ? selectedCountry.region[0] : "N/A"}
            </p>
            <p className="text-gray-600">
            <strong>Population:</strong>
              {selectedCountry.population
                ? selectedCountry.population.toLocaleString()
                : "N/A"}
            </p>

            <p className="text-gray-600">
            <strong>Subregion:{" "} </strong>
              {selectedCountry.subregion ? selectedCountry.subregion[0] : "N/A"}
            </p>
            <p className="text-gray-600">
              <strong>Languages:{" "} </strong>
              {selectedCountry.languages
                ? Object.values(selectedCountry.languages).join(", ")
                : "N/A"}
            </p>

            <p className="text-gray-600">
              <strong>Gini Index (2018):{" "} </strong>
              {selectedCountry.gini ? selectedCountry.gini[2018] : "N/A"}
            </p>
            <p className="text-gray-600">
              <strong>FIFA Code: </strong> {selectedCountry.fifa ? selectedCountry.fifa : "N/A"}
            </p>
            <p className="text-gray-600">
              <strong>Timezones: </strong>
              {selectedCountry.timezones
                ? selectedCountry.timezones.join(", ")
                : "N/A"}
            </p>
            <button
              onClick={() => {
                setShowDetails(false);
                setSelectedCountry(null);
              }}
              className="mt-4 bg-red-500 text-white rounded-md px-4 py-2 focus:outline-none hover:bg-red-600"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default CurrencySearch;
