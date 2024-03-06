import React, { useState, useEffect } from "react";
import { useInstantSearch } from "react-instantsearch";

const CustomHits = () => {
  const { scopedResults } = useInstantSearch();

  const [headerWidget, setHeaderWidget] = useState([]);
  const [results, setResults] = useState([]);

  useEffect(() => {
    if (scopedResults) {
      let items = scopedResults.filter((results) => results.indexId === 'clothing')[0]?.results?.hits
      const mabayaAdsHeaderItems = scopedResults.filter((results) => results.indexId === 'clothingMabayaHeader')[0]?.results?.hits
      const mabayaAdsIntegratedItems = scopedResults.filter((results) => results.indexId === 'clothingMabayaIntegrated')[0]?.results?.hits
      if (mabayaAdsHeaderItems || mabayaAdsIntegratedItems) {
        let adSkus = [];
        if (mabayaAdsHeaderItems) {
          mabayaAdsHeaderItems.forEach(({ objectID }) => adSkus.push(objectID))
        }
        if (mabayaAdsIntegratedItems) {
          mabayaAdsIntegratedItems.forEach(({ objectID }) => adSkus.push(objectID))
        }

        // Deduplicate items from main search results
        const deduplicatedItems = items.filter(({ objectID }) => !adSkus.includes(objectID))

        // Use whatever logic is required to combine the search results and the integrated mabaya ads
        const mabayaAdsIntegratedItemsWithTag = mabayaAdsIntegratedItems.map((item) => ({...item, sponsored: true}))
        const deduplicatedItemsWithTag = deduplicatedItems.map((item) => ({...item, sponsored: false}))
        const integratedSearchResults = [...mabayaAdsIntegratedItemsWithTag, ...deduplicatedItemsWithTag]

        // Set both the combined results and mabaya header ads on state for rendering
        setResults(integratedSearchResults)
        setHeaderWidget(mabayaAdsHeaderItems)
      }
    } else {
      setResults(scopedResults.filter((results) => results.indexId === 'clothing')[0]?.results?.hits)
    }
  }, [scopedResults])

  return (
    <>
    <div>
      <h1>HEADER</h1>
      {
        headerWidget.map((result) => <li key={result.objectID}>{result.name} SPONSORED</li>)
      }
    </div>
    <div>
      <h1>RESULTS</h1>
    <ul>
      {
        results.map((result) => <li key={result.objectID}>{result.name} {result.objectID} {result.sponsored ? "SPONSORED": ""}</li>)
      }
    </ul>
    </div>
    </>
  );
};

export default CustomHits;
