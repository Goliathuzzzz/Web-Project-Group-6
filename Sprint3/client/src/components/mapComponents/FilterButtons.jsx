import { useState, useEffect } from "react";
import mapCharger from "../../assets/images/map_charger.png";
import mapService from "../../assets/images/map_service.png";
import mapOther from "../../assets/images/map_other.png";
import FilterBox from "./FilterBox";
import { ChargerTypeData } from "./filterData";

function FilterButtons() {
  const [visible, setVisible] = useState(null);
  const [query, setQuery] = useState("");
  const [selectedProviders, setSelectedProviders] = useState([]);
  const [selectedLocations, setSelectedLocations] = useState([]);
  const [selectedConnectors, setSelectedConnectors] = useState([]);
  const updateQuery = () => {
    let newQuery = "";
    if (selectedProviders.length > 0) {
      newQuery += "&provider=" + selectedProviders.join("&provider=");
    }
    if (selectedLocations.length > 0) {
      newQuery += "&location=" + selectedLocations.join("&location=");
    }
    if (selectedConnectors.length > 0) {
      newQuery += "&connectors=" + selectedConnectors.join("&connectors=");
    }
    setQuery(newQuery);
  };

  const handleProviderChange = (value) => {
    if (selectedProviders.includes(value)) {
      setSelectedProviders((items) => items.filter((item) => item !== value));
    } else {
      setSelectedProviders([...selectedProviders, value]);
    }
  };

  const handleLocationChange = (value) => {
    if (selectedLocations.includes(value)) {
      setSelectedLocations((items) => items.filter((item) => item !== value));
    } else {
      setSelectedLocations([...selectedLocations, value]);
    }
  };

  const handleConnectorsChange = (value) => {
    if (selectedConnectors.includes(value)) {
      setSelectedConnectors((items) => items.filter((item) => item !== value));
    } else {
      setSelectedConnectors([...selectedConnectors, value]);
    }
  };

  useEffect(() => {
    updateQuery();
  }, [selectedConnectors, selectedLocations, selectedProviders]);

  // For debugging query
  useEffect(() => {
    console.log(query);
  }, [query]);

  const clearQuery = () => {
    setQuery("");
    setComplexQuery(false);
    setSelectedProviders([]);
    setSelectedLocations([]);
    setSelectedConnectors([]);
  };

  const toggleBox = (boxName) => {
    setVisible(visible === boxName ? null : boxName);
  };

  return (
    <div className="absolute top-20 right-6 z-10 rounded flex flex-col gap-1">
      {/* Charger type filter button */}
      <div className="relative">
        <button
          onClick={() => toggleBox("chargerType")}
          className="pb-2 transform transition-transform duration-200 hover:scale-110 hover:brightness-150"
        >
          <img
            src={mapCharger}
            alt="Charger type filter"
            className="w-10 h-10"
          />
        </button>
        {visible === "chargerType" && (
          <FilterBox
            title="Charger Type Filter"
            query={query}
            onUpdateQuery={handleConnectorsChange}
            onClearQuery={clearQuery}
            chargerData={ChargerTypeData}
            content="Select the types of chargers you want to filter."
            onClose={() => setVisible(null)}
          />
        )}
      </div>

      {/* Provider filter button */}
      <div className="relative">
        <button
          onClick={() => toggleBox("provider")}
          className="pb-2 transform transition-transform duration-200 hover:scale-110 hover:brightness-150"
        >
          <img src={mapService} alt="Provider filter" className="w-10 h-10" />
        </button>
        {visible === "provider" && (
          <FilterBox
            title="Provider Filter"
            query={query}
            onUpdateQuery={handleProviderChange}
            onClearQuery={clearQuery}
            selected={selectedProviders}
            onClose={() => setVisible(null)}
          />
        )}
      </div>

      {/* Location filter button */}
      <div className="relative">
        <button
          onClick={() => toggleBox("other")}
          className="pb-2 transform transition-transform duration-200 hover:scale-110 hover:brightness-150"
        >
          <img src={mapOther} alt="Other filter" className="w-10 h-10" />
        </button>
        {visible === "other" && (
          <FilterBox
            title="Location Filter"
            query={query}
            onUpdateQuery={handleLocationChange}
            onClearQuery={clearQuery}
            selected={selectedLocations}
            onClose={() => setVisible(null)}
          />
        )}
      </div>
    </div>
  );
}

export default FilterButtons;
