<template>
    <div ref="mapContainer" class="map-container"></div>
</template>

<script>
import axios from "axios"
import mapboxgl from "mapbox-gl";
mapboxgl.accessToken = "pk.eyJ1IjoidmluY2VudC1uZGVnd2EiLCJhIjoiY2xucDB2dzNnMDJ5dTJqbXphMnU2dmplOSJ9.NvNUkNBEry8U_RzWx_CoiQ"
export default {
    data() {
        return {
            map: "",
        }
    },
    mounted() {
        const map = new mapboxgl.Map({
            container: this.$refs.mapContainer,
            style: "mapbox://styles/mapbox/streets-v12",
            center: [37.31834929878346, -0.572866841996003],
            zoom: 9,
        });

        this.map = map;
        map.setStyle("mapbox://styles/mapbox/satellite-streets-v12")
        map.on("click", (ev) => {
            let cord = ev.lngLat
            // this.addMarker(cord)
            this.requestNamePlace(cord)
            // console.log(cord.lngLat)
        })
    }, methods: {
        addMarker(cord) {
            const el = document.createElement('div');
            el.className = 'marker';

            const marker = new mapboxgl.Marker().setLngLat(cord).addTo(this.map)
        }, requestNamePlace(cord) {
            console.log(cord)
            let lng = cord.lng
            let lat = cord.lat

            axios.get(`https://api.mapbox.com/geocoding/v5/mapbox.places/${lng},${lat}.json?access_token=pk.eyJ1IjoidmluY2VudC1uZGVnd2EiLCJhIjoiY2xucDB2dzNnMDJ5dTJqbXphMnU2dmplOSJ9.NvNUkNBEry8U_RzWx_CoiQ`).then(res => {
                console.log(res.data.features);
            }).catch(err => {
                console.log(err);
            });
        }
    }

}
</script>

<style>
.map-container {
    flex: 1;
}

.marker {
    background-color: greenyellow;
    width: 20px;
    height: 30px;
}
</style>
