# Frontend Self-Assessment

## Map page

## Sprint 2 Implementation: MapTiler

The map implementation in sprint 2 was built using `Maptiler SDK`. The following features were introduced:
- Stations were fetched from a mock data JSON, no real-time updates.
- Markers were static and wouldn't change if they were clicked.
- Multiple placehodler elements.

**Challenges of MapTiler Approach**:
- **Dynamic Data Handling**: Limited support for integrating dynamic data sources like APIs.
- **React Integration**: Poor compatibility with React.
- **Performance Issues**: Rendering and interactivity were slow and laggy.

## Current Implementation: Leaflet

The new map implementation has been changed to use `Leaflet`, `React-Leaflet` and `Mapbox`. This new approach introduced significant enhancements:

**1. Dynamic Data Fetching:**
- Introduced `useStations` and `FetchStations` hooks to dynamically fetch station data based on map bounds. 
- Enhanced scalability and ensured real-time data updates.

**2. Optimized API Calls:**
- Added a `useDebounce` hook to prevent excessive API requests during rapid map movements.

**3. Efficient Marker Clustering:**
- Integrated `react-leaflet-markercluster` to improve performance and usability when working with large datasets.
- Markers change based on if they are clicked or not.

**4. Enhanced Map Design:**
- Adopted Mapbox tiles for greater flexibility in map design with environment variables for security.
- Replaced placeholder elements with styling that correspond to the prototype.

**Basic Implementation of the Map:**
```
import { MapContainer, TileLayer } from "react-leaflet";
import MarkerClusterGroup from "react-leaflet-markercluster";

const Map = ({ stations }) => {
  return (
    <MapContainer center={[51.0, 19.0]} zoom={4} maxZoom={18}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      <MarkerClusterGroup>
        {stations.map((station) => (
          <Marker key={station.id} position={[station.latitude, station.longitude]}>
            <Popup>{station.name}</Popup>
          </Marker>
        ))}
      </MarkerClusterGroup>
    </MapContainer>
  );
};
```
**5. User Geolocation:**
- Added support for displaying the user’s current position with a custom icon.

**6. Error Handling:**
- Added error handling for API calls with user-friendly messages when stations fail to load.

## Reflections and Impact

The shift to `Leaflet` and `React-Leaflet` has substantially improved the map’s performance, scalability, and user experience. The modular architecture has enhanced maintainability and readability.

## Future Opportunities

While the current implementation addresses many of the initial limitations, further improvements could include:

**1. Filtering:**
- Add options to filter displayed station based on user preferences (e.g. connector type, provider).

**2. Offline use:**
- Caching map tiles and data to support offline use.

**3. Accessibility Improvements:**
- Meeting accessibility standards to make the map usable for a wider audience (e.g. font type and size, colorblind mode)

---

## Enhancing Code and Functionality of the InfoBox Component

### Cluttered Infobox
The `InfoBox` component was very stuffed at the beginning with multiple different actions being handled in a single code block. This made the code a lot harder to read and debug. The logic for grouping connectors by type and power was directly implemented within the `InfoBox` component which made it much less modular.

### Extraction of Functionality
the solution was to refactor the code by extracting functions and creating a separate `ConnectorInfo` component. This improved code strcuture and made each function and component focus on a single task.

### Refactoring
**Helper Function for Grouping Connectors**
   - Extracted the connector grouping logic into the standalone `groupConnectors` function
     ```jsx
     const groupConnectors = (connectors) => {
       return connectors.reduce((acc, connector) => {
         const key = `${connector.connectionTypeID}-${connector.powerKW}`;
         if (!acc[key]) {
           acc[key] = { connector, count: 0 };
         }
         acc[key].count += 1;
         return acc;
       }, {});
     };
     ```
     This function can now be potentially reused in other components if needed.

**ConnectorInfo Component**
   - The logic for displaying connector details was moved into a new component
     ```jsx
     const ConnectorInfo = ({ connector, powerKW, count }) => {
       const connectorType = getConnectorTypeName(connector.connectionTypeID);

       return (
         <div className="relative p-3 bg-mediumBlue text-white rounded-md shadow space-y-1 w-64">
           <div className="flex items-center">
             <img src={connectorImages[connectorType] || ""} alt={connectorType} className="w-7 h-7 mr-3" />
             <span className={`${connectorColors[connectorType] || "text-gray-400"} font-semibold font-Orbitron`}>
               {connectorType}
             </span>
             <span className="font-Roboto ml-auto">{powerKW} kW</span>
             {count > 1 && <span className="text-eGreen ml-2 font-Roboto">x{count}</span>}
           </div>
         </div>
       );
     };
     ```
     This way the `InfoBox` component became less confusing and made it easier to test.


## Going from Mock Data to Real OCM Data

### Transition to Real Data
The `InfoBox` component at the beginning used mock data to display connector information and made early development and testing easier. Moving to real Open Charge Map (OCM) data we had to consider how to handle the data as it was formatted in a much different way than the mock data so changes had to be made in some functionality and styling.

**Fetching data**
- Integrated API calls to fetch real data from OCM making sure the component was dynamic and reflected actual data.

**Mapping Real Data to the Component**
- The real OCM data was handled and mapped to the format expected by the `ConnectorInfo` component.

### Display Enhancements
- The OCM data was used to map connector images and charger type names into the infobox.
- Incorporated additional data from OCM like the number of chargers and pricing if pricing information was available.

## Lessons Learned:
- Extracting reusable components and functions made the code more readable and reusable.

- Integrating real data showed the importance of error handling and flexible component design. This way the transition from mock data to real data was be much easier and smoother.