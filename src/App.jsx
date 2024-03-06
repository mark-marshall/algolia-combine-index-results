import algoliasearch from "algoliasearch";
import {
  InstantSearch,
  SearchBox,
  Configure,
  Index,
} from "react-instantsearch";

import CustomHits from "./CustomHits";

const indexName = "clothing";
const appId = "G2NZC3DJJT";
const apiKey = "667fbe62f187273ff7398ab19d3903d5";

const searchClient = algoliasearch(appId, apiKey);

// 1) "heading widget" ads
const mabayaAdsHeader = [
  {
    id: "sku-7",
    type: "header",
  },
];

// 2) 5 integrated results ads
const mabayaAdsIntegrated = [
  {
    id: "sku-2",
    type: "integrated",
  },
  {
    id: "sku-3",
    type: "integrated",
  },
  {
    id: "sku-4",
    type: "integrated",
  },
  {
    id: "sku-5",
    type: "integrated",
  },
  {
    id: "sku-1",
    type: "integrated",
  },
];

const App = () => {
  return (
    <InstantSearch indexName={indexName} searchClient={searchClient}>
      <SearchBox />
      <Index indexName="clothing" indexId="clothingMabayaHeader">
        <Configure
          query=""
          filters={mabayaAdsHeader
            .map((ad, idx) => `objectID:${ad.id}`)
            .join(" OR ")}
        />
      </Index>

      <Index indexName="clothing" indexId="clothingMabayaIntegrated">
        <Configure
         query=""
          filters={mabayaAdsIntegrated
            .map((ad, idx) => `objectID:${ad.id}`)
            .join(" OR ")}
        />
      </Index>

      <Index indexName="clothing" indexId="clothingMain"></Index>
      <CustomHits />
    </InstantSearch>
  );
};

export default App;
