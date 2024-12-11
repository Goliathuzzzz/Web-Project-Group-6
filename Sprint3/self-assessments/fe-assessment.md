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