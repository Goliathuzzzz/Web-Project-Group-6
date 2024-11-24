import { useState } from "react";
import mapCharger from "../../assets/images/map_charger.png";
import mapService from "../../assets/images/map_service.png";
import mapOther from "../../assets/images/map_other.png";
import FilterBox from "./FilterBox";

function FilterButtons() {
  const [visible, setVisible] = useState(null);

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
            content="Select the providers you want to filter."
            onClose={() => setVisible(null)}
          />
        )}
      </div>

      {/* Other filter button */}
      <div className="relative">
        <button
          onClick={() => toggleBox("other")}
          className="pb-2 transform transition-transform duration-200 hover:scale-110 hover:brightness-150"
        >
          <img src={mapOther} alt="Other filter" className="w-10 h-10" />
        </button>
        {visible === "other" && (
          <FilterBox
            title="Other Filter"
            content="Configure additional filters for your map."
            onClose={() => setVisible(null)}
          />
        )}
      </div>
    </div>
  );
}

export default FilterButtons;
