import React, { useState, useEffect } from "react";
import "./CurrencySearch.css";
import errorGif from "./error.gif";
import Gif from "./load.gif";

const useDebounce = (value, delay) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
};

const CurrencySearch = () => {
  const [searchValue, setSearchValue] = useState("");
  const [countries, setCountries] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showErrorGif, setShowErrorGif] = useState(false);
  const [showGif, setShowGif] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState(null);

  const debouncedSearchValue = useDebounce(searchValue, 500);

  useEffect(() => {
    if (debouncedSearchValue !== "") {
      handleSearch(debouncedSearchValue);
    }
  }, [debouncedSearchValue]);

  async function handleSearch(value) {
    setLoading(true);
    setError(null);
    setShowErrorGif(false);
    setShowGif(true);

    try {
      const response = await fetch(
        `https://restcountries.com/v3.1/currency/${value}`
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
  }

  const handleShowDetails = (country) => {
    setShowDetails(true);
    setSelectedCountry(country);
  };

  return (
    <>
    <div  > <div className="items-center justify-center "  >
        <div className="border border-solid border-gray-700 w-full bg-black rounded-md shadow-md">
          <h1 className="text-3xl font-bold p-5 text-white text-center"  style={{
    fontFamily: 'Times New Roman, Times, serif',
  }}>
            Currency to Country Search
          </h1>
        </div>
        <form
          className="flex items-center justify-center space-x-4 mt-10 mb-8"
          onSubmit={(e) => {
            e.preventDefault();
            setSearchValue(e.target.searchInput.value);
          }}
        >
          <input
            className="w-2/3 px-4 py-2 border border-black rounded-md focus:outline-none focus:ring focus:border-teal-700"
            type="search"
            id="searchInput"
            placeholder="🔍 Search by Currency Code (e.g., SEK) or Country Name (e.g.,India)"
            onChange={(e) => setSearchValue(e.target.value)}
          />
        </form>
        {loading && (
          <div className="mt-3 text-center">
            {showGif && (
              <img
                src={Gif}
                alt="Loading GIF"
                className="mt-3 mx-auto w-2/5 mb-4"
              />
            )}
          </div>
        )}
        {error && (
          <div className="mt-3 text-center">
            {showErrorGif && (
              <img
                src={errorGif}
                alt="Error GIF"
                className="mt-3 mx-auto h-1/6 w-2/6 mb-4"
              />
            )}
          </div>
        )}

        {!showErrorGif && (
          <div className="container border border-Solid border-white bg-slate-700 mx-auto p-5  rounded-md shadow-md">
            <h2 className="text-2xl font-bold mb-8 text-center p-5 rounded-md bg-teal-500 text-white" style={{
    fontFamily: 'Times New Roman, Times, serif',
  }}>
               Country Info🗒️
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {countries.map((country, index) => (
                <div
                  key={index}
                  className="bg-white border border-Solid border-teal-500 p-4 rounded-md shadow-md transition duration-300 transform hover:scale-105"
                >
               
                  <img
                    src={`https://flagsapi.com/${country.cca2}/flat/64.png`}
                    alt={country.altSpellings[1]}
                    className="w-2/5  mx-auto mb-2 max-h-32"
                  />
                  <hr />
                  <div className="w-70 h-20 mx-auto">
                  <h4 className="text-md  mt-4 font-semibold text-center">
                     Name: {country.altSpellings[1] || "N/A"}
                  </h4>
                  <p className="text-gray-600 text-center">
                    Capital:{" "}
                    {country.capital ? country.capital[0] : "N/A"}
                  </p></div>
                  <button
                    onClick={() => handleShowDetails(country)}
                    className=" w-3/5 bg-teal-500 text-white rounded-md px-4 py-2 focus:outline-none hover:bg-pink-900"
                    style={{ display: 'block', margin: 'auto', marginTop: '10px' }}
                  >
                    Show More Details ⬆️
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div></div>
     

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
              <strong>Region: </strong>
              {selectedCountry.region ? selectedCountry.region[0] : "N/A"}
            </p>
            <p className="text-gray-600">
              <strong>Population:</strong>{" "}
              {selectedCountry.population
                ? selectedCountry.population.toLocaleString()
                : "N/A"}
            </p>
            <p className="text-gray-600">
              <strong>Subregion: </strong>
              {selectedCountry.subregion ? selectedCountry.subregion[0] : "N/A"}
            </p>
            <p className="text-gray-600">
              <strong>Languages: </strong>
              {selectedCountry.languages
                ? Object.values(selectedCountry.languages).join(", ")
                : "N/A"}
            </p>
            <p className="text-gray-600">
              <strong>Gini Index (2018): </strong>
              {selectedCountry.gini ? selectedCountry.gini[2018] : "N/A"}
            </p>
            <p className="text-gray-600">
              <strong>FIFA Code: </strong>{" "}
              {selectedCountry.fifa ? selectedCountry.fifa : "N/A"}
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
