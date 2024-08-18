import React, { useEffect, useRef } from 'react';
import mapboxgl from 'mapbox-gl';
import './MapPlaceholder.css';

function MapPlaceholder() {
  const mapContainer = useRef(null);

  useEffect(() => {
    // Set the Mapbox access token
    mapboxgl.accessToken = 'pk.eyJ1IjoiY2lhbmdpbmVzdCIsImEiOiJjbHpsY2FxcWgwMWJwMmtyNHp2bzIzNmc1In0.jVrFBBQ7ns3OfHzWEA-mbQ';

    // Initialize the map
    const map = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [-6.224300, 53.307882], // Set to campus location
      zoom: 15
    });

    // Define bin locations and random fullness levels
    const bins = [
      { id: 1, coordinates: [-6.224291, 53.308671], fullness: 80.83 },
      { id: 2, coordinates: [-6.222194, 53.306744], fullness: 35.14 },
      { id: 3, coordinates: [-6.228969, 53.309712], fullness: 72.95 },
      { id: 4, coordinates: [-6.229729, 53.308948], fullness: 9.39 },
      { id: 5, coordinates: [-6.226828, 53.310326], fullness: 83.43 },
      // Add more bins here
    ];

    // Create GeoJSON data
    const geojson = {
      type: 'FeatureCollection',
      features: bins.map(bin => ({
        type: 'Feature',
        geometry: {
          type: 'Point',
          coordinates: bin.coordinates
        },
        properties: {
          id: bin.id,
          fullness: bin.fullness.toFixed(2) // Rounded to 2 decimal places
        }
      }))
    };

    // Display bins on the map
    map.on('load', () => {
      map.addSource('bins', {
        type: 'geojson',
        data: geojson
      });

      map.addLayer({
        id: 'bins',
        type: 'circle',
        source: 'bins',
        paint: {
          'circle-radius': 6,
          'circle-color': [
            'case',
            ['>', ['get', 'fullness'], 50], 'red', // Red for fullness > 50%
            'green' // Green otherwise
          ]
        }
      });

      // Add click event listener to display popup with fullness level
      map.on('click', 'bins', (e) => {
        const coordinates = e.features[0].geometry.coordinates.slice();
        const fullness = e.features[0].properties.fullness;

        // Ensure the popup appears above the clicked point
        while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
          coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
        }

        new mapboxgl.Popup()
          .setLngLat(coordinates)
          .setHTML(`<strong>Bin ID:</strong> ${e.features[0].properties.id}<br><strong>Fullness:</strong> ${fullness}%`)
          .addTo(map);
      });

      // Change the cursor to a pointer when hovering over bins
      map.on('mouseenter', 'bins', () => {
        map.getCanvas().style.cursor = 'pointer';
      });

      // Revert the cursor back to normal when not hovering over bins
      map.on('mouseleave', 'bins', () => {
        map.getCanvas().style.cursor = '';
      });

      // Filter bins for collection
      const binsForCollection = bins.filter(bin => bin.fullness > 50);

      // Create a graph representation with actual distances using the walking profile
      const graph = {};
      binsForCollection.forEach(bin => {
        graph[bin.id] = {};
        binsForCollection.forEach(otherBin => {
          if (bin.id !== otherBin.id) {
            graph[bin.id][otherBin.id] = calculateDistance(bin.coordinates, otherBin.coordinates);
          }
        });
      });

      // Dijkstra's algorithm implementation to find the shortest path
      function dijkstra(graph, startNode) {
        const distances = {};
        const visited = new Set();
        const previous = {};

        Object.keys(graph).forEach(node => {
          distances[node] = Infinity;
          previous[node] = null;
        });

        distances[startNode] = 0;

        while (visited.size < Object.keys(graph).length) {
          const [currentNode] = Object.entries(distances)
            .filter(([node]) => !visited.has(node))
            .reduce((acc, [node, dist]) => (dist < acc[1] ? [node, dist] : acc), [null, Infinity]);

          if (currentNode === null) break;

          visited.add(currentNode);

          for (const [neighbor, distance] of Object.entries(graph[currentNode])) {
            const newDist = distances[currentNode] + distance;
            if (newDist < distances[neighbor]) {
              distances[neighbor] = newDist;
              previous[neighbor] = currentNode;
            }
          }
        }

        return { distances, previous };
      }

      // Calculate Dijkstra's path that covers all bins over 50% fullness
      const startBinId = binsForCollection[0].id;
      const dijkstraResult = dijkstra(graph, startBinId);

      // Get the path from Dijkstra's result
      function getPath(dijkstraResult, targetBinId) {
        let path = [];
        let currentNode = targetBinId;

        while (currentNode !== null) {
          path.unshift(currentNode);
          currentNode = dijkstraResult.previous[currentNode];
        }

        return path;
      }

      // Function to get route between two coordinates using Mapbox Directions API with walking profile
      function getRoute(start, end, callback) {
        const url = `https://api.mapbox.com/directions/v5/mapbox/walking/${start[0]},${start[1]};${end[0]},${end[1]}?geometries=geojson&access_token=${mapboxgl.accessToken}`;

        fetch(url)
          .then(response => response.json())
          .then(data => {
            const route = data.routes[0].geometry;
            callback(route);
          });
      }

      // Function to calculate direct distance between two points (used in graph)
      function calculateDistance(coord1, coord2) {
        const R = 6371e3; // Earth's radius in meters
        const lat1 = coord1[1] * Math.PI / 180;
        const lat2 = coord2[1] * Math.PI / 180;
        const deltaLat = (coord2[1] - coord1[1]) * Math.PI / 180;
        const deltaLon = (coord2[0] - coord1[0]) * Math.PI / 180;

        const a = Math.sin(deltaLat / 2) * Math.sin(deltaLat / 2) +
          Math.cos(lat1) * Math.cos(lat2) *
          Math.sin(deltaLon / 2) * Math.sin(deltaLon / 2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

        return R * c; // Distance in meters
      }

      // Generate and draw the entire path on the map
      function drawFullPath() {
        let fullPath = [];

        for (let i = 0; i < binsForCollection.length - 1; i++) {
          const startBin = binsForCollection[i];
          const endBin = binsForCollection[i + 1];

          fullPath.push(new Promise((resolve) => {
            getRoute(startBin.coordinates, endBin.coordinates, (route) => {
              resolve(route);
            });
          }));
        }

        Promise.all(fullPath).then(routes => {
          routes.forEach((route, index) => {
            map.addLayer({
              id: `route-${index}`,
              type: 'line',
              source: {
                type: 'geojson',
                data: {
                  type: 'Feature',
                  geometry: route
                }
              },
              paint: {
                'line-color': '#ff0000',
                'line-width': 4
              }
            });
          });
        });
      }

      drawFullPath();
    });

    return () => map.remove(); // Clean up the map instance when the component is unmounted
  }, []);

  return (
    <div className="map-container">
      <div className="map-placeholder" ref={mapContainer} />
      <div className="info-panel">
        {/* Info panel content */}
        <h2>Collection Status</h2>
        <p>Attention: The bins marked with a red status are now over 50% full and require immediate attention. Please review the details below.</p>
        
        <h3>Recommended Collection Route</h3>
        <p>Estimated Time: <strong>6 minutes</strong></p>
        <p>Route: <strong>Merville Residences -> UCD Engineering Building -> Ashfield Student Residences</strong></p>
      </div>
    </div>
  );
}

export default MapPlaceholder;


