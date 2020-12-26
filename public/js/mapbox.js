/* eslint-disable */

export const displayMap = locations => {
  console.log(locations);
  mapboxgl.accessToken =
    'pk.eyJ1Ijoic2hpbWFhbWFobW91ZDEiLCJhIjoiY2tpajEyczN6MGJtZzJ4cXVuZ2dubnp5eiJ9.-Xu4nk0wDY_KAS6FvUzU6A';

  var map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/shimaamahmoud1/ckirkpdb502jz1ao7v7lol8wi',
    scrollZoom: false
    // center: [-118.113491, 34.111745],
    // zoom: 10,
    // interactive: false
  });
  map.setStyle('mapbox://styles/shimaamahmoud1/ckirkpdb502jz1ao7v7lol8wi');
  const bounds = new mapboxgl.LngLatBounds();

  locations.forEach(loc => {
    // Create marker
    const el = document.createElement('div');
    el.className = 'marker';

    // Add marker
    new mapboxgl.Marker({
      element: el,
      anchor: 'bottom'
    })
      .setLngLat(loc.coordinates)
      .addTo(map);

    // Add popup
    new mapboxgl.Popup({
      offset: 30
    })
      .setLngLat(loc.coordinates)
      .setHTML(`<p>Day ${loc.day}: ${loc.description}</p>`)
      .addTo(map);

    // Extend map bounds to include current location
    bounds.extend(loc.coordinates);
  });

  map.fitBounds(bounds, {
    padding: {
      top: 200,
      bottom: 150,
      left: 100,
      right: 100
    }
  });
};
