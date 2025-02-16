import { createContext, useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { API_BASE_URL } from '../config.js';
import { useLocalStorage } from '../hooks/useLocalStorage.js';

const AppContext = createContext({});

/**
 * TODO: Ticket 2:
 * - Use axios to fetch the data
 * - Store the data
 * - Populate the graphs with the stored data
 */
const useAppContextProvider = () => {
  //make sure graphData always starts with an empty structure to prevent errors
  const [graphData, setGraphData] = useState({
    yearResults: [],
    citizenshipResults: [],
  });

  const [isDataLoading, setIsDataLoading] = useState(false);

  useLocalStorage({ graphData, setGraphData });

  const fetchData = async () => {
    // TODO: fetch all the required data and set it to the graphData state
    try {
  
    //Fetch fiscal year data
    const fiscalResponse = await axios.get(`${API_BASE_URL}/fiscalSummary`)
    const fiscalData = fiscalResponse.data

    //Fetch citizenship data
    const citizenshipResponse = await axios.get(`${API_BASE_URL}/citizenshipSummary`)
    const citizenshipData = citizenshipResponse.data

    //Log API response to console for debugging
    console.log('Fetched data from API:', {fiscalData, citizenshipData})

    //Change the data to match the test_data.json format
    const formattedData = {
      yearResults: fiscalData?.yearResults || [], 
      citizenshipResults: Array.isArray(citizenshipData) ? citizenshipData : [],  
    }
    
    //update state with new API data
    setGraphData(formattedData)
  } catch (error) {
    console.error("Error fetching API data", error.message)
  } finally {
    setIsDataLoading(false) //hide "loading" after data fetch
  }
};

  //update data when the user requests it
  const updateQuery = async () => {
    setIsDataLoading(true)          
    await fetchData()
  };

  //clears the stored graph data
  const clearQuery = () => {
    setGraphData({
      yearResults: [],
      citizenshipResults: [],
    });
  };
  
  // makes sure yearResults is always an array before mapping
  const getYears = () => Array.isArray(graphData?.yearResults) ? graphData.yearResults.map(({ fiscal_year }) => Number(fiscal_year)) : [];

  // fetch data once when the app starts
  useEffect(() => {
    fetchData() 
  }, []);

  return {
    graphData,
    setGraphData,
    isDataLoading,
    updateQuery,
    clearQuery,
    getYears,
  };
};

export function useAppContext() {
  return useContext(AppContext);
}

export function ProvideAppContext({ children }) {
  const contextValue = useAppContextProvider();

  return <AppContext.Provider value={contextValue}>{children}</AppContext.Provider>;
}