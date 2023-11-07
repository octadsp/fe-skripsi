let map;

// Initialize and add the map
async function initMap() {
    // Request needed libraries.
    const { Map } = await google.maps.importLibrary("maps");
    const { AdvancedMarkerElement } = await google.maps.importLibrary("marker");
    let markers = [];
    let collisionBehavior = google.maps.CollisionBehavior.REQUIRED;

    map = new Map(document.getElementById("map"), {
        mapId: "6ff586e93e18149f",
        center: { lat: 47.609414458375674, lng: -122.33897030353548 },
        zoom: 17,
    });

    // @ts-ignore
    const select = new mdc.select.MDCSelect(
        document.querySelector(".mdc-select"),
    );

    select.listen("MDCSelect:change", () => {
        collisionBehavior = select.value;
        markers.forEach((marker) => {
            marker.collisionBehavior = collisionBehavior;
        });
    });
    select.value = collisionBehavior;

    // Create some markers on the map
    let locations = [
        [-122.3402, 47.6093],
        [-122.3402, 47.6094],
        [-122.3403, 47.6094],
        [-122.3384, 47.6098],
        [-122.3389, 47.6095],
        [-122.3396, 47.6095],
        [-122.3379, 47.6097],
        [-122.3378, 47.6097],
        [-122.3396, 47.6091],
        [-122.3383, 47.6089],
        [-122.3379, 47.6093],
        [-122.3381, 47.6095],
        [-122.3378, 47.6095],
    ];

    locations.forEach(([lng, lat]) => {
        const advancedMarker = new AdvancedMarkerElement({
            position: new google.maps.LatLng({ lat, lng }),
            map,
            collisionBehavior: collisionBehavior,
        });

        markers.push(advancedMarker);
    });
}

initMap();