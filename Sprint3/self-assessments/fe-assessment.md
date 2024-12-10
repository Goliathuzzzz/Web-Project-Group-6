# Map page

## Sprint 2 State: MapTiler

The map implementation in sprint 2 was built using `Maptiler SDK`. Key features included:
- Markers were statically placed using mock data.
- Custom markers were managed through event listeners.
- Basic interactivity to open an info box when clicking on markers.

Issues with this approach:
- Handling dynamic data sources like APIs was not well-supported.
- Rendering and interactivity was laggy.

## Current State: Leaflet

The new map implementation leverages `Leaflet`, complemented by `React-Leaflet` and `Mapbox`. Key improvements included: