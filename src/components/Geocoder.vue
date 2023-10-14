<template>
    <div>
        <input type="text" ref="autocompleteInput" autocomplete="street-address"
            placeholder="Start typing your address..." />
    </div>
</template>

<script>
import mapboxgl from 'mapbox-gl';
import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';

export default {
    mounted() {
        mapboxgl.accessToken = 'pk.eyJ1IjoidmluY2VudC1uZGVnd2EiLCJhIjoiY2xucDB2dzNnMDJ5dTJqbXphMnU2dmplOSJ9.NvNUkNBEry8U_RzWx_CoiQ';

        const mapboxSearchOptions = {
            accessToken: mapboxgl.accessToken,
            options: {
                country: "ke"
            }
        };

        const geocoder = new MapboxGeocoder(mapboxSearchOptions);

        geocoder.addTo(this.$refs.autocompleteInput);
    },
};
</script>
