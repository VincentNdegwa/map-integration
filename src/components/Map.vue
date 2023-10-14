<template>
    <div ref="mapContainer" class="map-container">
    </div>
    <AddressFill @change_cord="changeCord" />
    <MapStyle @change_style="changeStyle" />
</template>

<script>
import axios from "axios"
import mapboxgl from "mapbox-gl";
mapboxgl.accessToken = "pk.eyJ1IjoidmluY2VudC1uZGVnd2EiLCJhIjoiY2xucDB2dzNnMDJ5dTJqbXphMnU2dmplOSJ9.NvNUkNBEry8U_RzWx_CoiQ"
import AddressFill from "./AddressFill.vue";
import MapStyle from "./MapStyle.vue";
export default {
    data() {
        return {
            map: "",
            lng: "37.31834929878346",
            lat: "-0.572866841996003",
            style: "streets-v12"
        }
    }, components: {
        AddressFill,
        MapStyle,
    },
    mounted() {
        const options = {
            maximumAge: 100,
            enableHighAccuracy: false,
            timeout: 150000
        }
        const success = (pos) => {
            this.lat = pos.coords.latitude
            this.lng = pos.coords.longitude
            console.log(pos.coords)
            this.renderMap()

        }
        const err = (err) => {
            console.log(err)
        }
        navigator.geolocation.getCurrentPosition(success, err, options)

    }, methods: {
        renderMap() {
            const map = new mapboxgl.Map({
                container: this.$refs.mapContainer,
                style: `mapbox://styles/mapbox/${this.style}`,
                center: [this.lng, this.lat],
                zoom: 9,
            });

            this.map = map;
            const geocoder = new MapboxGeocoder({
                accessToken: mapboxgl.accessToken,
                mapboxgl: mapboxgl,
                marker: false,
                placeholder: 'Search for places in Kenya',
                // bbox: [33.8935689697, -4.67677, 41.8550830926, 5.506],
                proximity: {
                    longitude: this.lng,
                    latitude: this.lat,
                },
            });

            this.map.addControl(geocoder)
            map.on("click", (ev) => {
                let cord = ev.lngLat
                this.requestNamePlace(cord)
            })

            map.on("moveend", () => {
                let bounds = map.getBounds();
                let sw = bounds.getSouthWest();
                let ne = bounds.getNorthEast();

                console.log('Southwest Corner:', sw);
                console.log('Northeast Corner:', ne);
            });
        },
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
        }, changeCord(cord) {
            this.lng = cord[0]
            this.lat = cord[1]
            this.renderMap()
            this.addMarker(cord)
        }, changeStyle(style) {
            this.style = style
            this.renderMap()
        }
    }

}
</script>

<style>
.map-container {
    flex: 1;
    position: relative;
}

.marker {
    background-color: greenyellow;
    width: 20px;
    height: 30px;
}
</style>
